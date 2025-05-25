import {test, expect} from "@playwright/test"

const routes = [
	{path: "/", name: "Home", text: "Open Merge Requests:"},
	{path: "./users", name: "Users", text: "Users in this GitLab instance"},
]

test.beforeEach(async ({page}) => {
	// Listen for all console events and log for debugging
	page.on("console", (msg) => {
		if (msg.type() === "error") console.log(`Error text: "${msg.text()}"`)
	})
})

test.afterEach(async ({page}, testInfo) => {
	await page.screenshot({
		path: `e2e/screenshots/${testInfo.title.replaceAll(/[^a-zA-Z0-9_-]/g, "-").toLowerCase()}.png`,
		fullPage: true,
	})
})

test.describe("Route Navigation Tests", () => {
	for (const {path, name, text} of routes) {
		test(`should load ${name} page (${path})`, async ({page}) => {
			await page.goto(`${path}?fake=true`)

			await page.waitForLoadState("networkidle")

			expect(page.url()).toContain("fake=true")

			const body = await page.locator("body")
			await expect(body).toBeVisible()
			await expect(page.getByText(text)).toBeVisible()
		})
	}

	test("should navigate between all routes", async ({page}) => {
		await page.goto("/?fake=true")
		await page.waitForLoadState("networkidle")

		for (const {path, text} of routes.filter((r) => r.path !== "/")) {
			await page.goto(`${path}?fake=true`)
			await page.waitForLoadState("networkidle")

			// Verify we're on the correct page
			expect(page.url()).toContain("fake=true")
			await expect(page.getByText(text)).toBeVisible()
		}
	})

	for (const {path, text} of routes) {
		test(`should handle page refresh on ${path}`, async ({page}) => {
			await page.goto(`${path}?fake=true`)
			await page.waitForLoadState("networkidle")

			await page.reload()
			await page.waitForLoadState("networkidle")

			expect(page.url()).toContain("fake=true")

			await expect(page.getByText(text)).toBeVisible()
		})
	}
})
