---
title: Kill server process on port
date: 2020-01-23
tags: ['post', 'bash', 'terminal']
thumb: /resources/post-assets/creating-a-web-component-with-polymer.png
---

I've lost track of how many times I've needed to terminate a process that's using a particular port on my macOS or Linux machine.

Maybe I'm running a Severless function locally and accidentally create an infinite loop, or using a poorly constructed database seed that never finishes, or my IDE's integrated terminal crashed.

Whatever the cause the result is the same; I have a process running in the background that's blocking one of my ports.

Here's the command I use to find the ID of that process and terminate it:

```bash
lsof -nti:NumberOfPort | xargs kill -9
```

Where `NumberOfPort` is replaced with the port number you're looking for.

<p class="note">
  <strong>Be careful!</strong>
  Killing a process in this manner does not allow it to close its open files or database connections cleanly and over time could cause other issues; therefore it is generally better to reserve this approach as a last resort.
</p>

## Is a process hogging a port on your macOS or Linux machine?

The form below will generate the command to find the ID of the process and terminate it, then copy the command to your clipboard.

<kill-process-command></kill-process-command>

Once you've copied the command, open your _Terminal_ app, paste the command, and hit the <kbd>return</kbd> / <kbd>enter</kbd> key.
