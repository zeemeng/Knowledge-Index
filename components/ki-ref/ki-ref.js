import Component from "../../lib/Component.js";

export class KiRef extends Component {
  static tagName = "ki-ref";

  static styleSheetPaths = [
    "components/ki-common-styles/ki-common-styles.css",
    "components/ki-ref/ki-ref.css"
  ];

  static template = `
  <li>
    <a target="_blank"></a>
    <div>
      <slot></slot> 
    </div>
  </li>
  `;

  static observedAttributes = ["link"];

  static init = this.initClass();

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.render();
  }

  render() {
    const anchor = this.shadowRoot.querySelector("a");
    const link = this.getAttribute("link");
    if (link) {
      anchor.setAttribute("href", link);
      anchor.textContent = link;
      anchor.classList.remove("none");
    } else anchor.classList.add("none");
  }
}
