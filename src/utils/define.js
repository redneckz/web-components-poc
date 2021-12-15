import { render } from "preact";
import { html } from "./html";

export function define(WebComponent) {
  const Component = class extends WebComponent {
    static tag = WebComponent.tag;
    static props = WebComponent.props;
    static slots = WebComponent.slots;
    static events = WebComponent.events;
    static template = WebComponent.template;

    static get observedAttributes() {
      return WebComponent.observedAttributes || Object.keys(WebComponent.props);
    }

    constructor() {
      super();
      this.defineProps();
      this.slotObserver = new MutationObserver((mutationsList) => {
        mutationsList.flatMap((_) => [..._.addedNodes]).forEach((_) => this.initSlot(_));
      });
    }

    connectedCallback() {
      this.render();
      this.initAllSlots();
      this.slotObserver.observe(this, { childList: true });
      super.connectedCallback && super.connectedCallback();
    }

    disconnectedCallback() {
      this.slotObserver.disconnect();
      super.disconnectedCallback && super.disconnectedCallback();
    }

    render() {
      return render(html`<${WebComponent.template} ...${this._props} />`, this);
    }

    defineProps() {
      const props = WebComponent.props || {};
      this._props = {};
      for (const key in props) {
        const converter = props[key];
        if (this.hasAttribute(key)) {
          this._props[key] = converter(this.getAttribute(key));
        }
        Object.defineProperty(this, key, {
          get() {
            return this._props[key];
          },
          set(_) {
            this._props[key] = converter(_);
            this.render();
          }
        });
      }
    }

    initAllSlots() {
      this.querySelectorAll("[slot]").forEach((_) => this.initSlot(_));
    }

    initSlot(child) {
      const slots = WebComponent.slots || {};
      const slotName = child.getAttribute("slot");
      if (!slotName || !slots[slotName]) return;
      const slot = this.querySelector(slots[slotName]);
      slot?.replaceChildren(child);
    }
  };
  return Component;
}
