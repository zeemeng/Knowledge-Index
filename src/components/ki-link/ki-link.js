import Component from "../../lib/breeze/index.js";
import updatePage from "../navigation-module/navigation-module.js";

export class KiLink extends Component {
  static tagName = "ki-link";

  static styleSheetPaths = "/src/components/ki-link/ki-link.css";

  static template = `<a><slot></slot></a>`;

  static observedAttributes = ["path"];

  static init = this.initClass();

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.shadowRoot.querySelector("a").setAttribute("href", newValue);
  }

  constructor() {
    super();
    this.shadowRoot.querySelector("a").onclick = e => e.preventDefault();
    this.onclick = () => {
      history.pushState(null, document.title, this.getAttribute("path"));
      updatePage();
    };
  }
}
