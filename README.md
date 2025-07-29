# Svelte Cabins Website

From the Udemy project "Ultimate React Course 2024: React, Next.js, Redux & More" by Jonas Schmedtmann. Part 5: Section:33 Lecture:431 Project: ["The Wild Oasis Website"](https://github.com/XavierEnriquez/the-wild-oasis-website) built in Svelte Kit.

## Reference

- [Included tools](#included-tools)
- [Requirements](#requirements)
- [Getting started](#getting-started)
  - [Installing](#installing)
  - [Building](#building)

## Included tools

This template contains some preconfigured development tools:

- [Svelte Kit](#svelte-kit)
- [Typescript](#typescript)
- [Tailwind CSS](#tailwind-css)
- [Bits-ui](#bits-ui)
- [Convex](#convex)
- [Prettier](#prettier)
- [ESLint](#eslint)
- [Playwright](#playwright)
- [Changesets](#changesets)

## Requirements

This template requires the use of [pnpm](https://pnpm.js.org/en/). You can [install pnpm](https://pnpm.io/installation) with:

```bash
npm i -g pnpm
```

## Svelte Kit
Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## TypeScript
A superset of Javascript that adds an additional layer of Typings, bringing more security and efficiency to the written code.
> Check [TypeScript](https://www.typescriptlang.org/) documentation.

## Tailwind CSS
A utility-first CSS framework. Including @tailwindcss/forms and @tailwindcss/typography.
> Check [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) documentation. 
pnpm  i tailwindcss @tailwindcs/vite

## Bits-ui
Headless components for Svelte.
> Check [Bits-ui](https://bits-ui.com/docs/introduction) introduction.
pnpm i bits-ui

## Convex
Open-source reactive database for apps.
> Check [Convex](https://docs.convex.dev/quickstart/svelte) documentation.
To install Convex - pnpm i convex convex-svelte
Set up Convex dev deployment - pnpx convex dev 

In src/+layout.svelte
<script lang="ts">
	import '../app.css';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';

	const { children } = $props();
	setupConvex(PUBLIC_CONVEX_URL);
</script>

{@render children()}


## Prettier
Code formatting that assures consistency across all projects.
> Check [Prettier](https://prettier.io/) documentation.

## ESLint
Code linting that enforces industries' best practices.
> Check [ESLint](https://eslint.org/) documentation.
> Use [Finsweet custom configuration](https://github.com/finsweet/eslint-config) recomended.

## Playwright
Fast and reliable end-to-end testing.
> Check [Playwright](https://playwright.dev/) documentation.

## Changesets
A way to manage your versioning and changelogs.
> Check [Changesets](https://github.com/changesets/changesets) documantation.

### Installing

After creating the new repository, open it in your terminal and install the packages by running:

```bash
pnpm install
```

If this is the first time using Playwright and you want to use it in this project, you'll also have to install the browsers by running:

```bash
pnpm playwright install
```

You can read more about the use of Playwright in the [Testing](#testing) section.

It is also recommended that you install the following extensions in your VSCode editor:

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

**//