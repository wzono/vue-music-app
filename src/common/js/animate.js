export function twinkling (el, time) {
  el = el instanceof Element ? el : document.querySelector(el)
  let flag = true
  setInterval(() => {
    if (flag === true) {
      el.style.display = 'inline-block'
    } else {
      el.style.display = 'none'
    }
    flag = !flag
  }, time)
}
