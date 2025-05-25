import {defineConfig, devices} from "@playwright/test"

export default defineConfig({
	// Look for test files in the "e2e" directory
	testDir: "./e2e",
	snapshotDir: "./e2e/snapshots",
	updateSnapshots: "missing",
	outputDir: "./e2e/reports/outputs",

	fullyParallel: true,

	// Fail the build on CI if you accidentally left test.only in the source code
	forbidOnly: !!process.env.CI,

	// Retry on CI only
	retries: process.env.CI ? 2 : 0,

	// Opt out of parallel tests on CI
	workers: process.env.CI ? 1 : undefined,

	preserveOutput: "failures-only",

	// Reporter to use
	reporter: [
		["list"],
		["html", {open: "on-failure", outputFolder: "./e2e/reports/html"}],
	],

	use: {
		baseURL: "http://localhost:1420/git-nudge/",
		trace: "on-first-retry",
		screenshot: {mode: "on", fullPage: true},
	},

	// Configure projects for major browsers
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chromium"],
			},
		},
	],

	// Run your local dev server before starting the tests
	webServer: {
		command: "pnpm dev",
		url: "http://localhost:1420/git-nudge",
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
})
