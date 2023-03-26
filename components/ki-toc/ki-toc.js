import Component from "../../lib/Component.js";
import { KiTocEntry } from "../ki-toc-entry/ki-toc-entry.js";
import { KiTopic } from "../ki-topic/ki-topic.js";

export class KiToc extends Component {
  static tagName = "ki-toc";

  static template = ``;

  static observedAttributes = ["section"];

  static init = this.initClass();

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    while (this.shadowRoot.firstChild) this.shadowRoot.firstChild.remove();
    const sectionElement = document.getElementById(newValue);
    if (!sectionElement) return;

    let tocEntries = Array.from(sectionElement.children);
    tocEntries = tocEntries.map(node => this.recursivelyPopulateTocEntries(node, newValue));
    tocEntries = tocEntries.filter(entry => entry !== null);

    this.shadowRoot.append(...tocEntries);
  }

  recursivelyPopulateTocEntries(node, sectionPath) {
    if (!(node instanceof KiTopic)) return null;

    const result = new KiTocEntry();
    result.setAttribute("path", `/${sectionPath}#${node.id}`);
    result.setAttribute("name", node.getAttribute("long-name") || node.getAttribute("name"));
    let subEntries = Array.from(node.children);
    subEntries = subEntries.reduce((accum, childNode) => {
      const subEntry = this.recursivelyPopulateTocEntries(childNode, sectionPath);
      if (subEntry) accum.push(subEntry);
      return accum;
    }, []);
    result.append(...subEntries);

    return result;
  }
}
