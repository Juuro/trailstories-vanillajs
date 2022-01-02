import { router } from "./router.js"
import { Tag } from "./components/Tag.js"


const navigateTo = url => {
  history.pushState(null, null, url)
  router()
}

window.addEventListener('popstate', router)

document.addEventListener("DOMContentLoaded", () => {
  router()

  document.body.addEventListener('click', event => {
    const origin = event.target.closest("a")

    if (origin.matches('[data-link]')) {
      event.preventDefault()
      navigateTo(origin.href)
    }
  })
})