import { utilService } from './util.service.js'
// import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'


const TOY_KEY = 'toyDB'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']
    _createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyToy,
    getDefaultSort,
    getFilterFromSearchParams,
    getSortFromSearchParams
}



function query(filterBy, sortBy) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            // toys = _filter(toys, filterBy)
            // toys = _sort(toys, sortBy)
            return toys
        })
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy(name = '', price = '') {
    return { name, price }
}

function getDefaultFilter() {
    return { txt: '', price: '' }
}

function getDefaultSort() {
    return { field: 'name', dir: 1 }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        if (field === 'pageIdx') {
            filterBy[field] = parseInt(searchParams.get(field))
            if (isNaN(filterBy[field])) filterBy[field] = undefined
        } else {
            filterBy[field] = searchParams.get(field) || ''
        }
    }
    return filterBy
}


//filter &sort

function getSortFromSearchParams(searchParams) {
    const defaultSort = getDefaultSort()
    const sortBy = {}
    for (const field in defaultSort) {
        sortBy[field] = searchParams.get(field) || ''
    }
    return sortBy
}

function _filter(toys, filterBy) {
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        toys = toys.filter(toy => regExp.test(toy.name))
    }
    if (filterBy.price) {
        toys = toys.filter(toy => toy.price.startsWith(filterBy.price))
    }
    return toys
}

function _sort(toys, sortBy) {
    if (sortBy.field === 'name') {
        toys = toys.toSorted((c1, c2) => c1.name.localeCompare(c2.name) * sortBy.dir)
    } else if (sortBy.field === 'price') {
        toys = toys.toSorted((c1, c2) => (c2.price - c1.price) * sortBy.dir)
    }
    return toys
}



function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Teddy Bear'))
        toys.push(_createToy('LEGO Set'))
        toys.push(_createToy('Toy Train'))
        toys.push(_createToy('Yo-Yo'))
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name = 'Muki Dee', price = `${utilService.getRandomIntInclusive(20, 250)}`) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        // labels: ['Doll', 'Battery Powered', 'Baby'],
        // createdAt: 1631031801011,
        // inStock: true,
    }
}
