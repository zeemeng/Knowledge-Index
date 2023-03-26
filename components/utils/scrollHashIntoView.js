/**
 * Scrolls the heading denoted by the url hash to the top of the page or if no hash is present scroll the entire document back to the top.
 */
export default function scrollHashIntoView() {
  const hash = location.hash.slice(1); // Removes the leading "#"
  if (hash) document.getElementById(hash)?.scrollIntoView(true);
  else window.scrollTo(window.scrollX, 0);
}
