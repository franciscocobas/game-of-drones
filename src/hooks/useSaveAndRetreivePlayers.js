import { savePlayers } from '../api/api'

export default function useSaveAndRetreivePlayers() {

  // Save or retreive user in Backend
  function savePlayersToBackend(player1, player2, players, setPlayers) {
    savePlayers(player1, player2).then((resultsArray) => {

      if (resultsArray && resultsArray.length > 0) {

        const response_player1 = resultsArray[0]
        const response_player2 = resultsArray[1]

        if (response_player1.result === 'ok' && response_player2.result === 'ok') {

          // Overwrite users state with DB users
          if (response_player1.player && response_player1.player.length > 0 && response_player1.player[0]) {
            const foundPlayer = response_player1.player[0]
            player1 = { ...player1, ...foundPlayer }
          }

          if (response_player2.player && response_player2.player.length > 0 && response_player2.player[0]) {
            const foundPlayer = response_player2.player[0]
            player2 = { ...player2, ...foundPlayer }
          }
        } else {
          throw new Error('There was an error trying to save users');
        }
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setPlayers(() => ({
        ...players, player1, player2, currentPlayerName: player1.name
      }))
    })
  }
  return { savePlayersToBackend }
}