---
title: "How I use Claude Code: building and learning"
description: "What I use Claude Code for as a D365 F&O developer: this website, X++ work and learning. Plus the habits that keep the result under my control."
date: 2026-11-16
tags: ["Claude Code", "AI", "Workflow"]
takeaways:
  - "Claude Code works inside the project: it reads files, runs commands and makes changes."
  - "I use it for this website, for X++ work and for learning."
  - "A CLAUDE.md file with the project's rules keeps it consistent and stops it from inventing facts."
  - "Plan first, take small steps, run the code and read every change."
---

I use Claude, Claude Code and GitHub Copilot every day. I have not built AI features into a product yet. I use these tools the way I use a debugger or a search engine: to get my own work done faster and to learn.

This post is about Claude Code: what I use it for, and what to watch out for.

## What it is

Claude Code is an AI assistant that works inside your project. It runs in the terminal or in the editor. It can read your files, search the code, run commands and make changes, and it asks before it does anything that matters.

That is the difference from a chat window. There is no copying code back and forth. It sees the same project you see.

## Three things I use it for

### 1. This website

This site was built together with Claude Code. Two things in the repository make that work well.

The first is a file called `CLAUDE.md`. Claude Code reads it at the start of every session. Mine describes the stack, the commands, the folder structure, the colors and fonts, and the rules for the text. A few lines from it:

```markdown
- Vanilla JS only for interactivity. Do not add React/Vue/Svelte or UI libraries.
- `npm run build`: run it after every change; it must finish without errors.
- Facts: never invent facts about Stefan. Ask instead.
```

The last line matters. Without it, an AI tool will happily fill a portfolio with projects and numbers that sound good and are not true.

The second is a set of small helper agents in `.claude/agents/`. Each has one job: one builds pages, one writes posts, one checks SEO and performance, and one reviews code.

### 2. X++ and D365 work

At work I use it for writing, reading and debugging X++ code. Reading is where a tool like this helps a lot in an ERP: the system has far more code than anyone remembers, and "where does this value get set?" is a very common question.

### 3. Learning

When I study something new, I ask it to explain code and concepts. A good follow-up is "why this and not that?". The answer to that one usually teaches more than the first explanation.

## Habits that keep you in control

- **Plan first.** For anything bigger than a small fix, ask for a plan before any file is changed. It is cheaper to fix a plan than code.
- **Small steps.** One change, check it, then the next. A huge change is hard to review.
- **Run it.** Build or test after every change. An answer that sounds right is not the same as code that works.
- **Read the diff.** I still read, test and own every line that goes out.
- **Write the rules down.** A correction you have to repeat belongs in `CLAUDE.md`.

## Where it gets things wrong

- **It can invent things.** A method name that does not exist, or a parameter that looks right. This happens more with X++ than with web code, because much less X++ is public. Check names against the real code.
- **It sounds sure even when it is wrong.** The tone tells you nothing. Only running the code does.
- **It does not know your project's history.** Why something was built in a strange way three years ago is in people's heads, not in the code.

One more rule comes before all of these: check what your employer and your client allow before you point any AI tool at their code.

## Summary

Claude Code makes me faster, but it does not replace knowing the system. It works best when you already know what you want and can tell a good answer from a bad one.
