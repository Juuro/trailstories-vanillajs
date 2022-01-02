// TODO: Move to ENV variables before pushing to GitHub!
const GHOST_API_URL = 'https://api.com'
const GHOST_API_KEY = '12345'

export const loadPost = async (slug) => {
  const url = `${GHOST_API_URL}posts/slug${slug}?key=${GHOST_API_KEY}&include=tags`

  const options = {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  }

  return await fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('The fucking network response was fucking not ok. Fuck!!!')
      }
      return response.json()
    })
    .catch(error => {
      console.error('Something went catastrophically wrong: ', error)
      window.location.href = './404.html'
    })
}