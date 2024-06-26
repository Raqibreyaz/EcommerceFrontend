import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LoginPage, NotFoundPage } from '../pages/index.js'
import { fetchUserAsync } from '../features/user/userSlice.js';

function Authenticate({ children, authState = true, role, roles = [] }) {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const user = useSelector(state => state.user.userData)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserAsync())
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

    if (!isAuthenticated && authState !== isAuthenticated)
        return <LoginPage />
    else if (authorized())
        return <div>{children}</div>
    else
        return <NotFoundPage />
}
export default Authenticate
