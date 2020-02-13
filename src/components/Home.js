import React from 'react'

import useEvaluateGameWinner from '../hooks/useEvaluateGameWinner'
import { useAppContext } from '../contexts/app-context'

import PlayerMove from './PlayerMove'
import Score from './Score'
import Users from './Users'

function Home() {

  const {
    players,
    setPlayers,
    moves,
    movePlayer1,
    setMovePlayer1,
    rounds,
    setRounds
  } = useAppContext()

  const onSubmitForm = (inputs) => {
    if (inputs.player1name !== '' && inputs.player2name !== '') {
      setPlayers(() => ({
        ...players,
        player1: inputs.player1name,
        player2: inputs.player2name,
        currentPlayer: inputs.player1name
      }))
    }
  }

  const gameWinner = useEvaluateGameWinner(rounds, players.player1, players.player2)

  const handleMoveFormSubmit = (playerName, selectedMove) => {

    if (playerName === players.player1) {
      setMovePlayer1(selectedMove)
      setPlayers(() => ({
        ...players, currentPlayer: players.player2
      }))
    } else {

      const winner = battle(moves, movePlayer1, selectedMove)

      let roundWinner = null

      if (winner) {
        roundWinner = winner.move === movePlayer1 ? players.player1 : winner.move === selectedMove ? players.player2 : null
      }

      setPlayers(() => ({
        ...players, currentPlayer: players.player1
      }))

      setRounds(() => ([
        ...rounds, {
          movePlayer1, movePlayer2: selectedMove, winner: roundWinner
        }
      ]))
    }
  }

  return (
    <div className='container'>
      {
        !players.player1 && !players.player2 &&
        <Users onSubmitForm={onSubmitForm} />
      }
      {
        players.player1 && players.player2 && !gameWinner && <PlayerMove
          moves={moves}
          playerName={players.currentPlayer}
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
          <>
            <h1>And the winner is {gameWinner}</h1>
          </>)
      }
    </div>
  )
}

const battle = (moves, movePlayer1, movePlayer2) => {
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

export {
  Home
}