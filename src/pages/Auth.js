import React from 'react'
import { Route} from "react-router-dom";

const Auth = (props) => {
  return (
    <>
    <Route path="/auth/login">
      <div>Login</div>
    </Route>
    <Route path="/auth/signup">
      <div>Sign Up</div>
    </Route>
    </>
  )
}

export default Auth
