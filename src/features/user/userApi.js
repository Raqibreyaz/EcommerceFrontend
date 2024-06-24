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

const editUserProfile = async (data) => {

  const response = await axios.put(`http://localhost:4000/api/v1/users/edit-profile`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  })
  return response
}

const changeUserAvatar = async (data) => {
  const response = await axios.patch('http://localhost:4000/api/v1/users/edit-profile/avatar', data, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

const addNewAddress = async (data) => {
  const response = await axios.patch('http://localhost:4000/api/v1/users/edit-profile/address', { address: data }, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  })
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
  signUpUser,
  editUserProfile,
  changeUserAvatar,
  addNewAddress
}