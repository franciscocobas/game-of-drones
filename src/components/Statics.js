import React from 'react'

import '../styles/Statics.scss'
import { ReactComponent as RockScissorsHandSvg } from '../images/rock_scissors_hand.svg'

import { useAppContext } from '../contexts/app-context'


export default function Statics() {

  const { players } = useAppContext()


  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-12 col-md-6'>
          <h1>Game of Drones Statics</h1>
          <div className='row justify-content-center'>
            <div className='col-12 col-md-6'>
              <RockScissorsHandSvg className='img-fluid' />
            </div>
          </div>
        </div>
        <div className='w-100'></div>
        <div className='col-12 col-md-6'>
          <div className='row mt-3'>
            <div className='col-6'><b>Name</b></div>
            <div className='col-6'><b>Won Count</b></div>
          </div>
          {
            players.players && players.players.length > 0 ?
              players.players.map((player) => (
                <div className='row' key={player._id}>
                  <div className='col-6 mt-3'>
                    {player.name}
                  </div>
                  <div className='col-6 mt-3'>
                    {player.won}
                  </div>
                </div>
              ))
              : 'hhihih'
          }
        </div>
      </div>
    </div>
  )
}