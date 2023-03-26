import Component from "../../lib/Component.js";

export class KiIcode extends Component {
  static tagName = "ki-icode";

  static styleSheet = `
  span {
    font-family: var(--code-font);
    color: var(--inline-code-color);
    background-color: var(--inline-code-bg);
    padding: 0.2rem 0.6rem;
  }
  `;

  static template = `<span><slot></slot></span>`;

  static init = this.initClass();
}
