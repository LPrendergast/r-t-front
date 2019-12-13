import React from 'react'
import { Route} from "react-router-dom";
import Login from './Auth/Login'

const Auth = (props) => {
  return (
    <>
    <Route path="/auth/login">
    <Login setArtist={props.setArtist}/>
    </Route>
    <Route path="/auth/signup">
      <div>Sign Up</div>
    </Route>
    </>
  )
}

export default Auth
