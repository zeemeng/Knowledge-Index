import Component from "../../lib/breeze/src/Component.js";

export class KiBttButton extends Component {
  static tagName = "ki-btt-button";

  static styleSheetPaths = [
    "/src/components/ki-common-styles/ki-component-styles.css",
    "/src/components/ki-btt-button/ki-btt-button.css"
  ];

  static template = `
  <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Scroll to top</title>
    <circle cx="33.5" cy="33.5" r="33" fill="white" stroke="#C4C4C4"/>
    <line x1="33.5355" y1="18" x2="46.0312" y2="30.4957" stroke="#C4C4C4" stroke-width="5" stroke-linecap="round" stroke-linejoin="bevel"/>
    <line x1="21" y1="30.4956" x2="33.4957" y2="17.9999" stroke="#C4C4C4" stroke-width="5" stroke-linecap="round" stroke-linejoin="bevel"/>
    <line x1="33.5" y1="47.5" x2="33.5" y2="19.5" stroke="#C4C4C4" stroke-width="5" stroke-linecap="square" stroke-linejoin="bevel"/>
  </svg>
  `;

  static init = this.initClass();

  showButton = true;

  scrollPageToTop = () => window.scroll({ behavior: "smooth", top: 0 });

  toggleButtonDisplay = () => {
    if (document.documentElement.scrollTop && !this.showButton) {
      this.showButton = true;
      this.style.removeProperty("bottom");
      this.style.removeProperty("opacity");
    }
    if (!document.documentElement.scrollTop && this.showButton) {
      this.showButton = false;
      this.style.bottom = "-3.5rem";
      this.style.opacity = 0;
    }
  };

  connectedCallback() {
    this.onclick = this.scrollPageToTop;
    this.toggleButtonDisplay();
    window.addEventListener("scroll", this.toggleButtonDisplay);
    window.addEventListener("resize", this.toggleButtonDisplay);
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this.toggleButtonDisplay);
    window.removeEventListener("resize", this.toggleButtonDisplay);
  }
}
