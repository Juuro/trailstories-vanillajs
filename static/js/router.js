import About from "./views/about.js"
import Home from "./views/Home.js"
import Imprint from "./views/Imprint.js"
import Post from "./views/Post.js"

export const router = async () => {
  console.log('Router')
  const routes = [
    {path: "/", view: Home},
    {path: "/about", view: About},
    {path: "/imprint", view: Imprint},
    {path: "", view: Post},
  ]

  const potentialMatches = routes.map(route => {
    return {
      route: route, 
      isMatch: location.pathname === route.path
    }
  })

  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

  console.log(match)

  // TODO: Tries to load a post also when you try to load a URL/slug that doesn't exist. Fix it by loading an 404 page if the coresponding post doesn't exist.
  if (!match) {
    match = {
      route: routes[3],
      isMatch: true
    }
  }

  const view = new match.route.view()

  document.querySelector("main").innerHTML = await view.getHtml()
}