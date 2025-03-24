import {bridgeContext, type IBridge} from "./useBridge"

interface Props extends IChildren {
	bridge: IBridge
}

export const BridgeProvider = ({children, bridge}: Props) => {
	return (
		<bridgeContext.Provider value={bridge}>{children}</bridgeContext.Provider>
	)
}
