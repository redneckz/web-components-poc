import { define } from "../utils/define";
import { html } from "../utils/html";
import "./Button.css";

export const Button = define(
  class extends HTMLElement {
    static tag = "rshb-button";

    // Converters from string (DOM attribute) to corresponding field type (see https://v3.vuejs.org/guide/component-props.html#prop-types)
    static props = {
      type: String,
      primary: Boolean,
      disabled: Boolean
    };

    static slots = {
      name: "button"
    };

    static events = {
      onClick: "click"
    };

    static template = ({ type, primary, disabled }) =>
      html`<button
        class=${["btn", primary ? "btn-primary" : "btn-secondary"].join(" ")}
        type=${type}
        disabled=${disabled}
      />`;
  }
);
