import {
	useAppConfigStore,
	type IAppConfigStore,
} from "@/hooks/config/useAppConfig"
import {configContext, createConfigStore} from "@/hooks/config/useConfig"
import {useRef} from "react"

export function ConfigProvider({children}: IChildren) {
	const appConfigStore = useAppConfigStore()
	const store = useRef(createConfigStore(appConfigStore)).current

	return (
		<configContext.Provider value={store}>{children}</configContext.Provider>
	)
}
