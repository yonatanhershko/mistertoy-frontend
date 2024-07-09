import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'
import { loadToys,removeToy } from '../store/actions/toy.actions.js'

import { ToyList } from '../cmps/ToyList.jsx'


export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    // const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err', err)
                // showErrorMsg('Cannot load toys!')
            })
    }, [])





    function onDeleteToy(toyId) {
        removeToy(toyId)
            .catch(() => {
                console.log('Could not remove toy')
            })
    }


    if (!toys) return <h3>Loading..</h3>

    return (
        <div>
            <h3 className='text-center'>Toys App🧸🪀</h3>
            <main>

                {!toys.length && <h2>No toys to display</h2>}
                <ToyList toys={toys} onDeleteToy={onDeleteToy} />
            </main>
        </div>
    )
}
