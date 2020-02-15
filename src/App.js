import React from 'react';

import Home from './components/Home'

import { useAppContext } from './contexts/app-context'

import './App.scss';
import { ReactComponent as RockScissorsHandSvg } from './images/rock_scissors_hand.svg'

export default function App() {


  const { loading, players } = useAppContext()


  return (
    <div className="app text-center">
      <div className='container'>
        <div className='row justify-content-center'>
          <h1 className='col-12 mt-5'>Game of Drones</h1>
          <div className={`animated-col col-12 mt-3 mb-5 ${ !loading && players.player1.name && players.player2.name ? ' col-md-3': ' col-md-5'}`}>
            <RockScissorsHandSvg className='img-fluid'/>
          </div>
        </div>
      </div>
      {
        !loading ? <Home />: <></>
      }
    </div>
  );
}