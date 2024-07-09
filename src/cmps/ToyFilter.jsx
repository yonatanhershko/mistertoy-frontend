

import { useEffect, useState, useRef  } from 'react'

import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'price' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const { name, price } = filterByToEdit

    return (
        <section className="toy-filter">
            <h2>Filter</h2>
            <input type="text"
                id="name"
                name="name"
                value={name}
                placeholder="By name"
                onChange={handleChange}
            />
            <input type="text"
                id="price"
                name="price"
                value={price}
                placeholder="By price"
                onChange={handleChange}
            />
        </section>
    )
}