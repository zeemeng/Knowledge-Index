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
    let updatedSections;

    if (state.sections.includes(oldSection))
      updatedSections = state.sections.map(section =>
        section === oldSection ? newSection : section
      );
    else {
      // Use `Array.prototype.splice()` for adding new sections to have the sections displayed in the
      // order as they appear in the DOM tree even if they are loaded asynchronously or added
      // programmatically.
      let spliceIndex = Array.from(document.querySelectorAll("ki-section")).findIndex(
        section => section.id === newSection.id
      );
      if (spliceIndex === -1) spliceIndex = state.sections.length;
      updatedSections = state.sections.concat();
      updatedSections.splice(spliceIndex, 0, newSection);
    }

    return { ...state, sections: updatedSections };
  },
  setActiveSection: (state, payload) => ({ ...state, activeSection: payload }),
  toggleNavDropdown: state => ({ ...state, showNavDropdown: !state.showNavDropdown }),
  hideNavDropdown: state => ({ ...state, showNavDropdown: false })
};
