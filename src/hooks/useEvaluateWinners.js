import { modifyPlayer } from '../api/api'

export default function useEvaluateWinners() {

  function evaluateGameWinner(rounds, players, setPlayers) {

    let counterPlayer1 = 0
    let counterPlayer2 = 0
    let gameWinner = null
  
    if (rounds.length > 2) {
  
      rounds.forEach((round) => {
        if (round.winner === players.player1.name) {
          counterPlayer1++;
        } else if (round.winner === players.player2.name) {
          counterPlayer2++
        }
      })
    }
  
    if (counterPlayer1 === 3) {
      gameWinner = { ...players.player1, won: players.player1.won + 1 }
      setPlayers(() => ({
        ...players,
        player1: gameWinner
      }))
  
      // Save Player to backend
      modifyPlayer(gameWinner)
  
    } else if (counterPlayer2 === 3) {
      gameWinner = { ...players.player2, won: players.player2.won + 1 }
      setPlayers(() => ({
        ...players,
        player2: gameWinner
      }))
      // Save Player to backend
      modifyPlayer(gameWinner)
    }
  
    return gameWinner
  }
  
  function battle(moves, movePlayer1, movePlayer2) {
    let move1 = null
    let move2 = null
    let winner = null

    moves.forEach((m) => {
      move1 = movePlayer1 === m.move ? m : move1
      move2 = movePlayer2 === m.move ? m : move2
    })

    if (move1.kills === move2.move) {
      winner = move1
    } else if (move2.kills === move1.move) {
      winner = move2
    }
    return winner
  }

  return {
    evaluateGameWinner,
    battle
  }
}