export default function populateGlossaryIndex(glossaryComponent) {
  // Helper functions for generation of glossary index content
  function isAlphaNum(char = "") {
    return /[0-9A-Za-z]/.test(char);
  }
  function isNum(char = "") {
    return /[0-9]/.test(char);
  }

  // Generate the glossary index entries
  let glossaryIndexEntries = [];
  document.querySelectorAll("ki-section").forEach(section => {
    const glossaryEntry = document.createElement("ki-glossary-entry");
    glossaryEntry.targetElement = section;
    const name = section.getAttribute("long-name")?.trim() || section.getAttribute("name")?.trim();
    glossaryEntry.plainName = name.replace(/\*\*(.+?)\*\*/g, "$1");

    glossaryIndexEntries.push(glossaryEntry);

    section.querySelectorAll("ki-topic").forEach(topic => {
      const glossaryEntry = document.createElement("ki-glossary-entry");
      glossaryEntry.targetElement = topic;
      const name = topic.getAttribute("long-name")?.trim() || topic.getAttribute("name")?.trim();
      glossaryEntry.plainName = name.replace(/\*\*(.+?)\*\*/g, "$1");

      glossaryIndexEntries.push(glossaryEntry);
    });
  });

  // Sort glossary index entries alphanumerically by string value
  glossaryIndexEntries.sort((a, b) => {
    let short;
    a = a.plainName.toLowerCase();
    b = b.plainName.toLowerCase();
    if (a[0] === `"` || a[0] === `'` || a[0] === "`") a = a.substring(1);
    if (b[0] === `"` || b[0] === `'` || b[0] === "`") b = b.substring(1);

    short = a.length < b.length ? a : b;

    for (let i = 0; i < short.length; i++) {
      let charA = a[i];
      let charB = b[i];
      if (isAlphaNum(charA) && !isAlphaNum(charB)) return 1;
      else if (!isAlphaNum(charA) && isAlphaNum(charB)) return -1;
      else if (charA < charB) return -1;
      else if (charB < charA) return 1;
    }

    return a.length < b.length ? -1 : a.length === b.length ? 0 : 1;
  });

  // Insert glossary index headings
  // Index heading element format: <div class="index-heading">B</div>
  function createIndexHeading(textContent) {
    const div = document.createElement("div");
    div.classList.add("index-heading");
    div.textContent = textContent;
    return div;
  }

  const temp = [];

  glossaryIndexEntries.reduce((accum, entry) => {
    const textContent = entry.plainName;
    const leadChar = /[`"']/.test(textContent[0])
      ? textContent[1].toUpperCase()
      : textContent[0].toUpperCase();
    if (!isAlphaNum(leadChar)) {
      if (accum !== "#") temp.push(createIndexHeading("#"));
    } else if (isNum(leadChar)) {
      if (accum !== "0-9") temp.push(createIndexHeading("0-9"));
    } else if (leadChar !== accum) {
      temp.push(createIndexHeading(leadChar.toUpperCase()));
    }

    temp.push(entry);
    return !isAlphaNum(leadChar) ? "#" : isNum(leadChar) ? "0-9" : leadChar;
  }, "");

  // Populate the glossary index with proper content
  const glossaryIndex = glossaryComponent.shadowRoot.querySelector(".glossary-index");
  while (glossaryIndex.firstChild) glossaryIndex.firstChild.remove();
  temp.forEach(entry => glossaryIndex.appendChild(entry));
}
