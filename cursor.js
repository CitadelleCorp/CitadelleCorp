let mouseCursor = document.querySelector(".cursor")
let cursorColor = document.querySelector(".st0")
let lis = document.querySelectorAll("li")

window.addEventListener("mousemove", cursor)

function cursor(e) {
  mouseCursor.style.top = e.pageY + "px"
  mouseCursor.style.left = e.pageX + "px"
}

window.addEventListener("mousedown", () => {
                        cursorColor.classList.toggle("st1")
                        })

window.addEventListener("mouseup", () => {
                        cursorColor.classList.toggle("st1")
                        })