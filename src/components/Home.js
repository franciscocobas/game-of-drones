import React, { useState } from 'react'
import '../styles/Home.scss'

import { useAppContext } from '../contexts/app-context'
import { savePlayers, modifyPlayer } from '../api/api'

import PlayerMove from './PlayerMove'
import Score from './Score'
import Users from './Users'

function Home() {

  const {
    players, setPlayers,
    moves,
    rounds,
    setRounds,
    gameWinner,
    setGameWinner,
  } = useAppContext()

  const [movePlayer1, setMovePlayer1] = useState({})

  const onSubmitForm = (inputs) => {
    if (inputs.player1name !== '' && inputs.player2name !== '') {
      let player1 = { ...players.player1, name: inputs.player1name }
      let player2 = { ...players.player2, name: inputs.player2name }

      saveAndRetreivePlayers(player1, player2, players, setPlayers)
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

function saveAndRetreivePlayers(player1, player2, players, setPlayers) {

  // Save or retreive user in Backend
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

export {
  Home
}