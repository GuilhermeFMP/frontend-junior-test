import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AddToken from './pages/AddToken';
import EditToken from './pages/EditToken';
import Logo from './components/Logo';

function App() {
  return (
    <div className="App">
      <Logo />
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/add-token' component={ AddToken } />
        <Route exact path='/edit-token' component={ EditToken } />
      </Switch>
    </div>
  );
}

export default App;
