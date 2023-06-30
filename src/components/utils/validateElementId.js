function generateId(string) {
  return encodeURIComponent(string.toLowerCase().replaceAll(/\s/g, "-"));
}

export default function validateElementId(element) {
  if (element.tagName !== "KI-SECTION" && element.tagName !== "KI-TOPIC") {
    const errMsg =
      "`validateElementId` has been called with an unexpected argument that is neither a `ki-section` element nor a `ki-topic` element.\n";
    alert(errMsg);
    console.error(errMsg, element);
    return;
  }

  const elementId = element.id;
  const nameAttribute = element.getAttribute("name");
  const allElementsWithId = Array.from(document.querySelectorAll("[id]"));

  if (!elementId && !nameAttribute) {
    const errMsg = "Element with no attribute `name` nor `id` detected.\n";
    alert(errMsg);
    console.error(errMsg, element);
    return;
  }

  if (allElementsWithId.some(el => el.id === elementId && el !== element)) {
    const errMsg = `An element is duplicating the id \`${elementId}\`.\n`;
    alert(errMsg);
    console.error(errMsg, element);
    return;
  }

  if (!elementId && nameAttribute) {
    const generatedId = generateId(nameAttribute);

    if (allElementsWithId.some(el => el.id === generatedId)) {
      const parentIds = [];
      for (let parent = element.parentElement; parent; parent = parent.parentElement) {
        if (parent.tagName !== "KI-SECTION" && parent.tagName !== "KI-TOPIC") continue;

        parentIds.push(parent.id);
        const generatedLongId =
          parentIds.reduceRight((accum, id) => accum + "_" + id) + "_" + generatedId;
        if (!allElementsWithId.some(el => el.id === generatedLongId)) {
          element.id = generatedLongId;
          return;
        }
      }

      const errorMsg = `No suitable id can be generated for element with name attribute \`${nameAttribute}\`.\n`;
      alert(errorMsg);
      console.error(errorMsg, element);
    } else {
      element.id = generatedId;
    }
  }
}
