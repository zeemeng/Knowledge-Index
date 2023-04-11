import Component from "../../lib/Component.js";

export class KiRef extends Component {
  static tagName = "ki-ref";

  static styleSheetPaths = [
    "/src/components/ki-common-styles/ki-component-styles.css",
    "/src/components/ki-ref/ki-ref.css"
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
