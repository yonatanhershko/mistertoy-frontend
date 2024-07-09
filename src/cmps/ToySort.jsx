import { useEffect, useState} from 'react'



export function ToySort({ onSetSortBy }) {
    const [sortDirection, setSortDirection] = useState(1)
    const [sortByToEdit, setSortByToEdit] = useState({ field: 'name', ...sortDirection })


    useEffect(() => {
        // Notify parent
        onSetSortBy(sortByToEdit)
    }, [sortByToEdit])

    function onSortBy(value) {
        setSortByToEdit(({ field: value, dir: sortDirection }))
        setSortDirection(sortDirection === 1 ? -1 : 1)
    }

    return (
        <section className="sort-container">
            <h2>Sort</h2>
            <button onClick={() => onSortBy('name')} className="btn">By name</button>
            <button onClick={() => onSortBy('price')} className="btn">By price</button>
            <button onClick={() => onSortBy('created')} className="btn">By created</button>
        </section>
    )
}