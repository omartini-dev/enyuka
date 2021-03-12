let header = document.querySelector("header"),
  triggerPoint = 70
let logoPline = document.querySelector(".plain-logo")
let logoWhite = document.querySelector(".white-logo")
window.addEventListener("scroll", function () {
  if (window.pageYOffset >= triggerPoint) {
    header.classList.add("minimized")
    logoPline.classList.remove("open")
    logoWhite.classList.add("open")
  } else {
    header.classList.remove("minimized")
    logoPline.classList.add("open")
    logoWhite.classList.remove("open")
  }
})
