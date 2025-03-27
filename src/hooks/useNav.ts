import {create} from "zustand"

type Page = "login" | "setup" | "dashboard" | "fakelab"

interface Nav {
	page: Page
	nav(page: Page): void
}

export const useNav = create<Nav>()((set) => ({
	page: "setup",
	nav: (page) => {
		set({page})
	},
}))
