const DOMAIN = 'http://localhost:8081'
const PLAYERS_URI = `${DOMAIN}/api/players`

async function getPlayers() {
  return await sendRequest(PLAYERS_URI)
}

async function sendPostRequest(URI, data) {
  return await sendRequest(URI, data, 'POST')
}

async function sendRequest(URI, data, method) {

  let params = {
    method: !method ? 'GET' : method,
    headers: {
      'Content-Type': 'application/json'
    },
  }

  if (data) {
    params.body = JSON.stringify(data)
  }

  const response = await fetch(URI, params)
  
  return await response.json()
}

export {
  sendRequest,
  sendPostRequest,
  getPlayers,
}