import htm from "htm";
import { h } from "preact";

// TODO Not needed in production. Should be replaced with corresponding TS config
export const html = htm.bind(h);
