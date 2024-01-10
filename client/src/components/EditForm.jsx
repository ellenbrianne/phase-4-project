import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

function EditForm () {
    const params = useParams()

    const [edit, setEdit] = useState({
        id:'',
        length:'',
        location: {
            city:'',
            state:''
        },
        community:'',
        crowds:'',
        safety:'',
        user_id:'',
        location_id:''
    })
    
    useEffect(() => {
        fetch(`/api/experiences/${params.id}`)
        .then(r => r.json())
        .then(e => setEdit(e))     
    },[])

    const formSchema = yup.object().shape({
        city: yup.string().required(),
        state: yup.string().required(),
        length: yup.string().required(),
        community: yup.number().positive().integer().lessThan(6),
        crowds: yup.number().positive().integer().lessThan(6),
        safety: yup.number().positive().integer().lessThan(6)
    })

    const formik = useFormik({

        initialValues: edit,

        validationSchema: formSchema,

        onSubmit: (values) => {
            fetch(`/api/experiences/${params.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
            .then(r => {
              if(r.ok){
                nav('/')
              } else {
                // r.json().then(error => setError(error.message))
                null
              }
            })   
        },
      })

    return (
        <form>

        </form>
    )
}

export default EditForm