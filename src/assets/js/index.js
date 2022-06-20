const techStacksDOM = document.querySelectorAll(".tech-stack");
const mainContent = document.getElementById("content");
const a = mainContent.querySelectorAll("a");
Array.from(a).forEach((element) => {
  element.target = "_blank";
});
