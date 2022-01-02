// TODO: Move to ENV variables before pushing to GitHub!
const GHOST_API_URL = 'https://api.com'
const GHOST_API_KEY = '12345'

export const loadPosts = async () => {
  const url = `${GHOST_API_URL}posts/?key=${GHOST_API_KEY}&include=tags`

  const options = {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  }

  const moep = await fetch('../../netlify/functions/ghost', {method: 'GET'})
  .then(response => {
    return response.json()
  })

  console.log(moep)

  return await fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('The fucking network response was fucking not ok. Fuck!!!')
      }
      return response.json()
    })
    .then(data => {
      localStorage.setItem('data', JSON.stringify(data))
      return data
    })
    .catch(error => {
      console.error('Something went catastrophically wrong: ', error)
      if (localStorage.getItem('data')) {
        return JSON.parse(localStorage.getItem('data'))
      }
    })
    .catch(error => {
      console.error('And in the end everything failed because: ', error)
    })
}