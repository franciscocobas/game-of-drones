import React from 'react'

export default function Score({ rounds }) {
  return (
    <div>
      <h3>Scores</h3>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-5'>
          {
            rounds.map((round, i) => (

              <div className='row' key={i}>
                <div className='col-6'>Round {i + 1}</div>
                <div className='col-6'>{round.winner ? round.winner : 'Draw'}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}