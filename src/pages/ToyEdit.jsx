import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import {
    Button,
    TextField,
} from '@mui/material'
import { Formik, Form, Field } from 'formik'
import { toyService } from '../services/toy.service.js'

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(null)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        loadToy()
    }, [])

    async function loadToy() {
        try {
            if (params.toyId) {
                const toy = await toyService.get(params.toyId)
                setToyToEdit(toy)
            } else {
                setToyToEdit(toyService.getEmptyToy())
            }
        } catch (err) {
            console.log('err:', err)
        }
    }

    const ToySchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(2, 'Too Short!')
            .max(20, 'Too Long!'),
        price: Yup.number()
            .required('Price is required')
            .min(1, 'Price must be at least 1'),
        labels: Yup.array().of(Yup.string()),
    })

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const savedToy = await toyService.save(values)
            navigate('/toy')
            // showSuccessMsg(`Toy ${params.toyId ? 'Updated' : 'Added'} (id: ${savedToy._id})`)
        } catch (err) {
            // showErrorMsg('Cannot save toy')
            console.log('err:', err)
        } finally {
            setSubmitting(false)
        }
    }

    if (!toyToEdit) return <div className="loader-container"><span className="loader"></span></div>

    return (
        <section className="toy-edit">
            <h2>{params.toyId ? 'Edit Toy' : 'Add New Toy'}</h2>
            <Formik
                initialValues={toyToEdit}
                validationSchema={ToySchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <Field name="name">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        </Field>

                        <Field name="price">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Price"
                                    type="number"
                                    error={touched.price && Boolean(errors.price)}
                                    helperText={touched.price && errors.price}
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        </Field>

                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            {params.toyId ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                )}
            </Formik>
            <Link to="/toy">Back to Toys</Link>
        </section>
    )
}