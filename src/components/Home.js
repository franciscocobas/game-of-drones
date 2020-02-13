import React, { useState, useReducer } from 'react'

import useEvaluateGameWinner from '../hooks/useEvaluateGameWinner'

import PlayerMove from './PlayerMove'
import Score from './Score'
import Users from './Users'

function reducer(state, action) {
  switch (action.type) {
    case 'set-current-move-player-1':
      return { ...state, currentMovePlayer1: action.currentMovePlayer1, currentPlayer: action.currentPlayer }
    case 'set-current-move-player-2':
      return {
        ...state,
        currentMovePlayer2: action.currentMovePlayer2,
        currentPlayer: action.currentPlayer,
        rounds: [...state.rounds, {
          movePlayer1: state.currentMovePlayer1, movePlayer2: action.currentMovePlayer2, winner: action.winner
        }]
      }
    case 'set-current-player':
      return { ...state, currentPlayer: action.player }
    default:
      return state;
  }
}

function Home() {

  const [player1name, setPlayer1Name] = useState('')
  const [player2name, setPlayer2Name] = useState('')

  const onSubmitForm = (inputs) => {
    if (inputs.player1name !== '' && inputs.player2name !== '') {
      setPlayer1Name(inputs.player1name)
      setPlayer2Name(inputs.player2name)
      dispatch({
        type: 'set-current-player', player: inputs.player1name
      })
    }
  }

  const [{ moves, currentPlayer, rounds, currentMovePlayer1 }, dispatch] = useReducer(reducer, {
    moves: [
      { move: 'paper', kills: 'rock' },
      { move: 'rock', kills: 'scissors' },
      { move: 'scissors', kills: 'paper' }
    ],
    currentPlayer: '',
    currentMovePlayer1: {},
    currentMovePlayer2: {},
    rounds: []
  })

  const gameWinner = useEvaluateGameWinner(rounds, player1name, player2name)

  const battle = (movePlayer1, movePlayer2) => {
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

  const handleMoveSubmit = (playerName, selectedMove) => {

    if (playerName === player1name) {
      dispatch({
        type: 'set-current-move-player-1',
        currentMovePlayer1: selectedMove,
        currentPlayer: player2name
      })
    } else {
      const winner = battle(currentMovePlayer1, selectedMove)

      let roundWinner = null

      if (winner) {
        roundWinner = winner.move === currentMovePlayer1 ? player1name : winner.move === selectedMove ? player2name : null
      }

      dispatch({
        type: 'set-current-move-player-2',
        currentMovePlayer2: selectedMove,
        currentPlayer: player1name,
        winner: roundWinner
      })
    }
  }

  return (
    <div className='container'>
      {
        !player1name && !player2name &&
        <Users onSubmitForm={onSubmitForm} />
      }
      {
        player1name && player2name && !gameWinner && <PlayerMove
          moves={moves}
          playerName={currentPlayer}
          onSubmit={handleMoveSubmit}
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


export {
  Home
}