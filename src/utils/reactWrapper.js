import React, { memo, useEffect, useRef } from "react";

export function reactWrapper(WebComponent) {
  const { tag } = WebComponent;
  const keys = Object.keys(WebComponent.props || {});
  const events = WebComponent.events || {};
  const eventKeys = Object.keys(events);

  return memo((props) => {
    const attrs = Object.assign(
      {},
      ...keys.map((key) => ({
        [key]: props[key]
      }))
    );

    useEffect(() => {
      if (!customElements.get(WebComponent.tag)) {
        customElements.define(WebComponent.tag, WebComponent);
      }
    }, []);

    const ref = useRef();
    useEffect(
      () => {
        if (!ref.current) return;
        Object.assign(ref.current, attrs);
      },
      // eslint-disable-next-line
      keys.map((_) => props[_])
    );
    for (const eventKey of eventKeys) {
      // It is ok to run hook in cycle, cause eventKeys are totally constant
      // eslint-disable-next-line
      useEffect(() => {
        if (!ref.current || !props[eventKey]) return;
        const host = ref.current;
        const handler = props[eventKey];
        host.addEventListener(events[eventKey], handler, false);
        return () => host.removeEventListener(events[eventKey], handler, false);
      }, [props[eventKey]]); // eslint-disable-line
    }

    return React.createElement(tag, { ref, ...attrs }, props.children);
  });
}
