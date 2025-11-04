---
title: Mermaid Architecture Diagrams
pubdate: 2025-10-07
tags: ['tip']
theme: green
variant: spin3d
permalink: false # remove when no longer a draft
eleventyExcludeFromCollections: true # remove when no longer a draft
---

Mermaid syntax allows diagrams to be rendered directly in many documentation platforms, like GitHub, reducing the need for external tools.

I've found that storing a systems architecture diagram in a `README.MD` file using Mermaid syntax is really convenient because it keeps the diagram version-controlled and easily editable alongside the codebase and ensures that contributors always see the most up-to-date architecture when reviewing or updating the project.

This approach is particularly helpful in my day-to-day since I am typically deisgning and building the first release of a product and the architecture is fast-evolving.

These are some of the architecture diagrams I use most frequently in my `README.MD` files when making new websites or coded prototypes:

## Example

```mermaid
graph TD;
    cond1{{Condition 1?}};
    cond1 -- Yes --> A[Operate A];
    cond1 -- No ----> Stop;
    A --> cond2{{Condition 2?}};
    cond2 -- Yes --> B[Operate B];
    cond2 -- No ----> Stop;
```

## Next.js on Vercel

```mermaid
flowchart TD
    A[User] -->|HTTPS Request| B[vercel.app Domain]
    B --> C[Vercel Edge Network]
    C --> D["Vercel Serverless Functions<br/>(Next.js API Routes)"]
    C --> E["Next.js App Router<br/>(SSR/SSG/ISR)"]
    E --> F["Static Assets<br/>(Vercel CDN)"]
    E --> G[Database / External APIs]
    D --> G
    F -.-> A

    subgraph "Vercel Platform"
        B
        C
        D
        E
        F
    end
```
