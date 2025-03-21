import {Button} from "@/components/ui/button";
import {duration} from "@/lib/duration";
import type {RequestConfig} from "@/utils/execute";
import netrc from "netrc";
import React, {useRef, useState} from "react";
import {P, match} from "ts-pattern";
import {z} from "zod";
import {fromError} from "zod-validation-error";
import {createStore, useStore} from "zustand";
import {combine} from "zustand/middleware";
import {useShallow} from "zustand/react/shallow";

const NetrcSchema = z.record(
	z.string(),
	z.object({
		login: z.string(),
		password: z.string(),
	}),
);
type Netrc = z.TypeOf<typeof NetrcSchema>;

const StorageConfigSchema = z
	.object(
		{
			global: z
				.object(
					{
						requestTimeoutMillis: z
							.number()
							.gt(0)
							.int()
							.default(duration(5, "secs")),
					},
					{
						message: "dev error, missing defaults",
					},
				)
				.default({}),
		},
		{message: "dev error, missing defaults"},
	)
	.default({});

type StorageConfig = z.TypeOf<typeof StorageConfigSchema>;

export interface IConfig extends StorageConfig {
	gitlab: {
		domain: string;
		user: string;
		token: string;
	};
}

const configContext = React.createContext<null | ConfigStore>(null);

interface Props extends IChildren {
	netrcStr: string;
	initConfig: unknown;
}

type ConfigStore = ReturnType<typeof createConfigStore>;
function createConfigStore(config: IConfig) {
	return createStore(
		combine(config, (set) => ({
			setConfig: <Key extends keyof IConfig>(key: Key, value: IConfig[Key]) =>
				set({[key]: value}),
		})),
	);
}

export const ConfigProvider = ({children, netrcStr, initConfig}: Props) => {
	const stored = StorageConfigSchema.parse(initConfig);
	const config = parseNetrc(netrcStr);
	const [chosen, setChosen] = useState<IConfig["gitlab"]>();

	return match([config, chosen])
		.with([{tag: "invalid", err: P.select()}, P._], (err) => <p>{err}</p>)
		.with([{tag: "multiple"}, P.nullish], ([{netrc}]) => (
			<ChooseNetrc onSelect={setChosen} netrc={netrc} />
		))
		.with([{tag: "multiple"}, P.select(P.nonNullable)], (gitlab) => (
			<Provider config={{...stored, gitlab}}>{children}</Provider>
		))
		.with([{tag: "valid", netrc: P.select()}, P._], ({domain, pass, user}) => (
			<Provider config={{...stored, gitlab: {domain, user, token: pass}}}>
				{children}
			</Provider>
		))
		.exhaustive();
};

function ChooseNetrc({
	netrc,
	onSelect,
}: {
	netrc: Netrc;
	onSelect: (conf: IConfig["gitlab"]) => void;
}) {
	const configs = Object.entries(netrc);
	return (
		<div>
			<p>You have multiple machine configs, which will you use for gitlab?</p>
			{configs.map(([domain, {login, password}]) => (
				<div key={domain}>
					<Button
						onClick={() => {
							onSelect({user: login, domain, token: password});
						}}
					>
						{domain} {login}
					</Button>
				</div>
			))}
		</div>
	);
}

function Provider({children, config}: IChildren & {config: IConfig}) {
	const store = useRef(createConfigStore(config)).current;

	return (
		<configContext.Provider value={store}>{children}</configContext.Provider>
	);
}

function useConfigStore() {
	const c = React.useContext(configContext);
	if (!c) throw new Error("ah");
	return c;
}

export function useConfigSetter() {
	const store = useConfigStore();
	return useStore(store, (s) => s.setConfig);
}

export function useConfigRequest() {
	const store = useConfigStore();
	return useStore(
		store,
		useShallow(
			(s): RequestConfig => ({
				domain: s.gitlab.domain,
				token: s.gitlab.token,
				timeout: s.global.requestTimeoutMillis,
			}),
		),
	);
}
export const useConfigMe = () =>
	useStore(
		useConfigStore(),
		useShallow((s) => ({username: s.gitlab.user})),
	);

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

function parseNetrc(netrcStr: string): ParsedConfig {
	const {data, error} = NetrcSchema.safeParse(netrc.parse(netrcStr));
	if (error) {
		return {tag: "invalid", err: fromError(error).toString()};
	}
	const machines = Object.entries(data);
	if (machines.length === 1) {
		const [[domain, {login, password}]] = machines;
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
