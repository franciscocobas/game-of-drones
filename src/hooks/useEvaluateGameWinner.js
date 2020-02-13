import { useState, useEffect } from 'react'

import { useAppContext } from '../contexts/app-context'

export default function useEvaluateGameWinner() {

  const [gameWinner, setGameWinner] = useState(null)

  const {
    players,
    dispatch,
    rounds,
  } = useAppContext()

  useEffect(() => {

    let counterPlayer1 = 0
    let counterPlayer2 = 0

    if (rounds.length > 1) {

      rounds.forEach((round) => {
        if (round.winner === players.player1.name) {
          counterPlayer1++;
        } else if (round.winner === players.player2.name) {
          counterPlayer2++
        }
      })
    }

    if (counterPlayer1 === 3) {
      setGameWinner(players.player1)
      players.player1.won++;
    } else if (counterPlayer2 === 3) {
      setGameWinner(players.player2)
    } else {
      setGameWinner(null)
    }
  }, [rounds, players, dispatch])

  return gameWinner
}
