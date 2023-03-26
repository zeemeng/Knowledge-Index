import Component from "../../lib/Component.js";
import { actionTypes } from "../../store/actions.js";
import store from "../../store/store.js";

export class KiNavbar extends Component {
  static tagName = "ki-navbar";

  static styleSheetPaths = [
    "components/ki-common-styles/ki-common-styles.css",
    "components/ki-navbar/ki-navbar.css"
  ];

  static template = `
  <nav>
    <div class="container grid text-center">
      <div class="logo">KNOWLEDGE<br />INDEX</div>
      <div class="nav-title"></div>
      <div class="dropdown-toggle">See All<br />Sections</div>
    </div>
    <div class="dropdown">
      <div class="dropdown-bg">
        <div class="dropdown-content container flex"></div>
      </div>
    </div>
  </nav>
  `;

  static init = this.initClass();

  connectedCallback() {
    this.storeSubscription = store.subscribe(state => this.setState(state));
    this.shadowRoot.querySelector(".dropdown-toggle").onclick = this.toggleNavDropdown;
  }

  disconnectedCallback() {
    this.storeSubscription.unsubscribe();
  }

  // Shows the navbar dropdown
  // showNavDropdown = () => {
  //   this.shadowRoot.querySelector(".dropdown").style.display = "block";
  //   // document.querySelector(".sidebar").style.zIndex = -1;
  //   this.shadowRoot.querySelector(".dropdown-toggle").onclick = this.hideNavDropdown;
  //   document.querySelector("ki-main").addEventListener("click", this.hideNavDropdown);
  // };

  // Hides the navbar dropdown
  // hideNavDropdown = () => {
  //   this.shadowRoot.querySelector(".dropdown").style.display = "none";
  //   // document.querySelector(".sidebar").style.zIndex = "auto";
  //   this.shadowRoot.querySelector(".dropdown-toggle").onclick = this.showNavDropdown;
  //   document.querySelector("ki-main").removeEventListener("click", this.hideNavDropdown);
  // };

  toggleNavDropdown = () => store.dispatch(actionTypes.toggleNavDropdown);

  render = () => {
    if (this.state.showNavDropdown !== this.previousState.showNavDropdown)
      this.shadowRoot.querySelector(".dropdown").style.display = this.state.showNavDropdown
        ? "block"
        : "none";

    if (this.state.sections !== this.previousState.sections) {
      const dropdownLinks = this.state.sections.reduce((accum, section) => {
        if (section.id === "404") return accum;

        const path = `/${section.id}`;
        const title = section.longName ? section.longName : section.name;
        const textContent = section.name;

        accum.push(`<ki-link path="${path}" title="${title}">${textContent}</ki-link>`);
        return accum;
      }, []);

      this.shadowRoot.querySelector(".dropdown-content").innerHTML = dropdownLinks.join("");
    }

    if (this.state.activeSection !== this.previousState.activeSection) {
      const { longName, name } = this.state.activeSection;
      this.shadowRoot.querySelector(".nav-title").textContent = longName || name || "";
    }
  };
}
