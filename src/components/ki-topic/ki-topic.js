import Component from "../../lib/Component.js";
import parseNameAttribute from "../utils/parseNameAttribute.js";

export class KiTopic extends Component {
  static tagName = "ki-topic";

  static template = `
  <div class="title-container">
    <a class="topic-title"></a>
  </div>
  <div class="updated none">Updated <span class="moment"></span></div>
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
    "/src/components/ki-common-styles/ki-component-styles.css",
    "/src/components/ki-topic/ki-topic.css"
  ];

  static lightDOMStyleSheetPaths = "/src/components/ki-topic/ki-topic.light-dom.css";

  static observedAttributes = ["name", "long-name", "id", "updated"];

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
    const parsedTitle = parseNameAttribute(
      this.getAttribute("long-name") || this.getAttribute("name")
    );
    const titleAnchor = this.shadowRoot.querySelector(".topic-title");
    while (titleAnchor.firstChild) titleAnchor.firstChild.remove();
    titleAnchor.replaceChildren(parsedTitle);
    titleAnchor.setAttribute("href", "#" + this.id);

    const updated = this.getAttribute("updated");
    if (updated !== null && updated !== "") {
      this.shadowRoot.querySelector(".moment").textContent = updated;
      this.shadowRoot.querySelector(".updated").classList.remove("none");
    } else this.shadowRoot.querySelector(".updated").classList.add("none");

    /* For separator feature */
    // if (this.getAttribute("level") === "1")
    //   this.shadowRoot.querySelector(".separator").classList.remove("none");
    // else this.shadowRoot.querySelector(".separator").classList.add("none");
  }
}
