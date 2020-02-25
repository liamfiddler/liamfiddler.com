---
title: Creating a web component with Polymer
date: 2017-03-28
tags: ['post', 'web components', 'polymer']
thumb: /resources/post-assets/creating-a-web-component-with-polymer.png
---

<p class="note">
  <strong>This guide is old.</strong>
  It might reference tools and techniques that are now out-of-date, deprecated, or considered bad practice.
</p>

## What is a Web Component?

Web Components are a collection of standardised features currently being added by the W3C to the HTML and DOM specifications. They allow you to encapsulate HTML, CSS, and Javascript into reusable widgets or components in web documents and web applications. Part of this encapsulation is handled by the Shadow DOM that scopes your component’s style and DOM.

Web Components have native support in over 55% of web browsers globally at the time of writing, with greater support being added in every new release. For the remaining browsers we’ll be using Polymer as a kind of ‘polyfill’.

## Assumed Knowledge & Prerequisites

A working understanding of HTML, CSS, and Javascript will be required to follow this guide.
Additionally, this guide assumes you have the Polymer CLI installed on your system. Polymer CLI is a command-line interface for Polymer projects. It includes a build pipeline, a boilerplate generator for creating elements and apps, a linter, a development server, and a test runner.

Finally, although it’s not a requirement, Chrome was the first browser to ship with support for all of the new Web Component standards so it’s the recommended browser for this guide.

## Our Goal
For this guide we’ll be building a component that allows a user to filter list items based on a search string.

It will look something like this:
