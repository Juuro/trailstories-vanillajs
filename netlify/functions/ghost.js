exports.handler = async function(event, context) {
  return {
      statusCode: 200,
      body: JSON.stringify({message: "Hello World", ghost_api: process.env.GHOST_API_URL})
  };
}