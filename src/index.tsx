import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const container = document.getElementById("app") as HTMLElement;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//@ts-ignore: container is never null
const root = createRoot(container);
root.render(<App />);
