import { useEffect, useState } from 'react'



export function ToySort({ onSetSortBy }) {
    const [sortDirection, setSortDirection] = useState(1)
    const [sortByToEdit, setSortByToEdit] = useState({ field: 'name', ...sortDirection })
    const [inStockClass, setInStockClass] = useState('btn-in-stock')
    // const [selectedLabels, setSelectedLabels] = useState([])

    // const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']


    useEffect(() => {
        // Notify parent
        onSetSortBy(sortByToEdit)
    }, [sortByToEdit])

    // useEffect(() => {
    //     onSetLabels(selectedLabels)
    // }, [selectedLabels])


    function onSortBy(value) {
        setSortByToEdit(({ field: value, dir: sortDirection }))
        setSortDirection(sortDirection === 1 ? -1 : 1)
        if (value === 'inStock') {
            setInStockClass(prevClass => 
                prevClass === 'btn-in-stock' ? 'btn-outofstock' : 'btn-in-stock'
            )
        }
    }

    // function handleLabelChange(event) {
    //     const value = Array.from(
    //         event.target.selectedOptions,
    //         (option) => option.value
    //     )
    //     setSelectedLabels(value)
    // }

    return (
        <section className="sort-container">
            <h2>Sort</h2>
            <button onClick={() => onSortBy('name')} className="btn-name">By name</button>
            <button onClick={() => onSortBy('price')} className="btn-price">By price</button>
            <button onClick={() => onSortBy('created')} className="btn-created">By created</button>
            <button onClick={() => onSortBy('inStock')} className={inStockClass}>By in stock</button>
            {/* <div className="label-select">
                <label htmlFor="toy-labels">Toy Labels:</label>
                <select 
                    id="toy-labels"
                    multiple
                    value={selectedLabels}
                    onChange={handleLabelChange}
                >
                    {labels.map((label) => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>
            </div> */}

        </section>
    )
}