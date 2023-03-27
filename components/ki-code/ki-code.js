import Component from "../../lib/Component.js";

export class KiCode extends Component {
  static tagName = "ki-code";

  static styleSheetPaths = [
    "components/ki-common-styles/ki-common-styles.css",
    "components/ki-code/ki-code.css"
  ];

  static template = "<pre><code></code></pre>";

  static init = this.initClass();

  async connectedCallback() {
    const path = this.getAttribute("path");
    const retry = parseInt(this.getAttribute("retry")) || 3;
    if (!path)
      return console.error(
        'The "path" attribute must be set before the "ki-code" element is connected to the DOM tree.'
      );

    const uri = new URL(window.location.origin + path);
    let payload;
    for (let i = 0; i < retry; i++) {
      try {
        const response = await fetch(uri, { mode: "same-origin" });
        if (response.status >= 400)
          throw new Error(`Error fetching ${uri}. ${response.status} ${response.statusText}`);
        payload = await response.text();
      } catch (error) {
        console.error(error);
      }
      if (payload) break;
    }

    if (typeof payload !== "string") {
      return console.error(`Failed to load resource from path "${path}" after ${retry} attempts.`);
    }

    this.shadowRoot.querySelector("code").textContent = payload;
  }
}
