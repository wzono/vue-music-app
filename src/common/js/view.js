window.onresize = () => {
  let html = document.getElementsByTagName('html')[0]
  let body = document.body
  if (parseInt(window.innerWidth) > 460) {
    html.style.fontSize = 46 + 'px'
    body.style.width = 460 + 'px'
  }
}

window.onresize()