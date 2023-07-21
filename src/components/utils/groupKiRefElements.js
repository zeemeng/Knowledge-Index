import { KiRef } from "../ki-ref/ki-ref.js";
import { KiReflist } from "../ki-reflist/ki-reflist.js";
import isWhitespaceTextNode from "./isWhitespaceTextNode.js";

/**
 * Groups `KiRef` elements that are adjacent to each other and are immediate
 * children of the argument `element` into a single `KiReflist` element, which
 * would be placed at location where the first `KiRef` of the group is found
 * in the DOM tree.
 * @param {Node} element
 */
export default function groupKiRefElements(element) {
  let kiRefList;
  for (let node = element.firstElementChild; node; node = node.nextSibling) {
    if (isWhitespaceTextNode(node)) continue;
    if (node instanceof KiRef) {
      if (!kiRefList) {
        kiRefList = new KiReflist();
        node.replaceWith(kiRefList);
        kiRefList.append(node);
        node = kiRefList; // reposition loop pointer
      } else {
        const previous = node.previousSibling;
        kiRefList.append(node);
        node = previous; //reposition loop pointer
      }
    } else kiRefList = null;
  }
}
