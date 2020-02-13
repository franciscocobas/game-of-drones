import React from 'react'

import useInputsForm from '../hooks/useInutsForm'

export default function Users({onSubmitForm}) {

  const { inputs, handleInputChange, handleSubmit } = useInputsForm({
    player1name: '', player2name: ''
  }, onSubmitForm)

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <h3>Player 1</h3>
          <input name='player1name' type='text' className='' onChange={handleInputChange} value={inputs.player1name} />
        </div>
        <div className='col-12 col-md-6'>
          <h3>Player 2</h3>
          <input name='player2name' type='text' className='' onChange={handleInputChange} value={inputs.player2name} />
        </div>
        <div className='col-12'>
          <button>Battle</button>
        </div>
      </div>
    </form>)
}