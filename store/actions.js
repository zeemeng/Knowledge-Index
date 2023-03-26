export const actionTypes = {
  removeSection: "removeSection",
  updateSection: "updateSection",
  setActiveSection: "setActiveSection",
  toggleNavDropdown: "toggleNavDropdown",
  hideNavDropdown: "hideNavDropdown"
};

export const actions = {
  removeSection: (state, payload) => ({
    ...state,
    sections: state.sections.filter(section => section.id !== payload)
  }),
  updateSection: (state, { oldSection, newSection }) => {
    return {
      ...state,
      sections: state.sections.includes(oldSection)
        ? state.sections.map(section => (section === oldSection ? newSection : section))
        : state.sections.concat(newSection)
    };
  },
  setActiveSection: (state, payload) => ({ ...state, activeSection: payload }),
  toggleNavDropdown: state => ({ ...state, showNavDropdown: !state.showNavDropdown }),
  hideNavDropdown: state => ({ ...state, showNavDropdown: false })
};
