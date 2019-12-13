import React, {useState} from 'react'
import API from '../../adapters/API'
import {useHistory} from 'react-router-dom'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import {BrowserRouter as Router,Switch,Route,Redirect,Link,NavLink} from "react-router-dom";



const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const history = useHistory()

  const handleSubmit = (e) =>{
    e.preventDefault()
    API.login({username, password})
    .then(artist => {
      console.log(artist)
      props.setArtist(artist)
      history.push('/')
    })
    .catch(errors => {
      console.error(errors)
      setErrors(errors)
    })
  }

  return (
    <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
    <form onSubmit={handleSubmit}>
          <p>{errors.join()}</p>
          <input type="text" placeholder="Username" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
          <input type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
          <input type="submit" />
        </form>
      </Grid.Column>

        <Grid.Column verticalAlign='middle'>
          <Link to='signup'><Button content='Sign up' icon='signup' size='big' type='submit'/></Link>
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
      </Segment>

  )
}

export default Login

// <Segment placeholder>
// <Grid columns={2} relaxed='very' stackable>
//   <Grid.Column>
//     <Form onSubmit={handleSubmit}>
//       <Form.Input
//         icon='user'
//         iconPosition='left'
//         label='Username'
//         placeholder='Username'
//         value={username} onChange={e => setUsername(e.target.value)}
//       />
//       <Form.Input
//         icon='lock'
//         iconPosition='left'
//         label='Password'
//         type='password'
//         value={password} onChange={e => setPassword(e.target.value)}
//       />
//
//     <Link to='/'><Button content='Login' primary /></Link>
//     </Form>
//   </Grid.Column>
//
//   <Grid.Column verticalAlign='middle'>
//     <Link to='signup'><Button content='Sign up' icon='signup' size='big' type='submit'/></Link>
//   </Grid.Column>
// </Grid>
//
// <Divider vertical>Or</Divider>
// </Segment>
