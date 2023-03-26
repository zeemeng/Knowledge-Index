/**
 * Parses a string and returns an array containing DOM text nodes and/or "em" elements.
 * Substrings surrounded by two asterixes are included as "em" elements. All other segments are included as text nodes.
 * @param {string} name
 */
export default function parseKiTopicName(name) {
  if (!name) return [];

  const results = name.matchAll(/\*\*(.+?)\*\*/g); // Match all substrings surrounded by two asterixes.
  const DOMNodes = [];
  let currentIndex = 0;

  for (let result of results) {
    const match = result[0];
    const matchIndex = result.index;
    const matchLength = match.length;
    const captureGroup = result[1];

    // Create a text node for the segment between the current match and the previous match, then append it to DOMNodes.
    DOMNodes.push(document.createTextNode(name.slice(currentIndex, matchIndex)));

    // Create an "em" element for the substring surrounded by two asterixes, then append it to DOMNodes.
    const em = document.createElement("em");
    em.textContent = captureGroup;
    DOMNodes.push(em);

    // Update the pointer to the end position of the current match.
    currentIndex = matchIndex + matchLength;
  }

  // Create a text node for the remaining segment, then append it to DOMNodes.
  DOMNodes.push(document.createTextNode(name.slice(currentIndex)));

  return DOMNodes;
}
