import {Providers} from "./Providers";
import "./styles.css";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Providers />
	</React.StrictMode>,
);
