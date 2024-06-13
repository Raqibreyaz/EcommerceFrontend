import axios from "axios"

const fetchUser = async () => {

  const response = await axios.get('http://localhost:4000/api/v1/users/fetch-user', {
    withCredentials: true
  })
  return response
}

const signUpUser = async (data) => {
  const response = await axios.post('http://localhost:4000/api/v1/users/register', data, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return response
}

const loginUser = async (data) => {
  const response = await axios.post('http://localhost:4000/api/v1/users/login', data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  })
  return response
}

const logoutUser = async () => {
  const response = await axios.get('http://localhost:4000/api/v1/users/logout', {
    withCredentials: true
  })
  return response;
}


export {
  fetchUser,
  loginUser,
  logoutUser,
  signUpUser
}