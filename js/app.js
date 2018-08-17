let introSection = document.getElementById("intro");
let bioSection = document.getElementById("me");

function startIntroAnimation() {
  introSection.classList.add("animate");
}
function removeIntroAnimation() {
  introSection.classList.remove("animate")
  introSection.classList.add("remove")
}
function showBio() {
  bioSection.classList.add("animate");
}
startIntroAnimation();

setTimeout(() => {
  removeIntroAnimation()
  showBio();
}, 2000);