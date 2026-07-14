# AGENTS

## Repository Organization

All shared functionality is defined in `src/`.

All functionality exclusive to the website is contained in `site/`.

All functionality exclusive to executables is defined in `exe/`.

All ESLint rules are defined in `eslint.config.js`.

The Vite configuration is defined in `vite.config.mjs`.

## Scripts

See the "scripts" section of `package.json` for all available scripts common for development.

When running NodeJS, always use `pnpm exec node`.

## Code Validation

After editing any source code, you must run `pnpm run validate`, which will run a collection of code validation tests. You must iteratively address these diagnostics and re-run `pnpm run validate` until all diagnostics have been addressed.

## Mantine UI framework

This project relies mainly on the [Mantine](https://mantine.dev) UI framework which provides a comprehensive collection of react components. Use components from the installed "@mantine/*" packages.

### Colors

For styles, you must _ALWAYS_ and _ONLY_ use Mantine UI colors. _NEVER_ use literal colors. All Mantine UI colors are defined by CSS variables of the form "mantine-color-*". This is for the sake of keeping the color scheme consistent and modular across the entire site. The following CSS variables are common colors you must prioritize using, as they are independent of color scheme:

```
--mantine-primary-color-contrast
--mantine-color-bright
--mantine-color-text
--mantine-color-body
--mantine-color-error
--mantine-color-success
--mantine-color-placeholder
--mantine-color-anchor
--mantine-color-default
--mantine-color-default-hover
--mantine-color-default-color
--mantine-color-default-border
--mantine-color-dimmed
--mantine-color-disabled
--mantine-color-disabled-color
--mantine-color-disabled-border
--mantine-color-dark-text
--mantine-color-dark-filled
--mantine-color-dark-filled-hover
--mantine-color-dark-light
--mantine-color-dark-light-hover
--mantine-color-dark-light-color
--mantine-color-dark-outline
--mantine-color-dark-outline-hover
```

## Vite and Vitest

This project uses Vite for bundling and Vitest (with Jest) for testing.

## Pages

All pages are defined in `.page.tsx` files in `site/page`. Each page is a `.tsx` file that has a default export React component. If the page needs styling, then it must define its styles in a `.module.css` file and import that CSS module into the `.tsx` file, where the default import is a namespace called `classes`. See the existing pages at the filepaths `site/page/**/*.page.tsx` for examples.

## Components

All components are defined in `site/component/`. Each component is a `.tsx` file that has a default export React component. If the component needs styling, then it must define its styles in a `.module.css` file and import that CSS module into the `.tsx` file, where the default import is a namespace called `classes`. See the existing components in `site/component/` for examples.

Each component also has a an associated storybook `.story.tsx` file that shows a few ways that the component can be used and configured.

## Icons

Always use phosphor icons, provided by the "@phosphor-icons/react", when you need icons.
