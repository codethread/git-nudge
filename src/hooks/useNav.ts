import {create} from "zustand"

export const Pages = {
	LOGIN: "login",
	WELCOME: "welcome",
	DASHBOARD: "dashboard",
} as const

export type Page = (typeof Pages)[keyof typeof Pages]

interface Nav {
	page: Page
	nav(page: Page): void
}

export const useNavigation = create<Nav>()((set) => ({
	page: Pages.DASHBOARD,
	nav: (page) => {
		set({page})
	},
}))
