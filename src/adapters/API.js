const API_ENDPOINT = 'http://localhost:3000/'
const LOGIN_URL = `${API_ENDPOINT}login`
const VALIDATE_URL = `${API_ENDPOINT}validate`
const SIGNUP_URL = `${API_ENDPOINT}artists`
const EVENTS_URL = `${API_ENDPOINT}events`
const EVENT_URL = event => `${API_ENDPOINT}events/${event.id}`


const jsonify = res => {
  // if (!res.ok) throw res;
  return res.json().then(data => {
    if (data.errors)
      throw data.errors;
    else
      return data;
    }
  );
};

const signup = artistDetails => fetch(SIGNUP_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({artist: artistDetails})
}).then(jsonify).then(data => {
  localStorage.setItem("token", data.token);
  return data.artist
});

const login = artistDetails => fetch(LOGIN_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({artist: artistDetails})
}).then(jsonify).then(data => {
  localStorage.setItem("token", data.token);
  return data.artist
});

const validate = () => fetch(VALIDATE_URL, {
  method: 'GET',
  headers: {
    'Authorization': localStorage.getItem("token")
  }
}).then(jsonify).then(data => {
  localStorage.setItem("token", data.token);
  return data.artist;
});

const logout = () => {
  localStorage.removeItem("token");
};

const postEvent = (event) => fetch(EVENTS_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    'Authorization': localStorage.getItem("token")
  },
  body: JSON.stringify({event})
}).then(jsonify)

const deleteArtist = (id) => fetch(`http://localhost:3000/artists/${id}`,{
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    'Authorization': localStorage.getItem("token")
  },
  body: JSON.stringify({id})
}).then(jsonify).then(logout)

const deleteEvent = (id) => fetch(`http://localhost:3000/events/${id}`,{
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    'Authorization': localStorage.getItem("token")
  },
  body: JSON.stringify({id})
}).then(jsonify)

const editArtist = (artistDetails, id) => fetch(`http://localhost:3000/artists/${id}`,{
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    'Authorization': localStorage.getItem("token")
  },
  body: JSON.stringify({artistDetails})
}).then(jsonify)


export default {login, validate, signup, logout, postEvent, deleteArtist, editArtist, deleteEvent}
