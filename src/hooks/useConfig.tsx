import netrc from "netrc";
import React, { useState } from "react";
import { z } from "zod";
import { fromError } from "zod-validation-error";

const NetrcSchema = z.record(
	z.string(),
	z.object({
		login: z.string(),
		password: z.string(),
	}),
);
type Netrc = z.TypeOf<typeof NetrcSchema>;

export interface IConfig {
	gitlab: {
		domain: string;
		user: string;
		token: string;
	};
}

const configContext = React.createContext<null | IConfig>(null);

interface Props extends IChildren {
	netrcStr: string;
}

export const ConfigProvider = ({ children, ...props }: Props) => {
	const config = parseConfig(props);
	const [chosen, setChosen] = useState<IConfig["gitlab"]>();

	switch (config.tag) {
		case "invalid":
			return <p>{config.err}</p>;
		case "multiple": {
			if (!chosen) {
				const configs = Object.entries(config.netrc);
				return (
					<div>
						<p>
							You have multiple machine configs, which will you use for gitlab?
						</p>
						{configs.map(([domain, { login, password }]) => (
							<div key={domain}>
								<button
									onClick={() => {
										setChosen({ user: login, domain, token: password });
									}}
								>
									{domain} {login}
								</button>
							</div>
						))}
					</div>
				);
			}

			return (
				<configContext.Provider value={{ gitlab: chosen }}>
					{children}
				</configContext.Provider>
			);
		}
		case "valid": {
			const n = config.netrc;
			return (
				<configContext.Provider
					value={{ gitlab: { domain: n.domain, token: n.pass, user: n.user } }}
				>
					{children}
				</configContext.Provider>
			);
		}
		default: {
			assertUnreachable(config);
		}
	}
};

export function useConfig() {
	const c = React.useContext(configContext);
	if (!c) throw new Error("ah");
	return c;
}

type ParsedConfig =
	| {
			tag: "invalid";
			err: string;
	  }
	| {
			tag: "valid";
			netrc: {
				domain: string;
				user: string;
				pass: string;
			};
	  }
	| {
			tag: "multiple";
			netrc: Netrc;
	  };

function parseConfig({ netrcStr }: Omit<Props, "children">): ParsedConfig {
	const { data, error } = NetrcSchema.safeParse(netrc.parse(netrcStr));
	if (error) {
		return { tag: "invalid", err: fromError(error).toString() };
	}
	const machines = Object.entries(data);
	if (machines.length === 1) {
		const [[domain, { login, password }]] = machines;
		return {
			tag: "valid",
			netrc: {
				domain,
				user: login,
				pass: password,
			},
		};
	}

	return {
		tag: "multiple",
		netrc: data,
	};
}

function assertUnreachable(_: never): never {
	throw new Error("Didn't expect to get here");
}
