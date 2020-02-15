import React from 'react'
import PropTypes from 'prop-types'

export default function Score({ rounds }) {
  return (
    <div className='row mt-3 justify-content-center'>
      <div className='col-5 border py-3'>
        <h3>Scores</h3>
        <div className='row justify-content-center'>
          <div className='col-10'>
            {
              rounds.map((round, i) => (

                <div className='row' key={i}>
                  <div className='col-6'><b>Round {i + 1}</b></div>
                  <div className='col-6'>{round.winner ? <u>{round.winner}</u> : <span className='grey-text'>Draw</span>}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

Score.propTypes = {
  rounds: PropTypes.array.isRequired
}