# End-to-End Tests

This directory contains Playwright integration tests for the git-nudge application.

## Setup

The tests are configured to use playwright's chromium browser and will automatically build and start the web app before running tests.

## Available Scripts

- `pnpm test:e2e` - Run all e2e tests headlessly and open a browser with failures.
- `pnpm test:e2e:tui` - Similar to `pnpm test:e2e` but with a text-based UI.

> **NOTE**: Agentic tools must run `pnpm test:e2e:tui` to see the output.

### Additional options

- `pnpm test:e2e --ui` - Run tests with Playwright's interactive UI.
- `pnpm test:e2e --debug` - Run tests with Playwright's debugging UI which allows you to step through the tests and inspect the page state, including selectors.

## Test Structure

Tests should be simple and focus on exercising the application's core functionality in an integrated manner, i.e ensuring all providers and routes are working together.

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-test)
- [Vscode extension](https://playwright.dev/docs/getting-started-vscode)
