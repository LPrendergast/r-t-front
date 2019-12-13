import React, {useState, useEffect} from 'react';
import './App.css';
import { Route, Redirect, Switch, Link } from "react-router-dom";
import Auth from './pages/Auth'
import Main from './pages/Main.js'
import API from './adapters/API'
import Login from "./pages/Auth/Login";
// import Signup from "./pages/Auth/Signup"


function App({history}) {
  const [artist, setArtist] = useState(null)

  useEffect(()=>{
    API.validate()
    .then(artist => {
      setArtist(artist)
    })
    .catch(() =>{
      history.push('/')
    })
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path="/auth" render={routerProps => <Auth{...routerProps} setArtist={setArtist} />}/>
        <Route exact path="/" component={Main}/>
      </Switch>
    </div>
  );
}

export default App;
