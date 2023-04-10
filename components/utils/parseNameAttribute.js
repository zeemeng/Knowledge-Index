/**
 * Parses a string argument and returns a `span` element which child nodes consistute a formatted representation
 * of said string.
 *
 * Substrings within the argument that are surrounded by two asterixes are included as "em" elements. All other
 * segments of the string argument are included as text nodes.
 * @param {string} name
 */
export default function parseNameAttribute(name) {
  const span = document.createElement("span");
  if (!name) return span;

  const results = name.matchAll(/\*\*(.+?)\*\*/g); // Match all substrings surrounded by two asterixes.
  let currentIndex = 0;

  for (let result of results) {
    const match = result[0];
    const matchIndex = result.index;
    const matchLength = match.length;
    const captureGroup = result[1];

    // Create a text node for the segment between the current match and the previous match, then append it to span.
    span.append(document.createTextNode(name.slice(currentIndex, matchIndex)));

    // Create an "em" element for the substring surrounded by two asterixes, then append it to span.
    const em = document.createElement("em");
    em.textContent = captureGroup;
    span.append(em);

    // Update the pointer to the end position of the current match.
    currentIndex = matchIndex + matchLength;
  }

  // Create a text node for the remaining segment, then append it to span.
  span.append(document.createTextNode(name.slice(currentIndex)));

  return span;
}
