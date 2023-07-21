import Component from "../../lib/breeze/src/Component.js";
import isWhitespaceTextNode from "../utils/isWhitespaceTextNode.js";

export class KiProse extends Component {
  static tagName = "ki-prose";

  static styleSheet = `
  :host {
    display: block;
    white-space: pre-line;
  }
  `;

  static template = "<slot></slot>";

  static init = this.initClass();

  connectedCallback() {
    while (isWhitespaceTextNode(this.firstChild)) this.firstChild.remove(); // Removes leading whitespace-only text nodes

    // Trims leading whitespace from first leading text node that is not whitespace-only.
    if (this.firstChild instanceof Text && /^\s/.test(this.firstChild.textContent))
      this.firstChild.textContent = this.firstChild.textContent.trimStart();
  }
}
