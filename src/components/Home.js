import React from 'react'

import useEvaluateGameWinner from '../hooks/useEvaluateGameWinner'
import { useAppContext } from '../contexts/app-context'

import PlayerMove from './PlayerMove'
import Score from './Score'
import Users from './Users'

function Home() {

  const {
    players,
    dispatch,
    // setPlayers,
    moves,
    movePlayer1,
    setMovePlayer1,
    rounds,
    setRounds
  } = useAppContext()

  const onSubmitForm = (inputs) => {
    if (inputs.player1name !== '' && inputs.player2name !== '') {
      dispatch({
        type: 'update-name',
        player1Name: inputs.player1name,
        player2Name: inputs.player2name
      })
      // setPlayers(() => ({
      //   ...players,
      //   player1: { ...players.player1, name: inputs.player1name },
      //   player2: { ...players.player2, name: inputs.player2name },
      //   currentPlayerName: inputs.player1name
      // }))
    }
  }

  const gameWinner = useEvaluateGameWinner()

  const handleMoveFormSubmit = (playerName, selectedMove) => {

    if (playerName === players.player1.name) {
      setMovePlayer1(selectedMove)
      dispatch({
        type: 'update-current-player',
        currentPlayerName: players.player2.name
      })
      // setPlayers(() => ({
      //   ...players, currentPlayerName: players.player2.name
      // }))
    } else {

      const winner = battle(moves, movePlayer1, selectedMove)

      let roundWinner = null

      if (winner) {
        roundWinner = winner.move === movePlayer1 ? players.player1.name : winner.move === selectedMove ? players.player2.name : null
      }
      dispatch({
        type: 'update-current-player',
        currentPlayerName: players.player1.name
      })
      // setPlayers(() => ({
      //   ...players, currentPlayerName: players.player1.name
      // }))

      setRounds(() => ([
        ...rounds, {
          movePlayer1, movePlayer2: selectedMove, winner: roundWinner
        }
      ]))
    }
  }

  const onResetGame = () => {
    // setPlayers(() => ({
    //   player1: { name: '', won: 0 }, player2: { name: '', won: 0 }, currentPlayerName: ''
    // }))
    dispatch({ type: 'reset-state' })
    setRounds(() => ([]))
    setMovePlayer1(() => ({}))
  }

  return (
    <div className='container'>
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
          <>
            <h1>And the winner is {gameWinner.name}</h1>
            <button onClick={onResetGame}>Play Again</button>
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