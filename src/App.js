import React from 'react';
import './App.css';
import { Route, Redirect, Switch, useHistory, Link } from "react-router-dom";
import Auth from './pages/Auth'
import Main from './pages/Main.js'


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Main}/>
        <Route path="/auth" component={Auth}/>
      </Switch>
    </div>
  );
}

export default App;
