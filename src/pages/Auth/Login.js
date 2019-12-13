import React, {useState} from 'react'
import API from '../../adapters/API'
import {useHistory} from 'react-router-dom'

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
    <form onSubmit={handleSubmit}>
      <p>{errors.join()}</p>
      <input type="text" placeholder="Username" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
      <input type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <input type="submit" />
    </form>
  )
}

export default Login
