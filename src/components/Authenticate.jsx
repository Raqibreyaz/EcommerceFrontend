import React from 'react'
import { LoginPage, NotFoundPage } from '../pages/index.js'
import { useFetchUserQuery } from '../features/user/userSlice.js'
import { Container, Loader } from './index.js'

function Authenticate({ children, authState = true, role, roles = [], allowed = false }) {

    const { data: { user } = {}, isLoading: isLoadingUser } = useFetchUserQuery()

    const isAuthenticated = !!user

    // function which tells if user is authorized
    function authorized() {

        // user is authorized if authenticated and roles or role does not exists or role matches or roles one of it matches
        if (isAuthenticated === authState
            && (!role && !roles.length || role && role === user?.role || roles.length && roles.indexOf(user?.role) !== -1))
            return true;

        // else for every case user will be unauthorized
        return false;
    }

    if (!isLoadingUser) {

        // when the route is allowed then just allow user
        if (allowed || authorized()) {
            return (
                <Container
                    LoadingConditions={[!!isLoadingUser]}
                >
                    {children}
                </Container>
            )
        }

        // tells that the route is only accessible for authenticated user
        else if (!isAuthenticated && authState !== isAuthenticated)
            return (<Container
                LoadingConditions={[!!isLoadingUser]}
            >
                < LoginPage />
            </Container>)

        // shows an 404 page  to unauthorized users
        else
            return <NotFoundPage />
    } else return <Loader />
}
export default Authenticate
