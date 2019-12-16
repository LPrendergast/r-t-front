import React, {useState, useEffect} from 'react';
import './App.css';
import { Route, Switch} from "react-router-dom";
import Main from './pages/Main.js'
import API from './adapters/API'
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup"
import NavBar from './NavBar'
import Artist from './pages/Artists/Artist.js'
import ArtistPage from './pages/Artists/ArtistPage.js'
import Artists from './pages/Artists/Artists.js'
import NewEvent from './pages/events/NewEvent'
import Footer from './Footer'

function App({history}) {
  const [artist, setArtist] = useState(null)

  useEffect(()=>{
    API.validate()
    .then(artist => {
      setArtist(artist)
      // history.push('/')
    })
    .catch(() =>{
      history.push('/')
    })
  }, [])

  const logout = () => {
   API.logout();
   setArtist(null);
   history.push('/');
 };

  return (
    <div className="App">
      <div className='ui container'><NavBar artist={artist} logout={logout}/>
      <Switch>
        <Route exact path="/" component={props => <Main {...props} logout={logout}/>}/>
          <Route path="/login" component={props => <Login {...props} setArtist={setArtist} />} />
          <Route path="/signup" component={props => <Signup {...props} setArtist={setArtist}/>} />
          <Route exact path='/Artists' component={props => <Artists {...props} setArtist={setArtist}/>} />
          <Route exact path='/Artists/:id' component={props => <ArtistPage {...props}/>} />
          <Route path='/NewEvent' component={props => <NewEvent {...props} /> } />
      </Switch>
    </div>
    <div className="ui container footer-thing"><Footer /></div>

    </div>
  );
}

export default App;
