# Web Components PoC

Framework agnostic UI kit example based on [Web Components](https://developer.mozilla.org/ru/docs/Web/Web_Components)

![App](app.png)

## How to Start

1. `$ npm install`
2. `$ npm start`

## How to Build

`$ npm run build` - generates static markup and builds for production

## Standards and Libraries

1. [Autonomous Custom Elements](https://developer.mozilla.org/ru/docs/Web/Web_Components/Using_custom_elements)
2. _NO_ Shadow DOM but [Slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#adding_flexibility_with_slots) approach is implemented
3. [Preact](https://preactjs.com/guide/v10/web-components/#app) as a reactive template engine
4. [HTM](https://github.com/developit/htm) - temporal dependency; should be replaced with corresponding TS/Babel config

## Code Structure

Utils:

1. `src/index.js` - entry point with hydration `ReactDOM.hydrate(<App />, rootElement);`
2. `src/ssr.js` - script which generates static markup `ReactDOMServer.renderToString(React.createElement(App))`
3. `src/utils/define.js` - helper to simplify declaration of custom elements
   - embeds _Preact_ into custom element life cycle as a template engine
   - implements _Slots_ approach
4. `src/utils/reactWrapper.js` - _Web Component_ => _React Component_ adapter
5. `src/utils/html.js` - wrapper for temporal dependency _HTM_

Web Components:

1. `src/Button` - `rshb-button`
2. `src/Checkbox` - `rshb-checkbox`
3. `src/Dropdown` - `rshb-dropdown`
4. `src/Input` - `rshb-input`

Form example: `App.js`

## Web Component Definition

```js
import { define } from "../utils/define";
import { html } from "../utils/html";
import "./Checkbox.css";

export const Checkbox = define(
  class extends HTMLElement {
    // Custom element tag name
    static tag = "rshb-checkbox";

    /**
     * Custom element attributes definition
     *
     * type AttrName = string;
     * type AttrConverter<PropType = any> =(attrValue: string) => PropType;
     * type AttrsDefinition = Record<AttrName, AttrConverter>;
     */
    static props = {
      id: String,
      name: String,
      checked: Boolean,
      disabled: Boolean
    };

    /**
     * Custom element slots definition
     *
     * type SlotName = string;
     * type SlotCSSSelector = string;
     * type SlotsDefinition = Record<SlotName, SlotCSSSelector>;
     */
    static slots = {
      label: "label"
    };

    static events = {
      onClick: "click"
    };

    // Preact component used as a template (hooks could be used here to introduce some logic)
    static template = (props) =>
      html`<div class="form-check">
        <input class="form-check-input" type="checkbox" ...${props} />
        <label for=${props.id} class="form-check-label" />
      </div>`;
  }
);
```

https://developer.mozilla.org/ru/docs/Web/CSS/:defined

```css
rshb-checkbox {
  display: inline;
}

rshb-checkbox:defined {
  opacity: 1;
}

rshb-checkbox:not(:defined) {
  opacity: 0.5;
}
```

## Server-Side Rendering

1. `$ npm run ssr` generates static markup and puts it (as `REACT_APP_SSR` environment variable) in `.env` file.
2. `$ npm start` (as well as `$ npm run build`) uses generated `REACT_APP_SSR` environment variable to substitute it into `<div id="root">%REACT_APP_SSR%</div>` of `public/index.html`
