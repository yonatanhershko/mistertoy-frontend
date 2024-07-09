

import { useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'

export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.get(params.toyId)
            .then(setToyToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then((savedToy) => {
                navigate('/toy')
                // showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
            })
            .catch(err => {
                // showErrorMsg('Cannot save toy')
                console.log('err:', err)
            })
    }

    const { name, price} = toyToEdit




    if (!toyToEdit) return <h3>Loading...</h3>

    return (
        <section className="toy-edit">
            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="price">price:</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />

                <button>Save</button>
            </form>
            <Link to="/toy">Back to Toys</Link>
        </section>
    )
}