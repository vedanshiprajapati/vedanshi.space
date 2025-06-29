---
title: "Simulating Human-Like WhatsApp Conversations Without AI"
description: "Creating realistic, two-way chat flows using Redis, BullMQ, and a bit of human intuition"
publishedAt: 2025-06-29
tags:
  [
    "redis",
    "bullmq",
    "whatsapp",
    "automation",
    "warmup-engine",
    "nodejs",
    "typescript",
  ]
---

## Conversations Without the Brain

We live in an age where every chatbot, assistant, and scheduler boasts AI. But sometimes, all you need is some smart logic, a queue system, and a little human flair. That's exactly what I discovered while building a WhatsApp number warmup engine.

No GPT. No ML. Just Redis, BullMQ, and a structured JSON file that knew how to hold a conversation better than some humans I know.

## Why Simulate Human Chat?

I was working on a SaaS product where new WhatsApp numbers needed to behave like real users — join groups, chat casually, send media, and even reply back. But WhatsApp is strict. Numbers that feel “robotic” get flagged or banned quickly.

So I had to teach a system to behave like a person — without using AI.

## Building the Human: Core Stack

Here’s the magic formula:

- **Redis** for fast data access and storage
- **BullMQ** to queue and schedule delayed chat jobs
- **Structured JSON templates** to simulate realistic, multi-participant conversations
- **Node.js** to orchestrate it all

The result? Simulated conversations so real, people in the office couldn’t tell if it was a bot or a bored coworker testing new jokes.

## Designing Real Conversations (in JSON?!)

Instead of just sending random "Hi" messages every few minutes, I designed structured chat flows like this:

```json
{
  "intensity": 4,
  "participants": ["num1", "num2"],
  "delayFactor": 2.2,
  "messages": [
    {
      "from": "num1",
      "content": "hey, did you watch the new K-drama episode?",
      "delay": 0
    },
    {
      "from": "num2",
      "content": "YES omg the plot twist was insane 😭",
      "delay": 10
    },
    {
      "from": "num1",
      "content": "RIGHT? I didn't expect that at all!",
      "delay": 12
    }
  ]
}
```

Each conversation had:

- A **tone** (banter, friendly, techy)
- A **delayFactor** for realism
- A **messageDistribution** so each number didn't spam too much
- Optional media or emojis for flair

## BullMQ: The Time Machine

BullMQ allowed me to schedule chat jobs with delays like:

```ts
chatQueue.add("sendMessage", { content, from, to }, { delay: delayMs });
```

And just like that, a message sent 18 seconds later felt so _real_. It allowed full control over timing, participants, and the "flow" of the chat.

## Redis: The Memory

Redis stored:

- Warmup numbers
- Internal numbers
- Chat list
- Scheduled job states

I could query active numbers, find their last sent message, and generate context-aware replies — all without ever hitting a DB.

It was blazing fast and super efficient.

## Realism Over Randomness

Here's the kicker: **no randomness = better realism**.

Instead of "random messages", I created structured templates like:

- greetings → replies
- questions → follow-ups
- banter → roast backs 😆

By mixing tone + intent + delay, every message felt like it came from a real person multitasking life and texts.

## The Rules of Fake Chat

Here’s what made it believable:

1. **Never respond instantly** — delays > realism.
2. **Switch senders often** — one-sided spam looks robotic.
3. **Throw in emojis, media, or "typing" events** — human behavior isn't dry.

## Unexpected Win: No AI = More Control

At first, I thought I’d need AI for replies. But soon I realized — AI can’t yet simulate _boring_, _casual_, _human_ texting at scale without going off-topic.

Structured JSON + smart scheduling? Way better for consistent, safe simulation.

## What I’d Improve

- Add fallback patterns when a message fails
- Create a dashboard to visualize chat flow and activity

## Final Thoughts: You Don’t Need AI to Be Smart

What started as a "boring warmup tool" became a mini behavioral system.

And all of it — conversations, replies, timings — was controlled without LLMs or massive infra. Just smart logic, fast queues, and a few good JSON files.

So the next time you think, “I need AI to make this feel human,” maybe think again.

Sometimes, all it takes… is a queue, a pattern, and a little bit of common sense.
