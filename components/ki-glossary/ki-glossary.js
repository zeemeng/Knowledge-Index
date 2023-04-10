import Component from "../../lib/Component.js";
import store from "../../store/store.js";
import parseNameAttribute from "../utils/parseNameAttribute.js";
import populateGlossaryIndex from "../utils/populateGlossaryIndex.js";

export class KiGlossary extends Component {
  static tagName = "ki-glossary";

  static styleSheetPaths = [
    "components/ki-common-styles/ki-common-styles.css",
    "components/ki-glossary/ki-glossary.css"
  ];

  static template = `
  <ki-section id="glossary" name="Glossary" no-toc>
    <div class="glossary-select-control flex">
      <div><button class="active glossary-sections-btn">Sections</button> | <button class="glossary-index-btn">All Terms</button></div>
    </div>
    <div class="glossary-sections flex"></div>
    <div class="glossary-index none"></div>
  </ki-section>
  `;

  static init = this.initClass();

  connectedCallback() {
    this.storeSubscription = store.subscribe(state => this.setState(state));

    // Switches the glossary view to show sections
    this.shadowRoot.querySelector(".glossary-sections-btn").onclick = () => {
      this.shadowRoot.querySelector(".glossary-index").classList.add("none");
      this.shadowRoot.querySelector(".glossary-sections").classList.remove("none");
      this.shadowRoot.querySelector(".glossary-sections-btn").classList.add("active");
      this.shadowRoot.querySelector(".glossary-index-btn").classList.remove("active");
    };

    // Switches the glossary view to show the index
    this.shadowRoot.querySelector(".glossary-index-btn").onclick = () => {
      this.shadowRoot.querySelector(".glossary-index").classList.remove("none");
      this.shadowRoot.querySelector(".glossary-sections").classList.add("none");
      this.shadowRoot.querySelector(".glossary-sections-btn").classList.remove("active");
      this.shadowRoot.querySelector(".glossary-index-btn").classList.add("active");
    };
  }

  disconnectedCallback() {
    this.storeSubscription.unsubscribe();
  }

  render() {
    // Populate sections navigation links
    if (this.state.sections !== this.previousState.sections) {
      const dropdownLinks = this.state.sections.reduce((accum, section) => {
        if (section.id === "404" || section.id === "glossary") return accum;

        const kiLink = document.createElement("ki-link");
        kiLink.setAttribute("path", `/${section.id}`);
        kiLink.setAttribute("title", section.longName ? section.longName : section.name);
        kiLink.append(parseNameAttribute(section.name));

        accum.push(kiLink);
        return accum;
      }, []);

      this.shadowRoot.querySelector(".glossary-sections").replaceChildren(...dropdownLinks);
    }

    // Populate the glossary index
    if (this.state.sections !== this.previousState.sections) populateGlossaryIndex(this);
  }
}
