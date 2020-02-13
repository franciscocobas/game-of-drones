import React from 'react'
import useInputsForm from '../hooks/useInutsForm'

export default function PlayerMove({ moves, playerName, onSubmit, rounds }) {

  const onSubmitForm = () => {
    onSubmit(playerName, inputs.selectedMove)
  }

  const { inputs, handleInputChange, handleSubmit } = useInputsForm({
    selectedMove: moves[0].move
  }, onSubmitForm)

  return (
    <>
      <h3>{playerName}</h3>
      <h3>Round {rounds.length + 1}</h3>
      <form onSubmit={handleSubmit}>
        <label>Select Move: </label>
        <select name='selectedMove' onChange={handleInputChange}>
          {
            moves.map((move, i) => (
              <option key={i} value={move.move}>{move.move}</option>
            ))
          }
        </select>
        <button>Ok</button>
      </form>
    </>
  )
}
