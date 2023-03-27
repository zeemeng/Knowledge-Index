import Component from "../../lib/Component.js";
import parseKiTopicName from "../utils/parseKiTopicName.js";

export class KiTopic extends Component {
  static tagName = "ki-topic";

  static template = `
  <div class="title-container">
    <a class="topic-title"></a>
  </div>
  <slot></slot>
  `;

  /* Template with separator feature */
  // static template = `
  // <div class="separator flex none">
  //   <div class="line"></div>
  //   <div class="symbol">§</div>
  //   <div class="line"></div>
  // </div>
  // <div class="title-container">
  //   <a class="topic-title"></a>
  // </div>
  // <slot></slot>
  // `;

  static styleSheetPaths = [
    "components/ki-common-styles/ki-common-styles.css",
    "components/ki-topic/ki-topic.css"
  ];

  static lightDOMStyleSheetPaths = "components/ki-topic/ki-topic.light-dom.css";

  static observedAttributes = ["name", "long-name", "id"];

  static init = this.initClass();

  connectedCallback() {
    let level = 1;
    let currentElement = this.parentElement;
    while (currentElement) {
      if (currentElement instanceof KiTopic) level++;
      currentElement = currentElement.parentElement;
    }
    this.setAttribute("level", level);

    this.render();
  }

  render() {
    const parsedTitle = parseKiTopicName(
      this.getAttribute("long-name") || this.getAttribute("name")
    );
    const titleAnchor = this.shadowRoot.querySelector(".topic-title");
    while (titleAnchor.firstChild) titleAnchor.firstChild.remove();
    titleAnchor.append(...parsedTitle);
    titleAnchor.setAttribute("href", "#" + this.id);

    /* For separator feature */
    // if (this.getAttribute("level") === "1")
    //   this.shadowRoot.querySelector(".separator").classList.remove("none");
    // else this.shadowRoot.querySelector(".separator").classList.add("none");
  }
}
