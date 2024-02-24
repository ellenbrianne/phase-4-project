import styled from 'styled-components'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../slices/userSlice'

function LoginForm () {
    const nav = useNavigate()
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()

    const formSchema = yup.object().shape({
        username: yup.string().required()
    })

    const formik = useFormik({

        initialValues: {
          username:'',
          password:''
        },

        validationSchema: formSchema,
        validateOnBlur: false,
        validateOnChange: false,

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
                  dispatch(setUser(user))
                  nav('/')
                })
              } else {
                r.json().then(error => setErrors(error))
              }
            })   
        },
      })
    return (
        <Form onSubmit={formik.handleSubmit}>
            {errors&& <h3 style={{color:'red'}}>{errors}</h3>}
            <h3 style={{color:'red'}}> {formik.errors.username}</h3>
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
  input[type=text]{
    margin-bottom: 10px;
    padding-bottom: 1px;
    font-size: 100%;
    font-family: arial;
  }
  input[type=password]{
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
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