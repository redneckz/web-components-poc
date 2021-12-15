import ReactDOM from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.hydrate(<App />, rootElement);
