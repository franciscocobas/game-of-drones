import React from 'react';

import { Home } from './components/Home'

import { useAppContext } from './contexts/app-context'

import './App.scss';

export default function App() {


  const { loading, } = useAppContext()


  return (
    <div className="app">
      <h1>Game of Drones</h1>
      {
        loading ? <></> : <Home />
      }
    </div>
  );
}