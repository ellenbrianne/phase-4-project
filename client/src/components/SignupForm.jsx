import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

function SignupForm ({ addUser, setSignedUp }) {

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
            fetch('/api/signup', {
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
                  setSignedUp(true)
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
        <form>
            <label>
                Username
            </label>
            <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} />
            <label>
              Email
            </label>
            <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} />
            <label>
                Age
            </label>
              <input type='text' name='age' value={formik.values.age} onChange={formik.handleChange} />
            <input type='submit' value={'Sign me up'} />
        </form>
    )
}

export default SignupForm