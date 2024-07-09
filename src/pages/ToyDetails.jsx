

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


import { toyService } from '../services/toy.service.js'

export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)
    useEffect(() => {
        toyService.get(toyId)
            .then(setToy)
        // .catch(err)
    }, [])


    if (!toy) return <h3>Loading..</h3>
    return (
        <section className='details-container'>
            <h1>Toy Details</h1>
            <p>Name:{toy.name}</p>
            <p>Price:${toy.price}</p>
            <h2>{toy.inStock ? 'In Stock🦔' : 'Out of Stock😶‍🌫️'}</h2>

            <Link to="/toy">Back to Toys</Link>
        </section>
    )
}