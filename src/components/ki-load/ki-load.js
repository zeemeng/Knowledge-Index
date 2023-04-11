import Component from "../../lib/Component.js";

const allowedTypes = {
  text: "text",
  html: "html"
};

export class KiLoad extends Component {
  static tagName = "ki-load";

  static init = this.initClass();

  async connectedCallback() {
    const type = this.getAttribute("type");
    const path = this.getAttribute("path");
    const retry = parseInt(this.getAttribute("retry")) || 3;

    if (!type || !path)
      return console.error(
        "Attributes 'type' and 'path' must both be set with appropriate values before the 'ki-load' element is connected to the DOM tree."
      );

    if (!allowedTypes.hasOwnProperty(type))
      return console.error(`"${type}" is not an allowed value for the "type" attribute.`);

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

    if (type === allowedTypes.text) {
      const node = document.createTextNode(payload);
      this.replaceWith(node);
    }

    if (type === allowedTypes.html) {
      this.outerHTML = payload;
    }
  }
}
