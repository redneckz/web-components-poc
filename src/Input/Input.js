import { define } from "../utils/define";
import { html } from "../utils/html";
import "./Input.css";

export const Input = define(
  class extends HTMLElement {
    static tag = "rshb-input";

    static props = {
      id: String,
      name: String,
      type: String,
      value: String,
      placeholder: String,
      disabled: Boolean
    };

    static events = {
      onChange: "input"
    };

    static template = (props) => html`<input type="text" class="form-control" ...${props} />`;
  }
);
