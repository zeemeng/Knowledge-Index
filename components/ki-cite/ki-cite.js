import Component from "../../lib/Component.js";

export class KiCite extends Component {
  static tagName = "ki-cite";

  static styleSheet = `
  slot {
    color: var(--text-accent-2);
  }
  `;

  static template = "<slot></slot>";

  static init = this.initClass();
}
