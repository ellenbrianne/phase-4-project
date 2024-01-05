// import { useFormik } from 'formik'
// import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'


function UserAuth () {
    const [signedUp, setSignedUp] = useState(false)
    // const nav = useNavigate()

    const handleFirstClick = () => setSignedUp(!signedUp)

    return (
        <>
            <button onClick={handleFirstClick}>{signedUp ? 'Please login' : 'Create an account'}</button>
        </>
    )
};

export default UserAuth;