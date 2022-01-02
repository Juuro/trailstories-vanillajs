export const loadPosts = async () => {
  return await fetch('../../.netlify/functions/ghost')
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log('data: ', data)
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