import { define } from "../utils/define";
import { html } from "../utils/html";
import "./DropdownOption.scss";

export const DropdownOption = define(
  class extends HTMLElement {
    static tag = "rshb-option";

    static props = {
      name: String
    };

    static events = {
      onClick: "click"
    };

    static template = ({ name }) =>
      html`<a role="listitem">${name}</a>`;
  }
);
