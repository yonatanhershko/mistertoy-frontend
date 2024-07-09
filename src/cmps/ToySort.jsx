import { useEffect, useState } from 'react'

export function ToySort({ onSetSortBy }) {
    const [sortDirection, setSortDirection] = useState(1)
    const [sortByToEdit, setSortByToEdit] = useState({ field: 'name', dir: sortDirection })
    const [inStockClass, setInStockClass] = useState('btn-in-stock')
    // const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    // const [selectedLabels, setSelectedLabels] = useState([])

    useEffect(() => {
        onSetSortBy(sortByToEdit)
    }, [sortByToEdit])

    // useEffect(() => {
    //     onSetLabels(selectedLabels)
    // }, [selectedLabels])

    function onSortBy(field) {
        const dir = sortByToEdit.field === field && sortByToEdit.dir === 1 ? -1 : 1
        setSortByToEdit({ field, dir })
        if (field === 'inStock') {
            setInStockClass(prevClass => prevClass === 'btn-in-stock' ? 'btn-outofstock' : 'btn-in-stock')
        }
    }

    function handleSortChange(event) {
        onSortBy(event.target.value)
    }

    function toggleSortDirection() {
        setSortDirection(prevDirection => prevDirection * -1);
        setSortByToEdit(prevSort => ({ ...prevSort, dir: prevSort.dir * -1 }));
    }

    // function handleLabelChange(event) {
    //     const selectedOptions = Array.from(event.target.selectedOptions, option => option.value)
    //     setSelectedLabels(selectedOptions)
    // }

    return (
        <section className="sort-container">
            <h2>Sort</h2>
            <label htmlFor="sort-select">Sort by:</label>
            <select
                id="sort-select"
                value={sortByToEdit.field}
                onChange={handleSortChange}
                className="sort-select"
            >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Created</option>
                <option value="inStock">In Stock</option>
            </select>
            <button onClick={toggleSortDirection}>
                Sort Direction ({sortByToEdit.dir === 1 ? 'Asc' : 'Desc'})
            </button>
            {/* <div className="label-section">
                <label htmlFor="toy-labels">Toy Labels:</label>
                <select 
                    id="toy-labels"
                    multiple
                    value={selectedLabels}
                    onChange={handleLabelChange}
                    className="label-select"
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