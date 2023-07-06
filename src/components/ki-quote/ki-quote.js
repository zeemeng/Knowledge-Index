import Component from "../../lib/breeze/src/Component.js";
import { KiTopic } from "../ki-topic/ki-topic.js";

export class KiQuote extends Component {
  static tagName = "ki-quote";

  static styleSheetPaths = [
    "/src/components/ki-common-styles/ki-component-styles.css",
    "/src/components/ki-quote/ki-quote.css"
  ];

  static template = `
  <div class="container">
    <div class="slot-container">
      <slot></slot>
    </div>
    <div class="src-label"></div>
  </div>
  `;

  static observedAttributes = ["src"];

  static init = this.initClass();

  render() {
    const src = this.getAttribute("src");
    const srcLabel = this.shadowRoot.querySelector(".src-label");

    if (!src) {
      srcLabel.classList.add("none");
    } else if (src.startsWith("@") || Number.isInteger(parseInt(src.slice(1)))) {
      srcLabel.classList.add("ref-src-label");
      srcLabel.classList.remove("none");

      const refNum = parseInt(src.slice(1));
      srcLabel.textContent = `Reference #${refNum} `;
      srcLabel.onclick = () => {
        let parentKiTopicElement = this;
        while (parentKiTopicElement && !(parentKiTopicElement instanceof KiTopic)) {
          parentKiTopicElement = parentKiTopicElement.parentElement;
        }
        if (parentKiTopicElement) {
          const kiRef = parentKiTopicElement.querySelectorAll("ki-ref")[refNum - 1];
          kiRef?.scrollIntoView({ behavior: "smooth" });
        }
      };
    } else {
      srcLabel.classList.remove("ref-src-label");
      srcLabel.classList.remove("none");
      srcLabel.textContent = src;
    }
  }
}
