import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export function AppContextProvider({ children }) {

  const [players, setPlayers] = useState({
    player1: '', player2: '', currentPlayer: ''
  })

  const [movePlayer1, setMovePlayer1] = useState({})

  const [moves, setMoves] = useState([
    { move: 'paper', kills: 'rock' },
    { move: 'rock', kills: 'scissors' },
    { move: 'scissors', kills: 'paper' }
  ])

  const [ rounds, setRounds] = useState([])

  let configObject = {
    players, setPlayers,
    moves, setMoves, 
    movePlayer1, setMovePlayer1,
    rounds, setRounds
  }

  return (
    <AppContext.Provider value={configObject}>
      {children}
    </AppContext.Provider>
  )
}
