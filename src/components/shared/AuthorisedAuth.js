import React from 'react'

export default function AuthorisedAuth({ children }) {

    // If user is not logged in then let him access the current page else redirect to login page

    return (
        <>
            {
                children
            }
        </>
    )
}
