import { actionTypes } from "../../store/actions.js";
import store from "../../store/store.js";
import scrollHashIntoView from "../utils/scrollHashIntoView.js";

export default function updatePage() {
  let path = location.pathname;
  path = path.slice(1); // trims leading '/'
  if (path.endsWith("/")) path = path.slice(0, -1); // trims trailing '/'

  if (path === "") path = "glossary";
  let activeSection = store.state.sections.find(section => section.id === path);
  if (!activeSection) activeSection = store.state.sections.find(section => section.id === "404");
  store.dispatch(actionTypes.hideNavDropdown);
  store.dispatch(actionTypes.setActiveSection, activeSection ? activeSection : null);

  setTimeout(() => scrollHashIntoView(), 50);
}

window.onload = updatePage;
window.onpopstate = updatePage;
