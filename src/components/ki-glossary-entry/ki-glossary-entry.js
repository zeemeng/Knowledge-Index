import Component from "../../lib/breeze/src/Component.js";
import { KiSection } from "../ki-section/ki-section.js";
import { KiTopic } from "../ki-topic/ki-topic.js";
import parseNameAttribute from "../utils/parseNameAttribute.js";

export class KiGlossaryEntry extends Component {
  static tagName = "ki-glossary-entry";

  static styleSheetPaths = [
    "/src/components/ki-common-styles/ki-component-styles.css",
    "src/components/ki-glossary-entry/ki-glossary-entry.css"
  ];

  static template = `
  <div></div>
  <ki-link></ki-link>
  `;

  static init = this.initClass();

  set targetElement(targetElement) {
    function getNameAttribute(element, preferLongName = true) {
      if (preferLongName)
        return element.getAttribute("long-name")?.trim() || element.getAttribute("name")?.trim();
      else return element.getAttribute("name")?.trim();
    }

    let parentTopicOrSectionElement;
    let ancestorSectionId;

    // Set the title property to a string representing the lineage of the targetElement
    const ancestryNames = new Array(getNameAttribute(targetElement, false));
    for (let parent = targetElement.parentElement; parent; parent = parent.parentElement) {
      if (!(parent instanceof KiTopic || parent instanceof KiSection)) continue;

      ancestryNames.push(getNameAttribute(parent, false));
      if (!parentTopicOrSectionElement) parentTopicOrSectionElement = parent;
      if (parent instanceof KiSection) ancestorSectionId = parent.id;
    }
    this.title = ancestryNames.reverse().join(" --> ");

    // Set the ki-link to point to the targetElement
    const targetElementName = getNameAttribute(targetElement);
    const link = this.shadowRoot.querySelector("ki-link");
    link.append(parseNameAttribute(targetElementName));
    if (targetElement instanceof KiTopic)
      link.setAttribute("path", "/" + ancestorSectionId + "#" + targetElement.id);
    // expecting targetElement to be instance of KiSection
    else link.setAttribute("path", "/" + targetElement.id);

    // Set an appropriate label for the name of the targetElement's parent
    if (parentTopicOrSectionElement) {
      const parentLabelElement = this.shadowRoot.querySelector("div");
      const parentNameAttribute = getNameAttribute(parentTopicOrSectionElement, false);
      parentLabelElement.append(parseNameAttribute(parentNameAttribute));
    }
  }
}
