exports.handler = async function(event, context) {
  const url = `${process.env.GHOST_API_URL}posts/?key=${process.env.GHOST_API_KEY}&include=tags`


  if (event.queryStringParameters.slug) {

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
      body: JSON.stringify({message: "Hello World", body})
  };
}