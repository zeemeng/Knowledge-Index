import Component from "../../lib/breeze/index.js";
import store from "../../store/store.js";
import getPageScrollRatio from "../utils/getPageScrollRatio.js";
import scrollPageByRatio from "../utils/scrollPageByRatio.js";

export class KiSidebar extends Component {
  static tagName = "ki-sidebar";

  static styleSheetPaths = [
    "/src/components/ki-common-styles/ki-component-styles.css",
    "/src/components/ki-sidebar/ki-sidebar.css"
  ];

  static template = `
  <svg class="sidebar-show-control" width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Show Sidebar</title>
    <path
      d="M9.2571 11.1825V6.8679H21.0114V4.95028H9.2571V0.635653L3.98366 5.90909L9.2571 11.1825ZM0.272727 11.1648H2.19034V0.653409H0.272727V11.1648Z"
      fill="black"
      fill-opacity="0.25"
    />
  </svg>
  <aside class="sidebar">
    <div class="sidebar-controls">
      <svg class="sidebar-hide-control" width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Hide Sidebar</title>
        <path
          d="M9.2571 11.1825V6.8679H21.0114V4.95028H9.2571V0.635653L3.98366 5.90909L9.2571 11.1825ZM0.272727 11.1648H2.19034V0.653409H0.272727V11.1648Z"
          fill="black"
          fill-opacity="0.25"
        />
      </svg>
      <form class="sidebar-search-control flex">
        <input class="sidebar-search-input" type="text" placeholder="Does not work currently..." />
        <button class="sidebar-search-submit flex" type="submit">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6.58444" cy="6.58444" r="6.58444" fill="white"/>
            <circle cx="6.58444" cy="6.58444" r="6.08444" stroke="black" stroke-opacity="0.5"/>
            <line x1="11.0141" y1="10.9341" x2="16.3536" y2="16.2736" stroke="black" stroke-opacity="0.5"/>
          </svg>
        </button>
      </form>
      <div class="sidebar-filter-control flex">
        <div>Filter by</div>
        <div><span class="filter-by-section">Current section</span> | <span class="filter-by-all">All</span></div>
      </div>
    </div>
    <div class="sidebar-content">
      <div class="sidebar-toc">
        <ki-toc></ki-toc>
      </div>
      <div class="sidebar-search-result none">
        <div class="sidebar-search-result-clear">Clear results</div>
        <div class="sidebar-search-result-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim asperiores deleniti voluptatum molestias obcaecati! Assumenda quisquam
          sequi possimus provident optio quae consequuntur perferendis explicabo nisi odit vero numquam, repudiandae labore quaerat quia ipsum
          ratione quibusdam voluptatem tempora corrupti laborum architecto earum magnam. Illum tempore incidunt nam, mollitia architecto
          assumenda explicabo.
        </div>
      </div>
    </div>
  </aside>
  `;

  static init = this.initClass();

  activeSectionState = this.createState();

  constructor() {
    super();
    this.shadowRoot.querySelector(".sidebar-show-control").onclick = () => {
      const ratio = getPageScrollRatio();
      this.classList.add("active");
      scrollPageByRatio(ratio, 110);
    };
    this.shadowRoot.querySelector(".sidebar-hide-control").onclick = () => {
      const ratio = getPageScrollRatio();
      this.classList.remove("active");
      scrollPageByRatio(ratio, 110);
    };
  }

  connectedCallback() {
    this.storeSubscription = store.subscribe(state =>
      this.activeSectionState.mutate(state.activeSection)
    );
  }

  disconnectedCallback() {
    this.storeSubscription.unsubscribe();
  }

  render() {
    const activeSectionId = this.activeSectionState.value.id;
    this.shadowRoot.querySelector("ki-toc").setAttribute("section", activeSectionId);
  }
}
