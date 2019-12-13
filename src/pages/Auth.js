import React from 'react'
import { Route} from "react-router-dom";
import Login from './Auth/Login'
import Signup from "./Auth/Signup"


const Auth = (props) => {
  return (
    <>
    <Route path="/auth/login">
    <Login setArtist={props.setArtist}/>
    </Route>
    <Route path="/auth/signup">
      <Signup setArtist={props.setArtist}/>
    </Route>
    </>
  )
}

export default Auth
