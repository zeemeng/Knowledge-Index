import Store from "../lib/statehub/index.js";
import { actions } from "./actions.js";

const initialState = {
  sections: [],
  activeSection: undefined,
  showNavDropdown: false
};

const store = new Store(actions, initialState);

export default store;
