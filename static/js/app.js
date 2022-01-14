import { router } from "./router.js"
import { Tag } from "./components/Tag.js"

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing')
    } else if(reg.waiting) {
      console.log('Service worker installed')
    } else if(reg.active) {
      console.log('Service worker active')
    }

  }).catch(function(error) {
    // registration failed
    console.log('Service worker egistration failed with ' + error)
  });
}


const navigateTo = url => {
  history.pushState(null, null, url)
  router()
}

window.addEventListener('popstate', router)

document.addEventListener("DOMContentLoaded", () => {
  router()

  const pagination = document.querySelector('.pagination')
  pagination.addEventListener('click', async (event) => {
    console.log(event)
    // await loadPosts({ page: pagination.dataset.page })
  })

  document.body.addEventListener('click', event => {
    const origin = event.target.closest("a")

    if (origin?.matches('[data-link]')) {
      event.preventDefault()
      navigateTo(origin.href)
    }
  })
})