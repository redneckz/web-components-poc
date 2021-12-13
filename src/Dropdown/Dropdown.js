import { memo } from "preact/compat";
import { useCallback, useState } from "preact/hooks";
import { define } from "../utils/define";
import { html } from "../utils/html";
import "./Dropdown.scss";

export const Dropdown = define(
  class extends HTMLElement {
    static tag = "rshb-dropdown";

    static props = {
      id: String,
      name: String,
      disabled: Boolean
    };

    static slots = {
      options: ".options"
    };

    static template = memo(({ id, name, disabled }) => {
      // eslint-disable-next-line
      const [expanded, setExpanded] = useState(false);
      const handleExpand = useCallback(() => {
        setExpanded((_) => !_);
      }, []);
      return html`<div class="dropdown" onClick=${handleExpand}>
        <button
          id=${id}
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded=${expanded ? "true" : "false"}
          disabled=${disabled}
        >
          ${name}
        </button>
        <div class="options" style=${{ display: expanded ? "block" : "none" }} role="list" aria-labelledby=${id} />
      </div>`;
    });
  }
);
