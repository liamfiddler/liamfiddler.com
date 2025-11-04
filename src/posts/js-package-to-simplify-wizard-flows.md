---
title: A JavaScript Package to simplify wizard or questionnaire flows
pubdate: 2025-10-31
tags: ['tip']
theme: purple
variant: spin3d
---

A lot of the projects/prototypes I work on have a questionnaire or wizard flow in them.

I end up solving the same things over and over; loading the right question from a list (usually from an API or hardcoded file and represented as a JavaScript array/object), displaying the correct text or input fields, navigating forward/back between questions, storing answers to/from memory/localStorage/sessionStorage, editing or displaying stored answers, displaying progress through the question list, branching between questions based on the answers provided (e.g. show this question only if the user answered x for question y), the list goes on.

So, [I built the friendly-wizard library to make coding wizards and questionnaires easier](https://github.com/liamfiddler/friendly-wizard/)!

## About the package

- Written in plain JavaScript
- Only xkB minified and gzipped (ykB including the optional z dependency for branching questions)
- Comes with TypeScript type definitions
- Can be npm installed in whatever project you're building, `npm install --save liamfiddler/friendly-wizard`
- Questions responses modeled as a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map); full access to responses using the native `set`, `get`, and `delete` methods.
- Automatic loading and storage of responses to/from localStorage or sessionStorage using the optional WizardStorage class.
- Uses a native EventTarget; easy to listen for events and run your own logic[^1]
- Built as a native JS class; easy to extend or overwrite methods[^2]
- Step show/hide logic provided via Mongo-style syntax (great for representing logic in hardcoded JSON or via API)
- Examples for use in plain JS, React, and Vue
- Includes a React hook for easy integration in React projects
- Helper method for setting responses from a form; e.g. `form.onsubmit = (e) => Wizard.responsesFromForm(e.target)`
- SSR-friendly
- Full suite of automated tests

## A small example

A small example showing two questions and stepping between them.

```js
import Wizard from 'friendly-wizard/Wizard.js';

const wizard = new Wizard({
    steps: [
        {
            id: 'step-1',
            type: 'text',
            data: {
                title: 'Step 1',
                body: 'Welcome to the first step',
            },
        },
        {
            id: 'step-2',
            type: 'text',
            data: {
                title: 'Step 2',
                body: 'This is the second step',
            },
        },
    ],
});

// output the first step title
console.log(wizard.activeStep.data.title);

// navigate to the next step
wizard.next();

// output the second step title
console.log(wizard.activeStep.data.title);
```

## An example with step logic

This example shows how to set a response, and a question being skipped based on that response.

```js
import Wizard from 'friendly-wizard/Wizard.js';

const wizard = new Wizard({
  steps: [
    {
      id: 'step1',
    },
    {
      id: 'step2',
      // skip the step if 'something' === 'test'
      skip: {
        something: {
          $eq: 'test',
        },
      },
    },
    {
      id: 'step3',
    },
  ],
});

// outputs 'step2', because the second step is not skipped
console.log(wizard.nextStep.id);

// set the response for 'something' to 'test'
wizard.responses.set('something', 'test');

// outputs 'step3' because the second step is now skipped
console.log(wizard.nextStep.id);
```

[^1]: Events are triggered for step navigation (next, previous, change), when the responses change, and when responses are loaded/stored (using the WizardStorage class). See [the friendly-wizard docs for events](https://github.com/liamfiddler/friendly-wizard/blob/main/README.md#events) for more info.

[^2]: This is exactly how the WizardStorage class was created! See [the WizardStorage code](https://github.com/liamfiddler/friendly-wizard/blob/main/WizardStorage.js) for an example.
