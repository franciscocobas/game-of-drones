import { useState, useEffect } from 'react'

export default function useEvaluateGameWinner(rounds, player1name, player2name) {

  const [gameWinner, setGameWinner] = useState(null)

  useEffect(() => {

    let counterPlayer1 = 0
    let counterPlayer2 = 0

    if (rounds.length > 1) {

      rounds.forEach((round) => {
        if (round.winner === player1name) {
          counterPlayer1++;
        } else if (round.winner === player2name) {
          counterPlayer2++
        }
      })
    }

    if (counterPlayer1 === 3) {
      setGameWinner(player1name)
    } else if (counterPlayer2 === 3) {
      setGameWinner(player2name)
    } else {
      setGameWinner(null)
    }
  }, [rounds, player1name, player2name])

  return gameWinner
}
