interface Props {
	onRetry: () => void;
}

export function Setup({ onRetry }: Props) {
	return (
		<div>
			<p>
				Could not laod <span>~/.netrc</span> file. Please create one in the
				format:
			</p>
			<pre>
				{[
					"machine <domain> # e.g git.mycompany.io",
					"login <gitlab username>",
					"password <token>",
				].join("\n")}
			</pre>
			<p>
				Where <span>{"<token>"}</span> is a gitlab access{" "}
				<a
					href="https://docs.gitlab.com/user/profile/personal_access_tokens/"
					target="_blank"
				>
					token
				</a>
			</p>
			<button onClick={() => onRetry()}>retry</button>
		</div>
	);
}
