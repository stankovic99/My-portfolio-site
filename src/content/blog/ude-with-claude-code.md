---
title: "UDE and Claude Code: X++ development on your own machine"
description: "What the Unified Developer Experience changes for D365 F&O developers, and why having X++ code as local files makes Claude Code useful."
date: 2026-11-16
tags: ["D365 F&O", "UDE", "X++", "Claude Code"]
takeaways:
  - "With UDE, Visual Studio and the X++ code are on your own machine, and the environment runs online."
  - "X++ is stored as XML files, which a tool like Claude Code can read and search."
  - "It helps most with finding where to extend, explaining standard code and writing first drafts."
  - "Building, testing and the decisions stay with the developer."
---

For years, developing for Dynamics 365 Finance & Operations meant a cloud-hosted virtual machine: Visual Studio, the database and the application all on one big remote computer.

The Unified Developer Experience (UDE) changes that. I am learning it on my own, I have it running, and I have been using Claude Code on X++ code there. This post explains why the two fit together.

## What UDE changes

- **The environment is online.** You create a developer environment through Power Platform, and F&O runs there next to Dataverse.
- **Visual Studio runs on your own machine.** You install the Power Platform Tools extension, connect to the environment, and it downloads the F&O code and the X++ tools.
- **Your code is local.** You write and build on your machine, then deploy to the online environment from Visual Studio. You debug against that environment too.

The setup steps change as Microsoft updates the tools, so follow the current guide on Microsoft Learn instead of an old blog post, this one included.

## Why this matters for AI tools

X++ source code is stored as XML files, one file per class, table or form:

```
MyPackage/
  MyModel/
    AxClass/
      MyOrderService.xml
    AxTable/
      MyOrderTable.xml
  Descriptor/
    MyModel.xml
```

The X++ itself sits inside those files:

```xml
<AxClass xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
  <Name>MyOrderService</Name>
  <SourceCode>
    <Declaration><![CDATA[
public final class MyOrderService
{
}
]]></Declaration>
    <Methods>
      <Method>
        <Name>run</Name>
        <Source><![CDATA[
    public void run()
    {
        info("Hello from UDE");
    }
]]></Source>
      </Method>
    </Methods>
  </SourceCode>
</AxClass>
```

On a cloud-hosted VM these files lived on the remote machine. With UDE they are on your own disk, both your model and the standard application code, next to the rest of your tools. That is what a tool like Claude Code needs: it works by reading and searching files in a folder.

## What it is good at

- **Finding where to extend.** "Where is the delivery date set on a sales line?" is a search through thousands of standard files. Claude Code does that search and shows the classes and methods, so you can pick the right place for an extension.
- **Explaining standard code.** Long methods with years of history are easier to read with a summary next to them.
- **First drafts of repetitive code.** For example, the contract, controller and service classes of a SysOperation job, or the skeleton of a SysTest class.
- **Extensions.** A Chain of Command class is short and has a fixed shape:

```xpp
[ExtensionOf(tableStr(CustTable))]
final class CustTable_MyModel_Extension
{
    public boolean validateWrite()
    {
        boolean ret = next validateWrite();

        if (ret && !this.MyReviewedBy)
        {
            ret = checkFailed("A customer needs a reviewer before it is saved.");
        }

        return ret;
    }
}
```

## Where to be careful

- **Check every name.** It can use a method that does not exist. Ask it to show the file where the method is defined.
- **Forms and other large objects.** Their XML is long and easy to break. Those are better changed in the Visual Studio designer.
- **Standard code is read-only.** Changes go into your own model, as extensions.
- **New files.** A file created outside Visual Studio still has to be added to your project to show up there.
- **It cannot tell you that the code works.** Build, deploy and test, as always.

## Tell it the rules

Claude Code reads a `CLAUDE.md` file from the project folder at the start of every session. For an X++ model it could look like this:

```markdown
# CLAUDE.md
- X++ model `MyModel` in package `MyPackage` (D365 F&O, UDE).
- Source is XML: one file per object in AxClass/, AxTable/, AxForm/. X++ is inside CDATA blocks.
- Only change files in this model. Standard code is read-only: use Chain of Command or event handlers.
- Extension classes are named `<Target>_MyModel_Extension`.
- No hard-coded text. Use labels.
- I build and deploy from Visual Studio and paste any errors back.
```

And the rule that comes before the technical ones: check what your employer and your client allow before an AI tool reads their code.

## Summary

UDE puts X++ development on your own machine, with the code as local files. That makes the daily work lighter, and it opens the door to tools that read files. Claude Code is useful for finding, reading and drafting. The building, the testing and the decisions stay with the developer.
