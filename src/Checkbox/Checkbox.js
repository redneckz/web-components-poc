import { memo } from "preact/compat";
import { define } from "../utils/define";
import { html } from "../utils/html";
import "./Checkbox.css";

export const Checkbox = define(
  class extends HTMLElement {
    static tag = "rshb-checkbox";

    static props = {
      id: String,
      name: String,
      checked: Boolean,
      disabled: Boolean
    };

    static slots = {
      label: "label"
    };

    static events = {
      onClick: "click"
    };

    static template = memo(
      (props) => html`<div class="form-check">
        <input class="form-check-input" type="checkbox" ...${props} />
        <label for=${props.id} class="form-check-label" />
      </div>`
    );
  }
);
