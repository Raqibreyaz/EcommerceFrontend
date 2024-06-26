import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LoginPage, NotFoundPage } from '../pages/index.js'
import { fetchUserAsync } from '../features/user/userSlice.js';

function Authenticate({ children, authState = true, role, roles = [], allowed = false }) {

    // getting current authentication state of user
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    // getting user info
    const user = useSelector(state => state.user.userData)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!user || !Object.keys(user).length) {
            dispatch(fetchUserAsync())
        }
    }
        , [])


    // function which tells if user is authorized
    function authorized() {

        // user is authorized if authenticated and roles or role does not exists or role matches or roles one of it matches
        if (isAuthenticated === authState
            && (!role && !roles.length || role && role === user.role || roles.length && roles.indexOf(user.role) !== -1))
            return true;

        // else for every case user will be unauthorized
        return false;
    }


    // when the route is allowed then just allow user
    if (allowed) {
        return <div>{children}</div>
    }

    // tells that the route is only accessible for authenticated user
    else if (!isAuthenticated && authState !== isAuthenticated)
        return <LoginPage />

    // handles cases for role specific routes 
    else if (authorized())
        return <div>{children}</div>

    // shows an 404 page  to unauthorized users
    else
        return <NotFoundPage />
}
export default Authenticate
