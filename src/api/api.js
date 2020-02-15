const DOMAIN = 'http://localhost:8081'
const BASE_URI = `${DOMAIN}/api`
const PLAYERS_URI = `${BASE_URI}/players`
const CREATE_PLAYER_URI = `${BASE_URI}/player/create`


async function modifyPlayer(player) {
  return await sendPostRequest(`${BASE_URI}/player/${player._id}/update`, player)
}

async function savePlayers(player1, player2) {
  return await Promise.all([
    sendPostRequest(CREATE_PLAYER_URI, player1),
    sendPostRequest(CREATE_PLAYER_URI, player2)
  ]) 
}

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
  modifyPlayer, 
  savePlayers,
  getPlayers,
}