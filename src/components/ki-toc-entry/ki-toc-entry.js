import Component from "../../lib/Component.js";
import parseNameAttribute from "../utils/parseNameAttribute.js";

export class KiTocEntry extends Component {
  static tagName = "ki-toc-entry";

  static styleSheetPaths = [
    "/src/components/ki-common-styles/ki-component-styles.css",
    "/src/components/ki-toc-entry/ki-toc-entry.css"
  ];

  static template = `
  <div class="toc-entry grid">
      <svg class="arrow" width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="-0.5" x2="4.13491" y2="-0.5" transform="matrix(0.688192 0.725529 -0.594053 0.804426 0 1)" stroke="black"/>
        <line y1="-0.5" x2="4.13487" y2="-0.5" transform="matrix(0.688238 -0.725485 0.594004 0.804462 2.84473 3.99982)" stroke="black"/>
      </svg>
      <svg class="dot" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="5" fill="black"/>
      </svg>
    <ki-link path=""></ki-link>
  </div>
  <div class="sub-entries">
    <slot></slot>
  </div>
  `;

  static observedAttributes = ["path", "name"];

  static init = this.initClass();

  isCollapsedState = this.createState(false);

  attributeChangedCallback(attribName, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (attribName === "path")
      this.shadowRoot.querySelector("ki-link").setAttribute("path", newValue);
    if (attribName === "name")
      this.shadowRoot.querySelector("ki-link").replaceChildren(parseNameAttribute(newValue));
  }

  connectedCallback() {
    if (this.querySelector("ki-toc-entry")) {
      this.shadowRoot.querySelector(".arrow").classList.remove("none");
      this.shadowRoot.querySelector(".dot").classList.add("none");
      this.shadowRoot.querySelector(".sub-entries").classList.remove("none");
    } else {
      this.shadowRoot.querySelector(".arrow").classList.add("none");
      this.shadowRoot.querySelector(".dot").classList.remove("none");
      this.shadowRoot.querySelector(".sub-entries").classList.add("none");
    }

    this.shadowRoot.querySelector(".arrow").onclick = () => this.classList.toggle("collapsed");
  }
}
