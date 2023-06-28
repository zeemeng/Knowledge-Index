import Component from "../../lib/breeze/index.js";
import { actionTypes } from "../../store/actions.js";
import store from "../../store/store.js";

export class KiMain extends Component {
  static tagName = "ki-main";

  static styleSheetPaths = [
    "/src/components/ki-common-styles/ki-component-styles.css",
    "/src/components/ki-main/ki-main.css"
  ];

  static template = `
  <main class="flex">
    <ki-sidebar></ki-sidebar>
    <div class="main-content">
      <slot></slot>
      <ki-glossary></ki-glossary>
      <ki-section class="flex" id="404" no-toc>Sorry the resource you are looking for does not exist.</ki-section>
    </div>
    <ki-btt-button></ki-btt-button>
  </main>
  `;

  static init = this.initClass();

  connectedCallback() {
    this.storeSubscription = store.subscribe(state => this.setState(state));
  }

  disconnectedCallback() {
    this.storeSubscription.unsubscribe();
  }

  toggleNavDropdown = () => store.dispatch(actionTypes.toggleNavDropdown);

  render = () => {
    this.onclick = this.state.showNavDropdown ? this.toggleNavDropdown : null;
  };
}
