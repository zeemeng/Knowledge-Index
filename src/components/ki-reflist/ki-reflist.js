import Component from "../../lib/breeze/index.js";

export class KiReflist extends Component {
  static tagName = "ki-reflist";

  static styleSheetPaths = [
    "/src/components/ki-common-styles/ki-component-styles.css",
    "/src/components/ki-reflist/ki-reflist.css"
  ];

  static lightDOMStyleSheetPaths = "/src/components/ki-reflist/ki-reflist.light-dom.css";

  static template = `
  <div class="ref">
    <div>References</div>
    <ol>
      <slot></slot>
    </ol>
  </div>
  `;

  static init = this.initClass();
}
