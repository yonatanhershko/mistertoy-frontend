import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'



import { toyService } from '../services/toy.service.js'
import { loadToys, removeToy, setFilterBy, setSortBy } from '../store/actions/toy.actions.js'

import { ToySort } from '../cmps/ToySort.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'


export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)


    const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = toyService.getFilterFromSearchParams(searchParams)
    const defaultSort = toyService.getSortFromSearchParams(searchParams)


    useEffect(() => {
        setSearchParams({ ...filterBy, ...sortBy })
        loadToys(filterBy, sortBy)
            .catch(() => {
                console.log('Could not load toys')
            })
    }, [filterBy, sortBy])


    useEffect(() => {
        setFilterBy(defaultFilter)
        setSortBy(defaultSort)
    }, [])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSortBy(sortBy) {
        setSortBy(sortBy)
    }

    async function onDeleteToy(toyId) {
        try {
            await removeToy(toyId)
        } catch (err) {
            console.log('Could not remove toy', err)
        }
    }


    if (!toys) return <div className="loader-container"><span className="loader"></span> </div> 


    return (
        <div>
            <main>
         
                <section className='text-center' >
                    <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                    <ToySort onSetSortBy={onSetSortBy} />
                </section>
                <section className='add-container text-center'>
                    <button className='btn add-btn'><Link to='/toy/edit'>Add New Toy</Link></button>
                </section>
                <ToyList toys={toys} onDeleteToy={onDeleteToy} />
                {!toys.length && <h2 className='text-center'>No toys to display😶‍🌫️</h2>}
            </main>
        </div>
    )
}
