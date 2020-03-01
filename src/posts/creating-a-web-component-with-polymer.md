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

For this guide we'll be building a component that allows a user to filter list items based on a search string.

It will look something like this:

![Demo](/resources/post-assets/creating-a-web-component-with-polymer-demo3.gif)

# Getting Started

We're going to call our new component **my-listfilter** (the [custom elements specification](https://www.w3.org/TR/2016/WD-custom-elements-20160226/#concepts) requires the component name contain a dash).

Open your preferred commandline shell and enter the following:

```bash
mkdir my-listfilter
cd my-listfilter
```

This will create a new directory for the project and change to that directory. Next, we want to initialise the project. We'll use the Polymer CLI to set it up:

```bash
polymer init
```

You'll be asked a series of questions about the project you're setting up. Select element, name the project **my-listfilter** and enter a description for the project (something like 'A filterable list component'). Polymer CLI will then generate a number of files and directories for your element and install the required dependencies.

## The Component Skeleton

Open _my-listfilter/my-listfilter.html_ in your preferred editor. It should look something like this:

```html
<link rel="import" href="../polymer/polymer.html" />
<!--
`my-listfilter`
A filterable list component
@demo demo/index.html
-->
<dom-module id="my-listfilter">
  <template>
    <style>
      :host {
        display: block;
      }
    </style>
    <h2>Hello [[prop1]]</h2>
  </template>
  <script>
    Polymer({
      is: 'my-listfilter',
      properties: {
        prop1: {
          type: String,
          value: 'my-listfilter',
        },
      },
    });
  </script>
</dom-module>
```

First we see a link tag, this is importing the Polymer dependencies into our component.

Next is a HTML comment containing the name of our component and the description of the component we provided to Polymer CLI. This is used to generate the documentation for the component.

The comment ends on a line that starts with _@demo_, this line specifies that the component comes with a demo page that can be found at _demo/index.html_ (this will come into play in Part 2 of this article series).

Further down the file we find the _DOM-MODULE_ tag. The _DOM-MODULE_ is broken into two sections; a _TEMPLATE_ which houses the component styles & markup, and a _SCRIPT_ which contains the logic & functionality.

Inside the _TEMPLATE_ tag you will see _[[prop1]]_. This is known as a one-way binding. When the component is put on a page this text will be replaced with the value of a variable called “prop1”.

The “prop1” variable and it's value are set in the _SCRIPT_ section within the _properties_ object. By default it is set to the string “my-listfilter”.

## Viewing the Component in the Browser

At this stage you should be able to view the component in your web browser.

Back in your commandline shell type the following:

```bash
polymer serve
```

A tool called “polyserve” will start and a couple of URLs will be displayed. Open the “reusable components” URL in your web browser, it will be something like _http://localhost:8080/components/my-listfilter/_

![Demo](/resources/post-assets/creating-a-web-component-with-polymer-apiref.png)

This is the documentation that Polymer has generated for your component. Clicking the “demo” link in the top corner should take you to another page that looks like this:

![Demo](/resources/post-assets/creating-a-web-component-with-polymer-demo1.png)

On this page we can test the component and make sure it's working correctly.

## Adding The Filter Input

One of the key pieces in our listfilter component will be the text input field used for filtering. To accomplish this we'll be using a standard HTML input tag.

Jump back to your code editor and insert the following on a new line after the closing _STYLE_ tag and before the opening _H2_ tag:

```js
<input value="{{prop1::input}}" />
```

This creates a text input on the page.

You'll note we've also added a value attribute to the input. The content of the attribute is what makes the tag special. By specifying prop1 in curly braces we've told Polymer to create a two-way binding between the “prop1” variable and the input's value property. Additionally, by specifying _::input_ after the variable name we've told Polymer to automatically update the variable's value whenever the value property changes.

Your _my-listfilter.html_ file should now [look like this](https://gist.github.com/liamfiddler/531ebe07f4d0a7a7dfa5d0bf18ca331f).

Save the file and refresh the demo page in your web browser. Now when you type into the input you should see the content of the _H2_ tag change!

![Demo](/resources/post-assets/creating-a-web-component-with-polymer-demo2.gif)

## Adding the List Markup and Styles

The other key piece in our listfilter component will be the list itself. For this guide we'll be using a _UL_ tag to represent a list.

Paste the following in your code editor after the closing _H2_ tag:

```html
<ul id="list">
  <li>Hypertext Markup Language</li>
  <li>Cascading Style Sheets</li>
  <li>Javascript</li>
  <li>Web Components</li>
  <li>Polymer</li>
  <li>Web Browser</li>
  <li>Mentally Friendly</li>
</ul>
```

Note that we've added an id attribute to the _UL_ tag. This will allow us to easily target the element when we start writing the filtering functionality.

Then, between the style tags in the template we'll add some CSS to hide list items:

```css
.hidden {
  display: none;
}
```

Your _my-listfilter.html_ file should now [look like this](https://gist.github.com/liamfiddler/e744d92b2221f0968d9dfd4072a59216).

If you refresh the demo page in your browser you will now see the list items below the _INPUT_ tag, but the list is not being filtered yet. On to the next step!

## Marking List Items as Hidden

At this stage we've produced the markup for an input (whose value is attached to a variable) and a list. The next step will be to write a function that can show or hide the list items if they contain the input value.

Add the following to the script section, before the final `});`

```js
filterList: function() {
  var items = this.$.list.children;

  for (var i = 0; i < items.length; i++) {
    var item = Polymer.dom(items[i]);

    if (item.textContent.includes(this.prop1)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  }
}
```

There's a lot going on in the above snippet so let's go through it step-by-step.

The first line defines a name for our function, “filterList”.

The second line uses a neat trick in Polymer to retrieve the list items and store them in an array. When you create a node in the template section with an _id_ attribute it will be automatically added to the _this.\$_ hash with the id as it's key. This means we can access the list we created earlier as _this.\$.list_ without having to query the DOM manually!

Over the next two lines we loop through the list items and store them in the variable item. Here we use the Polymer.dom method to get a reference to the node in the Shadow DOM, ensuring any changes we make to the item are properly maintained when the component is rendered.

We then check to see if the text content of the item includes the filter text. If the filter text is found we remove the “hidden” class from the node, otherwise the “hidden” class is added.

Your _my-listfilter.html_ file should now [look like this](https://gist.github.com/liamfiddler/35b59e880f2e3973ee28482e761ff9b7).

## Running a Function when the Input Changes

We've got a function that can show/hide list items based on the search text, but how do we get it to run when the user types new text in the input field?

In the script section there is a block of code that looks like this:

```js
prop1: {
  type: String,
  value: 'my-listfilter',
},
```

This defines the _prop1_ variable we're using. The type of the variable is set to _String_ and the default value is _my-listfilter_.

Let's change the value to an empty string so the input field is cleared by default, and add an observer property:

```js
prop1: {
  type: String,
  value: '',
  observer: 'filterList'
},
```

Observers are methods invoked when observable changes occur to the element's data, this includes when the data is first defined and any changes that occur thereafter (even if it becomes undefined again). In this case we've told Polymer to call the the function we created earlier whenever the value is updated.

# Review

If you've been following along your _my-listfilter.html_ file will now look like this:

```html
<link rel="import" href="../polymer/polymer.html" />
<!--
`my-listfilter`
A filterable list component
@demo demo/index.html
-->
<dom-module id="my-listfilter">
  <template>
    <style>
      :host {
        display: block;
      }
      .hidden {
        display: none;
      }
    </style>
    <input value="{{prop1::input}}" />
    <h2>Hello [[prop1]]</h2>
    <ul id="list">
      <li>Hypertext Markup Language</li>
      <li>Cascading Style Sheets</li>
      <li>Javascript</li>
      <li>Web Components</li>
      <li>Polymer</li>
      <li>Web Browser</li>
      <li>Mentally Friendly</li>
    </ul>
  </template>
  <script>
    Polymer({
      is: 'my-listfilter',
      properties: {
        prop1: {
          type: String,
          value: '',
          observer: 'filterList',
        },
      },
      filterList: function() {
        var items = this.$.list.children;

        for (var i = 0; i < items.length; i++) {
          var item = Polymer.dom(items[i]);

          if (item.textContent.includes(this.prop1)) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        }
      },
    });
  </script>
</dom-module>
```

Save the file and refresh the demo page in your web browser. If everything's gone to plan you should be able to type into the text field and see the list items disappear if they don't match!

![Demo](/resources/post-assets/creating-a-web-component-with-polymer-demo3.gif)
