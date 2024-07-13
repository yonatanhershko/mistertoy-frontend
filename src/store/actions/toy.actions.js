import { toyService } from "../../services/toy.service.js"
import { ADD_TOY, REMOVE_TOY, SET_TOYS, SET_FILTER_BY, SET_SORT_BY, SET_IS_LOADING, UPDATE_TOY } from "../reducers/toy.reducer.js";
import { store } from "../store.js"

import { showToyMsg } from "../../services/event-bus.service.js"


export function loadToys(filterBy,sortBy) {

    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy,sortBy)
        .then(toys => {
            store.dispatch({
                type: SET_TOYS,
                toys
            })
        })
        .catch(err => {
            console.error('Cannot load toys:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({
                type,
                toy: savedToy
            })
            return savedToy
        })
        .catch(err => {
            console.error('Cannot save toy:', err)
            throw err
        })
}



export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({
                type: REMOVE_TOY,
                toyId
            })
            showToyMsg('Toy Deleted Successfully🦭')
        })
        .catch(err => {
            console.error('Cannot remove toy:', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSortBy(sortBy) {
    store.dispatch({ type: SET_SORT_BY, sortBy })
}