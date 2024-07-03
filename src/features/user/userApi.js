import { makeRequest } from "../../utils/Generics.js"

const fetchUser = async () => {
  return await makeRequest({
    method: 'get',
    url: '/users/fetch-user',
    withCredentials: true,
  })
}

const signUpUser = async (data) => {
  return await makeRequest({
    method: 'put',
    data,
    url: '/users/register',
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  })
}

const editUserProfile = async (data) => {
  return await makeRequest({
    method: 'put',
    data,
    url: '/users/edit-profile',
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  })
}

const changeUserAvatar = async (data) => {
  return await makeRequest({
    method: "patch",
    url: '/users/edit-profile/avatar',
    withCredentials: true,
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

const addNewAddress = async (data) => {
  return await makeRequest({
    method: 'patch',
    url: '/users/edit-profile/address',
    data: { address: data },
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  })
}

const loginUser = async (data) => {
  return await makeRequest({
    method: 'post',
    withCredentials: true,
    url: '/users/login',
    data,
    headers: { "Content-Type": "application/json" }
  })
}

const logoutUser = async () => {
  return await makeRequest({
    method: 'get',
    url: '/users/logout',
    withCredentials: true
  })
}

const fetchProductOwners = async () => {
  return await makeRequest(
    {
      method: 'get',
      url: '/users/get-product-owners',
      withCredentials: false
    }
  )
}

const fetchProfileDetails = async (id) => {
  return await makeRequest(
    {
      method: 'get',
      url: `/users/get-profile-details/${id}`,
      withCredentials: false,
    }
  )
}


export {
  fetchUser,
  loginUser,
  logoutUser,
  signUpUser,
  editUserProfile,
  changeUserAvatar,
  addNewAddress,
  fetchProductOwners,
  fetchProfileDetails
}