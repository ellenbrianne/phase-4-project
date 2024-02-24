import styled from 'styled-components'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ExpForm ({ addExp }) {
    const [errors, setErrors] = useState([])
    const nav = useNavigate()

    const user = useSelector(state => state.user.value)

    const formSchema = yup.object().shape({
        city: yup.string().required(),
        state: yup.string().required(),
        length: yup.string().required('time spent is a required field'),
        community: yup.number().positive().integer().lessThan(6).required(),
        crowds: yup.number().positive().integer().lessThan(6).required(),
        safety: yup.number().positive().integer().lessThan(6).required()
    })

    const formik = useFormik({

        initialValues: {
          city:'',
          state:'',
          length:'',
          community:'',
          crowds:'',
          safety:'',
          user_id: user.id
        },

        validationSchema: formSchema,
        validateOnBlur: false,
        validateOnChange: false,

        onSubmit: (values) => {
            fetch('/api/experiences', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
            .then(r => {
              if(r.ok){
                r.json().then(exp => {
                  addExp(exp)
                  nav('/')
                })
              } else {
                r.json().then(error => setErrors(error))
              }
            })   
        },
      })

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
            {errors&& (<h3 style={{color:'red'}}>{errors}</h3>)}
            <p style={{color:'red'}}> {formik.errors.city}</p>
            <label>
                City:
            </label>
            <input type='text' name='city' value={formik.values.city} onChange={formik.handleChange} />
            <p style={{color:'red'}}> {formik.errors.state}</p>
            <label>
              State:
            </label>
            <input type='text' name='state' value={formik.values.state} onChange={formik.handleChange} />
            <p style={{color:'red'}}> {formik.errors.length}</p>
            <label>
                Time spent there:
            </label>
              <input type='text' name='length' value={formik.values.length} onChange={formik.handleChange} />
            <p style={{color:'red'}}> {formik.errors.community}</p>
            <label>
                Community:
            </label>
            <input type='number' name='community' value={formik.values.community} min={1} max={5} onChange={formik.handleChange} />
            <p style={{color:'red'}}> {formik.errors.crowds}</p>
            <label>
                Crowds:
            </label>
            <input type='number' name='crowds' value={formik.values.crowds} min={1} max={5} onChange={formik.handleChange} />
            <p style={{color:'red'}}> {formik.errors.safety}</p>
            <label>
                Safety:
            </label>
            <input type='number' name='safety' value={formik.values.safety} min={1} max={5} onChange={formik.handleChange} />
            <input type='submit' value={'Add Experience'} />
        </Form>
        </>
    )
}

export default ExpForm;

const Form = styled.form`
  font-size: 115%;
  display: flex;
  width: 10%;
  flex-direction: column;
  padding: 100px;
  margin: auto;
  input[type=text]{
    font-family: arial;
    font-size: 100%;
    padding: 10px;
    margin: 10px;
  }
  input[type=number]{
    font-family: arial;
    padding: 5px;
    margin: 5px;
    font-size: 100%;
  }
  input[type=submit]{
    font-family: arial;
    padding: 10px;
    margin: 10px;
    font-size: 100%;
    background-color: pink;
  }
`;