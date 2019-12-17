import React, {useState} from 'react'
import API from './adapters/API'
import {useHistory} from 'react-router-dom'
import {Card, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody} from 'reactstrap';


import {Link} from "react-router-dom";

const Account = ({username,id}) => {
  const [errors, setErrors] = useState([])
  const history = useHistory()


  const handleDelete = (e) => {
    API.deleteArtist(e.target.value).then( artist =>{
        history.push('/')
    }).catch(errors => {
      console.error(errors)
      setErrors(errors)
    })
  }

  const handleEdit = (e) => {
    console.log(e.target.value)
    // API.deleteArtist(e.target.value).then( artist =>{
    //     history.push('/')
    // }).catch(errors => {
    //   console.error(errors)
    //   setErrors(errors)
    // })
  }
  return (

  <div>
    <h1>Account Details: {username}</h1><br/>
    <div>
      </div>
      <Link to="/account/edit"><Button onClick={handleEdit} value={id}>Edit Account</Button></Link>
      <Button onClick={handleDelete} value={id}>Delete Account</Button>

    </div>
)
}
export default Account
