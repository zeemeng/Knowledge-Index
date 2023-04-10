import parseNameAttribute from "./parseNameAttribute.js";

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
    const link = document.createElement("ki-link");

    const name = section.getAttribute("long-name")?.trim() || section.getAttribute("name")?.trim();
    link.append(parseNameAttribute(name));
    link.plainName = name.replace(/\*\*(.+?)\*\*/g, "$1");

    link.setAttribute("path", "/" + section.id);
    link.className = "index-entry";
    glossaryIndexEntries.push(link);

    section.querySelectorAll("ki-topic").forEach(topic => {
      const link = document.createElement("ki-link");

      const name = topic.getAttribute("long-name")?.trim() || topic.getAttribute("name")?.trim();
      link.append(parseNameAttribute(name));
      link.plainName = name.replace(/\*\*(.+?)\*\*/g, "$1");

      link.setAttribute("path", "/" + section.id + "#" + topic.id);
      link.className = "index-entry";
      glossaryIndexEntries.push(link);
    });
  });

  // sections.forEach(section => {
  //   glossaryIndexEntries.push(
  //     createLinkElement({
  //       path: section.id,
  //       textContent: section.dataset.titleLong
  //         ? section.dataset.titleLong
  //         : section.dataset.titleShort,
  //       classes: ["index-entry"]
  //     })
  //   );
  //   section.querySelectorAll("[id]").forEach(topic =>
  //     glossaryIndexEntries.push(
  //       createLinkElement({
  //         path: section.id,
  //         fragment: topic.id,
  //         childElement: topic.firstElementChild.cloneNode(true),
  //         classes: ["index-entry"]
  //       })
  //     )
  //   );
  // });

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

    // if (leadChar !== accum) {
    //   if (!isAlphaNum(leadChar) && accum !== "#") temp.push(createIndexHeading("#"));
    //   else if (isNum(leadChar)) temp.push(createIndexHeading("0-9"));
    //   else temp.push(createIndexHeading(leadChar.toUpperCase()));
    // }

    temp.push(entry);
    return !isAlphaNum(leadChar) ? "#" : isNum(leadChar) ? "0-9" : leadChar;
  }, "");

  // Populate the glossary index with proper content
  const glossaryIndex = glossaryComponent.shadowRoot.querySelector(".glossary-index");
  while (glossaryIndex.firstChild) glossaryIndex.firstChild.remove();
  temp.forEach(entry => glossaryIndex.appendChild(entry));
}
