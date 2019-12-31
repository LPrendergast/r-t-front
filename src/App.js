import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
// import Main from './pages/Main.js'
import API from "./adapters/API";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import NavBar from "./components/NavBar";
import ArtistPage from "./pages/Artists/ArtistPage.js";
import Artists from "./pages/Artists/Artists.js";
import Events from "./pages/events/Events.js";
import EventPage from "./pages/events/EventPage.js";
import EventEdit from "./pages/events/EventEdit.js";
import NewEvent from "./pages/events/NewEvent";
import Footer from "./components/Footer";
import Account from "./Account";
import AccountEdit from "./AccountEdit";
import LandingPage from "./pages/LandingPage";

function App({ history }) {
  const [artist, setArtist] = useState(null);
  const [chosenArtistId, setChosenArtistId] = useState(null);
  const [chosenEvent, setChosenEvent] = useState(null);
  const [eventEdit, setEventEdit] = useState(null);

  useEffect(() => {
    API.validate()
      .then(artist => {
        setArtist(artist);
        // history.push('/')
      })
      .catch(() => {
        history.push("/");
      });
  }, []);

  const logout = () => {
    API.logout();
    setArtist(null);
    history.push("/");
  };

  return (
    <div className="App">
      <div
        className="ui container"
        style={{ width: "95%", margin: "0", padding: "0", height: "80vh" }}
      >
        <NavBar artist={artist} logout={logout} history={history} />
        <Switch>
          <Route
            exact="exact"
            path="/"
            component={props => <LandingPage {...props} />}
          />
          <Route
            exact="exact"
            path="/events"
            component={props => (
              <Events
                {...props}
                logout={logout}
                setChosenEvent={setChosenEvent}
              />
            )}
          />
          <Route
            path="/login"
            component={props => <Login {...props} setArtist={setArtist} />}
          />
          <Route
            path="/signup"
            component={props => <Signup {...props} setArtist={setArtist} />}
          />
          <Route
            exact="exact"
            path="/Artists"
            component={props => (
              <Artists
                {...props}
                setArtist={setArtist}
                setChosenArtist={setChosenArtistId}
              />
            )}
          />
          <Route
            exact="exact"
            path="/Artists/:id"
            component={props => (
              <ArtistPage
                {...props}
                artistId={chosenArtistId}
                artist={artist}
              />
            )}
          />
          <Route
            exact="exact"
            path="/Events/:id"
            render={props => (
              <EventPage
                {...props}
                chosenEvent={chosenEvent}
                setEventEdit={setEventEdit}
                artist={artist}
              />
            )}
          />
          <Route
            path="/NewEvent"
            component={props => <NewEvent {...props} />}
          />
          <Route
            exact="exact"
            path="/Account"
            component={props => (
              <Account {...props} {...artist} logout={logout} />
            )}
          />
          <Route
            exact="exact"
            path="/Account/edit"
            component={props => (
              <AccountEdit {...props} {...artist} setArtist={setArtist} />
            )}
          />
          <Route
            exact="exact"
            path="/event/edit"
            component={props => <EventEdit {...props} {...eventEdit} />}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
{
  /* <div className="ui container footer-thing">
          <Footer />
        </div> */
}
