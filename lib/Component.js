class Component extends HTMLElement {
  /**
   * Tag name to be associated with this custom element.
   *
   * Used for registering this class definition by calling function `CustomElementRegistry.define`
   * when method `initClass` is invoked.
   * @type {string}
   */
  static tagName;

  /**
   * A string containing the HTML markup of this custom element's shadow DOM content.
   *
   * It should only contain a static version of the shadow DOM markup given to all new instances
   * of this custom element.
   *
   * All dynamic mutations of the shadow DOM shall be performed elsewhere, such as in the `render` method.
   * @type {string}
   */
  static template;

  static styleSheet;

  static styleSheetPaths;

  /**
   * A string containing CSS rulesets affecting the "light" DOM. Useful for applying styles to
   * slotted, or the children of slotted elements.
   *
   * It is inserted in a new `HTMLStyleElement` appended to the document head
   * when method `initClass` is invoked.
   * @type {string}
   */
  static lightDOMStyleSheet;

  /**
   * A string or an array of strings each representing the path to a CSS file containing
   * rulesets that apply to the "light" DOM. Useful for applying styles to slotted, or the children
   * of slotted elements.
   *
   * For each string, a `HTMLLinkElement` is added to the document head when method
   * `initClass` is invoked.
   * @type {string | string[]}
   */
  static lightDOMStyleSheetPaths;

  static attachShadowOptions = { mode: "open" };

  static initClass() {
    // Insert template content as defined by "static template" into templateElement
    this.templateElement = document.createElement("template");
    this.templateElement.innerHTML = this.template;

    // Append shadow DOM style sheets to `templateElement`
    if (typeof this.styleSheetPaths === "string" && this.styleSheetPaths.length) {
      const linkElement = document.createElement("link");
      linkElement.setAttribute("rel", "stylesheet");
      linkElement.setAttribute("href", this.styleSheetPaths);
      this.templateElement.content.prepend(linkElement);
    }

    if (Array.isArray(this.styleSheetPaths))
      this.styleSheetPaths.reduceRight((accum, styleSheet) => {
        if (!styleSheet.length) return;
        const linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("href", styleSheet);
        this.templateElement.content.prepend(linkElement);
      }, null);

    if (typeof this.styleSheet === "string" && this.styleSheet.length) {
      const styleElement = document.createElement("style");
      styleElement.textContent = this.styleSheet;
      this.templateElement.content.prepend(styleElement);
    }

    // Append light DOM style sheets to document head
    if (typeof this.lightDOMStyleSheetPaths === "string" && this.lightDOMStyleSheetPaths.length) {
      const linkElement = document.createElement("link");
      linkElement.setAttribute("rel", "stylesheet");
      linkElement.setAttribute("href", this.lightDOMStyleSheetPaths);
      document.head.append(linkElement);
    }

    if (Array.isArray(this.lightDOMStyleSheetPaths))
      this.lightDOMStyleSheetPaths.reduce((accum, styleSheet) => {
        if (!styleSheet.length) return;
        const linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("href", styleSheet);
        document.head.append(linkElement);
      }, null);

    if (typeof this.lightDOMStyleSheet === "string" && this.lightDOMStyleSheet.length) {
      const styleElement = document.createElement("style");
      styleElement.textContent = this.lightDOMStyleSheet;
      document.head.append(styleElement);
    }

    // Define this custom element in the `CustomElementRegistry`
    customElements.define(this.tagName, this);
  }

  state = {};

  /**
   * A reference to the previous state value. May be used to optimize rendering methods when
   * dealing with structure state values that might partially change.
   */
  previousState = {};

  constructor() {
    super();
    this.attachShadow(this.constructor.attachShadowOptions);
    this.shadowRoot.append(this.constructor.templateElement.content.cloneNode(true));
  }

  setState(newValue) {
    if (newValue !== this.state) {
      this.previousState = this.state;
      this.state = newValue;
      this.render();
    }
  }

  createState(initialValue, partialRender) {
    const render =
      typeof partialRender === "function" ? partialRender.bind(this) : this.render.bind(this);
    return {
      value: initialValue,
      previousValue: null,
      mutate(newValue) {
        if (newValue === this.value) return;
        this.previousValue = this.value;
        this.value = newValue;
        render();
      }
    };
  }

  connectedCallback() {
    this.render();
  }

  render() {}
}

export default Component;
