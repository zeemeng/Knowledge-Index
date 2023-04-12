import Component from "../../lib/Component.js";
import { KiTopic } from "../ki-topic/ki-topic.js";

export class KiCite extends Component {
  static tagName = "ki-cite";

  static styleSheetPaths = [
    "/src/components/ki-common-styles/ki-component-styles.css",
    "/src/components/ki-cite/ki-cite.css"
  ];

  static template = "<a>[<span></span>]</a>";

  static observedAttributes = ["ref"];

  static init = this.initClass();

  render() {
    let ref = this.getAttribute("ref") ?? "";
    if (ref.startsWith("@") && ref.length > 1) {
      let parsedRef = parseInt(ref.slice(1));

      this.onclick = () => {
        let parentKiTopicElement = this;
        while (parentKiTopicElement && !(parentKiTopicElement instanceof KiTopic)) {
          parentKiTopicElement = parentKiTopicElement.parentElement;
        }
        if (parentKiTopicElement) {
          const kiRef = parentKiTopicElement.querySelectorAll("ki-ref")[parsedRef - 1];
          kiRef?.scrollIntoView({ behavior: "smooth" });
        }
      };

      this.shadowRoot.querySelector("a").setAttribute("title", `Reference #${parsedRef}`);
      this.shadowRoot.querySelector("a").removeAttribute("href");
      this.shadowRoot.querySelector("span").textContent = parsedRef;
    } else if (ref) {
      this.onclick = null;

      this.shadowRoot.querySelector("a").removeAttribute("title");
      this.shadowRoot.querySelector("a").setAttribute("href", ref);
      this.shadowRoot.querySelector("span").textContent = ref;
    } else {
      this.onclick = null;

      this.shadowRoot.querySelector("a").removeAttribute("title");
      this.shadowRoot.querySelector("a").removeAttribute("href");
      this.shadowRoot.querySelector("span").textContent = "";
    }

    if (this.textContent) this.shadowRoot.querySelector("span").textContent = this.textContent;
  }
}
