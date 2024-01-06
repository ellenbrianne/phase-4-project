import { useFormik } from 'formik'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'


function UserAuth ({ addUser }) {
    const [signedUp, setSignedUp] = useState(false)
    // const nav = useNavigate()

    const handleClick = () => setSignedUp((signedUp) => !signedUp)

    const formSchema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email().required(),
        age: yup.number().required().positive().integer()
    })

    const formik = useFormik({

        initialValues: {
          username:'',
          email:'',
          age:'',
          password:''
        },

        validationSchema: formSchema,

        onSubmit: (values) => {
            fetch(signedUp?'/api/login':'/api/signup', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
            .then(r => {
              if(r.ok){
                r.json().then(user => {
                  addUser(user)
                  // add in nav(/) when you add Routes for landing page
                })
              } else {
                // r.json().then(error => setError(error.message))
                null
              }
            })   
        },
      })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
            <label>
                Username
            </label>
            <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} />
            <label>
                Password
            </label>
            <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
            {signedUp ? null : (
            <>
              <label>
              Email
              </label>
              <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} />
              <label>
                Age
              </label>
              <input type='text' name='age' value={formik.values.age} onChange={formik.handleChange} />
            </>
            )}
            <input type='submit' value={signedUp ? 'Login' : 'Sign me up'} />
          </form>
          <button onClick={handleClick}>{signedUp ? 'Create an account' : 'Login'}</button>
        </>
    )
};

export default UserAuth;