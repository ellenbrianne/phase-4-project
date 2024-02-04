import styled from 'styled-components'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

function EditForm ({ updateExp, exp }) {
    const params = useParams()
    const nav = useNavigate()
    const [errors, setErrors]= useState([])

    const expObj = exp.find(e => e.id == params.id)

    const formSchema = yup.object().shape({
        length: yup.string().required('time spent is a required field'),
        community: yup.number().positive().integer().lessThan(6).required(),
        crowds: yup.number().positive().integer().lessThan(6).required(),
        safety: yup.number().positive().integer().lessThan(6).required()
    })

    const formik = useFormik({

        initialValues: {
            length: expObj.length,
            community: expObj.rating.community,
            crowds: expObj.rating.crowds,
            safety: expObj.rating.safety
        },

        validationSchema: formSchema,
        validateOnBlur: false,
        validateOnChange: false,

        onSubmit: (values) => {
            fetch(`/api/experiences/${params.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(values),
            })
            .then(r => {
              if(r.ok){
                r.json().then(e => {
                    updateExp(e)
                    nav(`/experiences/${params.id}`)
                })
              } else {
                r.json().then(error => setErrors(error))
              }
            })   
        },
      })

    return (
        <Form onSubmit={formik.handleSubmit}>
            {errors&& (<h3 style={{color:'red'}}>{errors}</h3>)}
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
            <input type='submit' value={'Finish Editing'} />
        </Form>
    )
}

export default EditForm

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