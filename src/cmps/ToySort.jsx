import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';



export function ToySort({ onSetSortBy }) {

    const [sortDirection, setSortDirection] = useState(1)
    const [sortByToEdit, setSortByToEdit] = useState({ field: 'name', dir: sortDirection })
    const [inStockClass, setInStockClass] = useState('btn-in-stock')
    // const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

    // const sortOptions = [
    //     { label: 'Name', value: 'name' },
    //     { label: 'Price', value: 'price' },
    //     { label: 'Created', value: 'createdAt' },
    //     { label: 'In Stock', value: 'inStock' }
    // ];

    useEffect(() => {
        onSetSortBy(sortByToEdit)
    }, [sortByToEdit])

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


    return (
        <section className="sort-container">
            <h2>Sort</h2>
            {/* <Autocomplete
                disablePortal
                id="sort-select"
                options={sortOptions}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Sort by" />}
                onChange={handleSortChange}
            /> */}

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
            <Button onClick={toggleSortDirection} color='inherit' variant="text">Sort Direction
                ({sortByToEdit.dir === 1 ? 'Asc' : 'Desc'})</Button>

            {/* <button onClick={toggleSortDirection}>
                Sort Direction ({sortByToEdit.dir === 1 ? 'Asc' : 'Desc'})
            </button> */}
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