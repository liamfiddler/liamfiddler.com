---
title: CSS-only Page Transitions
pubdate: 2025-06-15
tags: ['tip']
theme: blue
---

The CSS View Transitions API allows you to create smooth animated transitions between different states of your web pages, even across full page navigations.

Previously I had accomplished this task with tools like Swup for multi-page sites or Framer Motion for SPA, but now there's decent browser support for CSS-only page transitions.

!!! note Note:
    In July 2025 (when this post was written) Chrome, Edge, and Safari all support CSS-only View Transitions. Firefox doesn't currently have support but the site gracefully falls back to a non-animated state in that browser.

With the multi-page version, you can opt in to automatic transitions between separate HTML documents by using the `@view-transition` rule in your CSS. This enables browsers to animate the visual change from one page to another, such as fading or sliding content, without requiring any JavaScript. It's a powerful way to enhance user experience with seamless, native-feeling page transitions using only CSS.

## Bare minimum CSS-only View Transitions code

This is the bare minimum[^1] required to perform a fade transition between pages, setting a duration for the animation:

```css
/* Opt-in to View Transitions */
@view-transition {
	navigation: auto;
}

/* Set the default transition name to 'none' */
:root {
	view-transition-name: none;
}

/* Assign a name of 'page' to the body tag,
this makes the whole body tag animate in/out */
body {
	view-transition-name: page;
}

/* Specify how long the animation should run */
::view-transition-group(page) {
	animation-duration: 0.4s;
}

/* Handle if the user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
	::view-transition-group(page) {
		animation-duration: 0s;
	}
}
```

Just copy-paste the above into your global CSS file and enjoy the smooth fade transitions between pages ✨

[^1]: Technically you could write fewer lines of code if you drop the reduced motion stuff, but I believe that accounting for accessibility preferences _is the minimum_
