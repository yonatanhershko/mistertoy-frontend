

import { useEffect, useState, useRef } from 'react'

import { toyService } from '../services/toy.service.js'
import { utilService } from "../services/util.service.js"

const toyLabels = toyService.getToyLabels()

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'select-multiple') {
            console.log('target.selectedOptions:', target.selectedOptions)
            value = Array.from(target.selectedOptions, option => option.value || [])
            console.log('value:', value)
          }
        value = type === 'price' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const { name, price ,labels} = filterByToEdit

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
            <div>
                <select
                    multiple
                    name="labels"
                    value={labels || []}
                    onChange={handleChange}
                >
                    <option value="">Labels</option>
                    <>
                        {toyLabels.map(label => (
                            <option key={label} value={label}>
                                {label}
                            </option>
                        ))}
                    </>
                </select>
            </div>

        </section>
    )
}