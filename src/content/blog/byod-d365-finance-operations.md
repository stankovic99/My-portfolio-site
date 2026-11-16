---
title: "BYOD in D365 F&O: exporting data to your own Azure SQL database"
description: "How Bring Your Own Database works in Dynamics 365 Finance & Operations: the setup, full and incremental push, entities built for export, and what usually goes wrong."
date: 2026-11-16
tags: ["D365 F&O", "BYOD", "Data entities", "Azure SQL"]
takeaways:
  - "BYOD exports F&O data entities to an Azure SQL database that you own, for reporting. It goes one way and is not real-time."
  - "There are three parts: a connection, published entities and an export job."
  - "Incremental push needs change tracking, and its first run is always a full push."
  - "In entities built for export, prefer computed columns over virtual fields."
---

BYOD stands for "bring your own database". It lets you export data entities from Dynamics 365 Finance & Operations into an Azure SQL database that you own. Reporting tools can then query normal SQL tables instead of going through F&O.

On my current project I set up the export, scheduled the jobs, built and extended data entities for it, and fixed the problems that came up along the way. This post is an overview of how it works and what to watch for.

## When BYOD makes sense

- You have reports, Power BI models or a data warehouse that expect SQL tables.
- Data that is some minutes or hours old is good enough.
- The data only needs to go one way, out of F&O.

It is not a tool for real-time integration. Also, for new analytics work Microsoft now points to Azure Synapse Link for Dataverse and Microsoft Fabric, so check that option before you start a new BYOD setup. BYOD is still supported, and many projects already depend on it.

## 1. The database and the connection

You need an Azure SQL database, ideally in the same region as the F&O environment, and a SQL user that is allowed to create and change tables.

In F&O, open **Data management > Configure entity export to database** and create a new record:

- **Source name**: the name you will pick later in export projects.
- **Connection string**: the connection to your Azure SQL database.
- **Create clustered column store indexes**: good for reporting queries, but not supported on the smaller Azure SQL tiers. Check your tier and turn the option off if it is not supported.

Use **Validate** to test the connection before you continue.

## 2. Publish the entities

Select your new source, click **Publish**, pick the entities and publish them. This creates the tables in your database. It does not copy any data yet.

The tables are named after the staging table of each entity. That name is what you query later:

```sql
SELECT TOP 20 SALESORDERNUMBER, ORDERINGCUSTOMERACCOUNTNUMBER, DATAAREAID
FROM dbo.SalesOrderHeaderV2Staging
ORDER BY SALESORDERNUMBER DESC;
```

When an entity changes later, for example when you add a field, publish it again so the table in the database gets the new column.

## 3. The export job

Create an export project in **Data management > Export**. As **Target data format** choose your BYOD source name, then add the entities. Each entity gets a refresh type:

- **Full push only** empties the target table and loads everything again.
- **Incremental push** sends only what changed since the last run.

Incremental push needs **change tracking** on the entity. You turn it on from the Publish page, with one of three options:

- **Enable primary table**: a change is picked up only when the main table of the entity changes.
- **Enable entire entity**: a change in any table of the entity counts.
- **Enable custom query**: you decide which tables count.

The first run of an incremental push is always a full push. After that, run the project in batch with a recurrence that fits how fresh the data needs to be.

## Building entities for export

Standard entities do not always have the fields a report needs, so sooner or later you extend one or build your own. One thing matters most for export speed: prefer **computed columns** over **virtual fields**.

A virtual field is filled by X++ code for every single row. A computed column becomes part of the SQL view behind the entity, so the database calculates it for all rows at once:

```xpp
/// Line amount calculated in SQL, as part of the entity view
private static server str lineAmount()
{
    str qty = SysComputedColumn::returnField(
        tableStr(MyOrderLineExportEntity),
        dataEntityDataSourceStr(MyOrderLineExportEntity, SalesLine),
        fieldStr(SalesLine, SalesQty));

    str price = SysComputedColumn::returnField(
        tableStr(MyOrderLineExportEntity),
        dataEntityDataSourceStr(MyOrderLineExportEntity, SalesLine),
        fieldStr(SalesLine, SalesPrice));

    return SysComputedColumn::multiply(qty, price);
}
```

On a large entity this makes a big difference in how long the export takes.

## What usually goes wrong

- **Incremental push exports everything, or nothing.** Check that change tracking is really enabled for that entity, and remember that the first run is a full push.
- **A new field is missing in the database.** The entity was changed but not published again. Publish it, then run a full push once.
- **Full pushes take too long.** Move big entities to incremental push, replace virtual fields with computed columns, split large export projects and run the heavy ones at night. Check the size of the Azure SQL database too.
- **Jobs pile up.** If the recurrence is shorter than the time a run needs, the next run starts waiting behind the first. Leave room between runs.
- **Deleted records.** Test how deletes behave for each entity you depend on, especially entities with several tables behind them, before a report relies on it.
- **Manual changes in the BYOD database.** Don't change the exported tables by hand. Publishing again can recreate them. Put your own views or tables next to them instead.

## Summary

BYOD is simple once the three parts are clear: a connection, published entities and an export job. Most of the real work is in the entities, and in choosing between full and incremental push for each of them.
