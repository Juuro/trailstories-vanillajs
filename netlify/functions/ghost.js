import fetch from 'node-fetch'

exports.handler = async function(event, context) {
  let url = ""

  if (event.queryStringParameters.slug) {
    url = `${process.env.GHOST_API_URL}posts/slug${event.queryStringParameters.slug}?key=${process.env.GHOST_API_KEY}&include=tags`
  }
  else {
    url = `${process.env.GHOST_API_URL}posts/?key=${process.env.GHOST_API_KEY}&include=tags`
  }

  const options = {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = await fetch(url, options)
    .then(response => {
      return response.json()
    })

  return {
      statusCode: 200,
      body: JSON.stringify(body)
  };
}