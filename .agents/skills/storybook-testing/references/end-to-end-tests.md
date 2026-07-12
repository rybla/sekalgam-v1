---
version: 10.5
framework: react-vite
language: TypeScript
---

# Stories in end-to-end tests

Storybook seamlessly integrates with additional testing frameworks like [Cypress](https://www.cypress.io/) and [Playwright](https://playwright.dev/) to provide a comprehensive testing solution. By leveraging the Component Story Format (CSF), developers can write test cases that simulate user interactions and verify the behavior of individual components within the Storybook environment. This approach enables developers to thoroughly test their components' functionality, responsiveness, and visual appearance across different scenarios, resulting in more robust and reliable applications.

## With Playwright

[Playwright](https://playwright.dev/) is a browser automation tool and end-to-end testing framework from Microsoft. It offers cross-browser automation, mobile testing with device emulation, and headless testing. With Component Story Format, your stories are reusable with Playwright. Each named export (in other words, a story) is renderable within your testing setup.

A real-life scenario of user flow testing with Playwright would be how to test a login form for validity. For example, if you had the following story already created:

```ts
// LoginForm.stories.ts|tsx — CSF 3
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyForm: Story = {};

export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByTestId('email'), 'email@provider.com');

    await userEvent.type(canvas.getByTestId('password'), 'a-random-password');

    // See https://storybook.js.org/docs/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await userEvent.click(canvas.getByRole('button'));

    // 👇 Assert DOM structure
    await expect(
      canvas.getByText(
        'Everything is perfect. Your account is ready and we should probably get you started!',
      ),
    ).toBeInTheDocument();
  },
};
```

The play function contains small snippets of code that run after the story renders. It allows you to sequence interactions in stories.

With Playwright, you can write a test to check if the inputs are filled and match the story:

```js
// tests/login-form/login.spec.js

test('Login Form inputs', async ({ page }) => {
  await page.goto('http://localhost:6006/iframe.html?id=components-login-form--example');
  const email = await page.inputValue('#email');
  const password = await page.inputValue('#password');
  await expect(email).toBe('email@provider.com');
  await expect(password).toBe('a-random-password');
});
```

Once you execute Playwright, it opens a new browser window, loads Storybook's isolated iframe, asserts if the inputs contain the specified values, and displays the test results in the terminal.

**More testing resources**

- [Interaction testing](https://storybook.js.org/docs/writing-tests/interaction-testing.md) for user behavior simulation
- [Accessibility testing](https://storybook.js.org/docs/writing-tests/accessibility-testing.md) for accessibility
- [Visual testing](https://storybook.js.org/docs/writing-tests/visual-testing.md) for appearance
- [Snapshot testing](https://storybook.js.org/docs/writing-tests/snapshot-testing.md) for rendering errors and warnings
- [Test coverage](https://storybook.js.org/docs/writing-tests/test-coverage.md) for measuring code coverage
- [CI](https://storybook.js.org/docs/writing-tests/in-ci.md) for running tests in your CI/CD pipeline
- [Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon.md) for running tests in Storybook
- [Test runner](https://storybook.js.org/docs/writing-tests/integrations/test-runner.md) to automate test execution
- [Unit testing](https://storybook.js.org/docs/writing-tests/integrations/stories-in-unit-tests.md) for functionality
