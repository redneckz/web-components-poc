require("@babel/register")({
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    [
      "babel-plugin-css-modules-transform",
      {
        extensions: [".css", ".scss"]
      }
    ]
  ]
});

// DOM API mocks
globalThis.HTMLElement = function HTMLElement() {};

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const App = require("./App").default;

const appHTML = ReactDOMServer.renderToString(React.createElement(App));

process.stdout.write(`REACT_APP_SSR=${appHTML}\n`);
