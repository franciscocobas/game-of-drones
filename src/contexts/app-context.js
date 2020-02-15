import React, { createContext, useContext, useState, useEffect } from 'react'

import { getPlayers } from '../api/api'

export const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

const initialPlayersState = {
  player1: {
    name: '', won: 0
  }, player2: {
    name: '', won: 0
  }, currentPlayerName: ''
}

export function AppContextProvider({ children }) {

  const [players, setPlayers] = useState(initialPlayersState)
  const [gameWinner, setGameWinner] = useState(null)
  const [rounds, setRounds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    getPlayers().then((data) => {
      if (data.player_list) {
        setPlayers({ ...initialPlayersState, players: data.player_list })
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const [moves, setMoves] = useState([
    { move: 'paper', kills: 'rock' },
    { move: 'rock', kills: 'scissors' },
    { move: 'scissors', kills: 'paper' }
  ])

  let configObject = {
    loading, setLoading,
    players, setPlayers,
    moves, setMoves,
    rounds, setRounds,
    gameWinner, setGameWinner,
  }

  return (
    <AppContext.Provider value={configObject}>
      {children}
    </AppContext.Provider>
  )
}
