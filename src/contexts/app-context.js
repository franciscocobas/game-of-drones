import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

const initalState = {
  player1: {
    name: '', won: 0
  }, player2: {
    name: '', won: 0
  }, currentPlayerName: ''
}

export function AppContextProvider({ children }) {

  const [players, setPlayers] = useState(initalState)
  const [movePlayer1, setMovePlayer1] = useState({})
  const [gameWinner, setGameWinner] = useState(null)
  const [rounds, setRounds] = useState([])

  const [moves, setMoves] = useState([
    { move: 'paper', kills: 'rock' },
    { move: 'rock', kills: 'scissors' },
    { move: 'scissors', kills: 'paper' }
  ])

  let configObject = {
    players, setPlayers,
    moves, setMoves,
    movePlayer1, setMovePlayer1,
    rounds, setRounds,
    gameWinner, setGameWinner
  }

  return (
    <AppContext.Provider value={configObject}>
      {children}
    </AppContext.Provider>
  )
}
