import styled from 'styled-components'
import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'

function LoginForm ({ addUser }) {
    // const nav = useNavigate()

    const formSchema = yup.object().shape({
        username: yup.string().required()
    })

    const formik = useFormik({

        initialValues: {
          username:'',
          password:''
        },

        validationSchema: formSchema,

        onSubmit: (values) => {
            fetch('/api/login', {
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
        <Form onSubmit={formik.handleSubmit}>
            <label>
                Username
            </label>
            <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} />
            <label>
                Password
            </label>
            <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
            <input type='submit' value={'Login'} />
        </Form>
    )
}

export default LoginForm

const Form = styled.form`
  display: flex;
  flex-direction:column;
  width: 300px;
  margin:auto;
  font-family:arial;
  font-size:20px;
  input[type=submit]{
    background-color:pink;
    color: black;
    height:40px;
    font-family:Arial;
    font-size:30px;
    margin-top:10px;
    margin-bottom:10px;
  }
`;