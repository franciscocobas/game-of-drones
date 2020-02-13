import React, { createContext, useContext, useState, useReducer } from 'react'

export const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

const initalState = {
  player1: {
    name: '', won: 0
  }, player2: {
    name: '', won: 0
  }, currentPlayerName: ''
}

function playerReducer(state, action) {
  switch (action.type) {
    case 'update-name':
      let playersNameUpdate = {}
      console.log(action)
      if (action.player1Name) {
        playersNameUpdate = {
          ...playersNameUpdate,
          player1: {
            ...state.player1, name: action.player1Name
          },
          currentPlayerName: action.player1Name
        }
      }
      if (action.player2Name) {
        playersNameUpdate = {
          ...playersNameUpdate, 
          player2: {
            ...state.player2, name: action.player2Name
          }
        }
      }
      console.log({
        ...state, ...playersNameUpdate
      })
      return {
        ...state, ...playersNameUpdate
      }
    case 'update-current-player':
      return {
        ...state, currentPlayerName: action.currentPlayerName
      }
    case 'update-winner':
      let playersWinnerUpdate = {}
      if (action.playerName === state.player1.name) {
        playersWinnerUpdate = {
          player1: {
            ...state.player1, won: state.player1.won + 1
          }
        }
      }
      if (action.playerName === state.player2.name) {
        playersWinnerUpdate = {
          player2: {
            ...state.player2, won: state.player2.won + 1
          }
        }
      }
      console.log({
        ...state,
        ...playersWinnerUpdate
      })
      return {
        ...state, 
        ...playersWinnerUpdate
      }
    case 'reset-state':
      return initalState
    default:
      return state
  }
}

export function AppContextProvider({ children }) {

  const [players, dispatch] = useReducer(playerReducer, initalState)

  // const [players, setPlayers] = useState({
  //   player1: {
  //     name: '', won: 0
  //   }, player2: {
  //     name: '', won: 0
  //   }, currentPlayerName: ''
  // })

  const [movePlayer1, setMovePlayer1] = useState({})

  const [moves, setMoves] = useState([
    { move: 'paper', kills: 'rock' },
    { move: 'rock', kills: 'scissors' },
    { move: 'scissors', kills: 'paper' }
  ])

  const [rounds, setRounds] = useState([])

  let configObject = {
    // players, setPlayers,
    players, dispatch,
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
