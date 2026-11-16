---
title: "PL-400: what the exam covers and how I prepared"
description: "What the Power Platform Developer exam asks for, a small plug-in example, and how I prepared for it after PL-900."
date: 2026-06-16
tags: ["Certification", "PL-400", "Power Platform", "C#"]
takeaways:
  - "PL-400 is the developer exam for Power Platform: plug-ins, custom connectors, PCF controls, ALM and integrations."
  - "A plug-in is a C# class registered on a message, a table and a stage."
  - "Many ideas have a close match in F&O, which helps X++ developers."
  - "I prepared with Microsoft Learn, hands-on building, video courses and practice tests."
---

**Update, November 2026:** I have passed PL-400. I rewrote this post so it covers what the exam asks for and how I prepared.

## Why PL-400 after PL-900

In May 2026 I passed PL-900 (Power Platform Fundamentals) with 1000 out of 1000. PL-900 is about what the platform can do. PL-400 is the developer exam: it is about extending the platform with code.

I work as a D365 F&O developer and write X++ most days. A lot of the work around F&O now ends up in Power Platform: a flow, a small app, a connector to another system. PL-400 was the next step to do that work properly.

## What the exam covers

Microsoft publishes a skills outline for PL-400 and updates it from time to time, so check the current version on Microsoft Learn before you start. In short, it asks you to:

- **Create a technical design.** Decide what should be a flow, a plug-in, a custom connector or plain configuration.
- **Build Power Platform solutions.** Environments, solutions, and moving changes from development to production (ALM).
- **Improve Power Apps.** Formulas, performance and reusable components in canvas and model-driven apps.
- **Extend the user experience.** JavaScript on model-driven forms and custom controls built with the Power Apps Component Framework (PCF).
- **Extend the platform.** Dataverse plug-ins in C#, custom APIs, custom connectors and the Dataverse Web API.
- **Develop integrations.** Dataverse events, Azure Functions, service endpoints and webhooks.

## A plug-in, the part closest to X++

A plug-in is a C# class that Dataverse calls when something happens to a row, for example when an account is created. This one stops accounts without a name and trims the spaces around it:

```csharp
using System;
using Microsoft.Xrm.Sdk;

public class AccountPreCreate : IPlugin
{
    public void Execute(IServiceProvider serviceProvider)
    {
        var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

        // "Target" is the row that is being created
        if (context.InputParameters["Target"] is Entity account)
        {
            var name = account.GetAttributeValue<string>("name");

            if (string.IsNullOrWhiteSpace(name))
            {
                throw new InvalidPluginExecutionException("An account needs a name.");
            }

            account["name"] = name.Trim();
        }
    }
}
```

You register the class on a message (Create), a table (account) and a stage. The stage decides when the code runs:

- **PreValidation** runs before the main operation and outside the database transaction.
- **PreOperation** runs inside the transaction, before the row is saved. Changing the Target here changes what gets saved.
- **PostOperation** runs inside the transaction, after the row is saved.

Two rules come up again and again: a plug-in must not keep state between calls, and it has to finish within two minutes.

## If you come from F&O

Many ideas have a close match, which makes the exam easier to study for:

| In F&O | In Power Platform |
|---|---|
| Event handlers and Chain of Command | Plug-ins on Dataverse messages |
| Data entities and OData | Dataverse tables and the Web API |
| Business events | Dataverse events, service endpoints, webhooks |
| Models and deployable packages | Solutions (managed and unmanaged) |

## How I prepared

I used four things:

- **Microsoft Learn.** The official PL-400 learning paths.
- **Hands-on building.** Plug-ins, flows, apps and connectors in a developer environment.
- **Video courses.** To hear the same topics explained in a different way.
- **Practice tests.** Before the exam, to find the gaps and get used to how the questions are worded.

If you start from zero, do the hands-on part early. A plug-in that you have registered and debugged yourself is much easier to remember than one you have only read about.
