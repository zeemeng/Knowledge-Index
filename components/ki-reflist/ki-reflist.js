import Component from "../../lib/Component.js";

export class KiReflist extends Component {
  static tagName = "ki-reflist";

  static styleSheetPaths = [
    "components/ki-common-styles/ki-common-styles.css",
    "components/ki-reflist/ki-reflist.css"
  ];

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
