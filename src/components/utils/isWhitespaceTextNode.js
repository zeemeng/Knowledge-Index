export default function isWhitespaceTextNode(node) {
  if (node.nodeName !== "#text") return false;
  if (/\S/.test(node.textContent)) return false; // textContent contains any non-whitespace character
  return true;
}
