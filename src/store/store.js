import Store from "../lib/PubSubStore.js";
import { actions } from "./actions.js";

const initialState = {
  sections: [],
  activeSection: undefined,
  showNavDropdown: false
};

const store = new Store(actions, initialState);

export default store;
