import React, { useState } from 'react'
import '../styles/Home.scss'

import { useAppContext } from '../contexts/app-context'
import useSaveAndRetreivePlayers from '../hooks/useSaveAndRetreivePlayers'

import PlayerMove from './PlayerMove'
import Score from './Score'
import Users from './Users'
import useEvaluateWinners from '../hooks/useEvaluateWinners'

export default function Home() {

  const {
    players, setPlayers,
    moves,
    rounds,
    setRounds,
    gameWinner,
    setGameWinner,
  } = useAppContext()

  const { savePlayersToBackend } = useSaveAndRetreivePlayers()
  const { evaluateGameWinner, battle } = useEvaluateWinners()
  const [movePlayer1, setMovePlayer1] = useState({})

  const onSubmitForm = (inputs) => {
    if (inputs.player1name !== '' && inputs.player2name !== '') {
      let player1 = { ...players.player1, name: inputs.player1name }
      let player2 = { ...players.player2, name: inputs.player2name }

      savePlayersToBackend(player1, player2, players, setPlayers)
    }
  }

  const handleMoveFormSubmit = (playerName, selectedMove) => {

    let currentPlayerName = ''

    if (playerName === players.player1.name) {
      setMovePlayer1(selectedMove)
      currentPlayerName = players.player2.name
    } else {

      currentPlayerName = players.player1.name

      const winner = battle(moves, movePlayer1, selectedMove)

      // If roundwinner is null then battle was draw
      let roundWinner = null

      if (winner) {
        roundWinner = winner.move === movePlayer1 ? players.player1.name : winner.move === selectedMove ? players.player2.name : null
      }

      setRounds(() => {
        const currentRounds = [
          ...rounds, {
            movePlayer1, movePlayer2: selectedMove, winner: roundWinner
          }
        ]

        setGameWinner(evaluateGameWinner(currentRounds, players, setPlayers, setGameWinner))
        return currentRounds
      })
    }

    setPlayers(() => ({
      ...players, currentPlayerName
    }))
  }

  const onResetGame = () => {
    setPlayers(() => ({
      player1: { name: '', won: 0 }, player2: { name: '', won: 0 }, currentPlayerName: ''
    }))
    setRounds(() => ([]))
    setMovePlayer1(() => ({}))
    setGameWinner(null)
  }

  return (
    <div className='container home-container'>
      {
        !players.player1.name && !players.player2.name &&
        <Users onSubmitForm={onSubmitForm} />
      }
      {
        players.player1.name && players.player2.name && !gameWinner && <PlayerMove
          moves={moves}
          playerName={players.currentPlayerName}
          onSubmit={handleMoveFormSubmit}
          rounds={rounds} />
      }
      {
        rounds.length > 0 && (
          <Score rounds={rounds} />
        )
      }
      {
        gameWinner && (
          <div className='mt-3'>
            <h1>And the winner is <b>{gameWinner.name} <span role='img' aria-label='Celebrate Emoji'>🎉</span><span role='img' aria-label='Celebrate Emoji'>🎊</span></b></h1>
            <button className='mt-3' onClick={onResetGame}>Play Again</button>
          </div>)
      }
    </div>
  )
}