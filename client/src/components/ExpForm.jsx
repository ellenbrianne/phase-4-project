import styled from 'styled-components'
import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

function ExpForm ({ addExp, user }) {

    const nav = useNavigate()

    const formSchema = yup.object().shape({
        city: yup.string().required(),
        state: yup.string().required(),
        length: yup.string().required(),
        community: yup.number().positive().integer().lessThan(6),
        crowds: yup.number().positive().integer().lessThan(6),
        safety: yup.number().positive().integer().lessThan(6)
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
                // r.json().then(error => setError(error.message))
                null
              }
            })   
        },
      })

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
            <label>
                City:
            </label>
            <input type='text' name='city' value={formik.values.city} onChange={formik.handleChange} />
            <label>
              State:
            </label>
            <input type='text' name='state' value={formik.values.state} onChange={formik.handleChange} />
            <label>
                Time spent there:
            </label>
              <input type='text' name='length' value={formik.values.length} onChange={formik.handleChange} />
            <label>
                Community:
            </label>
            <input type='number' name='community' value={formik.values.community} min={1} max={5} onChange={formik.handleChange} />
            <label>
                Crowds:
            </label>
            <input type='number' name='crowds' value={formik.values.crowds} min={1} max={5} onChange={formik.handleChange} />
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