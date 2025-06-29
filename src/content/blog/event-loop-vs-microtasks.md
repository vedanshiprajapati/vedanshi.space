---
title: "The JavaScript Event Loop vs. Microtask Queue"
description: "Dig deep into how JavaScript schedules tasks, with real examples of macro vs. micro tasks, event loop behavior, and debugging async quirks"
publishedAt: 2025-02-21
tags: ["javascript", "event-loop", "async", "microtasks", "performance"]
---

## Why Your Async Code Acts Weird Sometimes

You write some JavaScript. You use `setTimeout`, maybe an async function. Everything _should_ work in the order you expect... and then it doesn’t.

Suddenly you're wondering:

- Why did my `setTimeout` run _after_ my `Promise.then()`?
- Why is my UI freezing even though I'm using `async`?
- Why do `console.log` statements not follow the order of code?

If you’ve hit this wall, you’re not alone. The root of this mystery?  
It’s how **the JavaScript event loop**, **task queues**, and **microtasks** work.

Let’s untangle this.

---

## The Event Loop in 60 Seconds

JavaScript runs on a single thread, meaning it can only do one thing at a time.

But it’s also asynchronous. So how?

Enter the **event loop**, the mechanism that decides:

1. What to execute now
2. What to postpone
3. What to do after a task finishes

There are two main types of tasks:

- **Macrotasks**: like `setTimeout`, `setInterval`, DOM events
- **Microtasks**: like `Promise.then`, `queueMicrotask`, and `MutationObserver`

When the call stack is empty, the event loop does this:

1. Run all microtasks (in order)
2. Then run the next macrotask
3. Repeat

---

## Show, Don’t Tell: The Classic Example

```js
console.log("script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("promise 1");
  })
  .then(() => {
    console.log("promise 2");
  });

console.log("script end");
```

Output?

```
script start
script end
promise 1
promise 2
setTimeout
```

Why? Here's what happens:

1. All `console.log` calls outside async go on the **call stack** immediately
2. `setTimeout(..., 0)` is a macrotask → goes to the macrotask queue
3. `Promise.then()` is a microtask → queued in the microtask queue
4. After the main script runs, the event loop:
   - Runs all microtasks (`promise 1`, then `promise 2`)
   - Then runs macrotasks (`setTimeout`)

---

## Real-World Quirk: UI Freezing Despite async/await

```js
async function doWork() {
  for (let i = 0; i < 1e8; i++) {
    // doing heavy work
  }
  console.log("done");
}

doWork();
```

You used `async`, but the UI still froze. Why?

Because you didn’t `await` _anything_. `async` doesn’t magically make code non-blocking. It just wraps the return value in a Promise. If your code doesn't `await`, it's still fully synchronous.

---

## The Queue Hierarchy

Order of operations:

1. Call stack
2. Microtask queue
3. Macrotask queue

Let’s illustrate with a wild example:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

queueMicrotask(() => {
  console.log("C");
});

Promise.resolve().then(() => {
  console.log("D");
});

console.log("E");
```

Output:

```
A
E
C
D
B
```

Even `queueMicrotask` (which is often lesser known) gets priority over `setTimeout`.

---

## Advanced Trick: Forcing Execution Order

Want to schedule something _after_ all current microtasks, but _before_ the next render or timeout?

```js
requestAnimationFrame(() => {
  queueMicrotask(() => {
    console.log("microtask before frame paint");
  });
});
```

You can get really creative mixing:

- `requestAnimationFrame` (sync with browser frame)
- `queueMicrotask` (end-of-tick)
- `setTimeout` (next macrotask cycle)

---

## TL;DR: How to Think About It

| Concept                 | Goes Where?          | When It Runs                            |
| ----------------------- | -------------------- | --------------------------------------- |
| `setTimeout`            | Macrotask queue      | After all microtasks                    |
| `Promise.then`          | Microtask queue      | Immediately after current task finishes |
| `async/await`           | Microtask (on await) | Same as `then()`                        |
| `queueMicrotask`        | Microtask queue      | Same as `then()`                        |
| `requestAnimationFrame` | Render queue         | Right before next repaint               |

---

## Debugging Strategy

When in doubt:

1. Add `console.log()`s and trace the order
2. Use Chrome DevTools → Performance tab to visualize task timing
3. Don’t confuse `async` with parallel or background

---

## Final Thoughts

The event loop is simple in theory — but full of nuanced behavior that can break assumptions.

Mastering this gives you superpowers:

- Smooth UI
- Predictable async code
- Easier debugging under load

So next time your code "runs out of order," check the loop. It’s always watching.

And now... **you are too.**
