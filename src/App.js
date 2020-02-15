import React from 'react';

import Home from './components/Home'
import Statics from './components/Statics'

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import './App.scss';

export default function App() {

  return (
    <div className="app text-center">
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/statics' component={Statics} />
        </Switch>
      </Router>
    </div>
  );
}