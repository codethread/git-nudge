import type {AsyncStorage} from "@tanstack/react-query-persist-client"

export const asyncStorage: AsyncStorage = {
	/**
	 * Fetches `key` value.
	 */
	async getItem(key) {
		return window.localStorage.getItem(key)
	},

	/**
	 * Sets `value` for `key`.
	 */
	async setItem(key, value) {
		window.localStorage.setItem(key, value)
	},

	/**
	 * Removes a `key`
	 */
	async removeItem(key) {
		return window.localStorage.removeItem(key)
	},
}
