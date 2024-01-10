import React from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

function EditForm ({ currUser, updateExp }) {
    const params = useParams()

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
            user_id: currUser.id
          },

        validationSchema: formSchema,

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
        <form onSubmit={formik.handleSubmit}>
            <label>
                City
            </label>
            <input type='text' name='city' value={formik.values.city} onChange={formik.handleChange} />
            <label>
              State
            </label>
            <input type='text' name='state' value={formik.values.state} onChange={formik.handleChange} />
            <label>
                Duration of Experience
            </label>
              <input type='text' name='length' value={formik.values.length} onChange={formik.handleChange} />
            <label>
                Community
            </label>
            <input type='number' name='community' value={formik.values.community} min={1} max={5} onChange={formik.handleChange} />
            <label>
                Crowds
            </label>
            <input type='number' name='crowds' value={formik.values.crowds} min={1} max={5} onChange={formik.handleChange} />
            <label>
                Safety
            </label>
            <input type='number' name='safety' value={formik.values.safety} min={1} max={5} onChange={formik.handleChange} />
            <input type='submit' value={'Finish Editing Experience'} />
        </form>
    )
}

export default EditForm