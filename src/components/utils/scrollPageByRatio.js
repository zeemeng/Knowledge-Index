export default function scrollPageByRatio(ratio, delay = 0) {
  setTimeout(
    () =>
      window.scroll({
        top: ratio * document.body.offsetHeight,
        behavior: "instant"
      }),
    delay
  );
}
