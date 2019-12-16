import React, { useState } from "react";
import API from "../../adapters/API";
import {
   Link,
   useHistory
 } from "react-router-dom";


 const Signup = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [artist_name, setArtistName] = useState("");
    const [description, setDescription] = useState("");
    const [image_url, setImage] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = e => {
      e.preventDefault();
      API.signup({artist_name,description,image_url,portfolio,username,password})
        .then(user => {
          console.log(user);
          props.setArtist(user);
          history.push("/");
        })
        .catch(errors => {
          setErrors(errors);
          console.error(errors);

        });
    };
    return (
      <div className="page-login">
    <div className="ui centered grid container">
      <div className="nine wide column">
        <div className="ui icon warning message">
            <i className="lock icon"></i>
            <div className="content">
              <p>{errors.join()}</p>

            <h1 align="center">Create Artist Account</h1>
              <div className="header">
                {!errors ? 'Signup failed!' : null}
              </div>
              <p>{errors ? 'Please choose your login credentials.' : null}</p>
            </div>
          </div>
        <div className="ui fluid card">
          <div className="content">
            <form onSubmit={handleSubmit} className="ui form">
              <div className="field">
              <input type="text" placeholder="Username" name="username"value={username}
                onChange={e => setUsername(e.target.value)}/>
            <div className="field">
              <input type="password" placeholder="Password" name="password" value={password}
                onChange={e => setPassword(e.target.value)}/>
          </div>
              <div className="field">
                <input type="text" placeholder="Artist Name" name="artistName" value={artist_name}
                  onChange={e => setArtistName(e.target.value)}/>
            </div>
            <div className="field">
              <input type="text" placeholder="Artist Description" name="description" value={description}
                onChange={e => setDescription(e.target.value)}/>
          </div>
          <div className="field">
            <input type="url" placeholder="Picture of Art Work" name="artwork" value={image_url}
              onChange={e => setImage(e.target.value)}/>
        </div>
        <div className="field">
          <input type="url" placeholder="Portfolio Link" name="portfolio" value={portfolio}
            onChange={e => setPortfolio(e.target.value)}/>
      </div>
              <input type="submit" value="Sign up"/>
              </div>
            </form>
          </div>
          <Link to="/login">Already Signed-up? Login Here.</Link>
        </div>
      </div>
    </div>
  </div>
    );
  };

  export default Signup;
//<p>{errors.join()}</p>
