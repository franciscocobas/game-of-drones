import React from 'react'
import useInputsForm from '../hooks/useInputsForm'

import '../styles/PlayerMove.scss'

export default function PlayerMove({ moves, playerName, onSubmit, rounds }) {

  const onSubmitForm = () => {
    onSubmit(playerName, inputs.selectedMove)
    setInputs(() => ({
      selectedMove: moves[0].move
    }))
  }

  const { inputs, handleInputChange, handleSubmit, setInputs } = useInputsForm({
    selectedMove: moves[0].move
  }, onSubmitForm)

  return (
    <div className='player-move-container'>
      <h3>Player: <span className='red-text'>{playerName}</span></h3>
      <h3 className='mb-3'>Round <b>{rounds.length + 1}</b></h3>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='mr-2'>Select Move: </label>
          <select name='selectedMove' onChange={handleInputChange} value={inputs.selectedMove}>
            {
              moves.map((move, i) => (
                <option key={i} value={move.move}>{move.move}</option>
              ))
            }
          </select>
        </div>
        <button>Ok</button>
      </form>
    </div>
  )
}
