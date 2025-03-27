import type {IAppConfigStore} from "@/hooks/config/useAppConfig"
import {configContext, createConfigStore} from "@/hooks/config/useConfig"
import {useRef} from "react"

export function ConfigProvider({
	children,
	appConfigStore,
}: IChildren & {
	appConfigStore: IAppConfigStore
}) {
	const store = useRef(createConfigStore(appConfigStore)).current

	return (
		<configContext.Provider value={store}>{children}</configContext.Provider>
	)
}
