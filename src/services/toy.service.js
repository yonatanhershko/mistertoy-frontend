
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'
const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
  ]
  
  const bgColors = [
    'white',
    '#f6e2dd',
    '#f39f76',
    '#fff8b8',
    '#e2f6d3',
    '#d3bfdb',
    '#aeccdc',
]

export const toyService = {
    query,
    get,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getFilterFromSearchParams,
    getSortFromSearchParams,
    getToyLabels,
    getImportanceStats,
    getBgColors,
    toggleMenu
  
}


function query(filterBy = {}, sortBy = {}) {
    const filterAndSort = { ...filterBy, sortBy: sortBy.field, sortDir: sortBy.dir === 1 ? 'asc' : 'desc' };
    return httpService.get(BASE_URL, filterAndSort);
}

function get(toyId) {
    return httpService.get(BASE_URL + toyId)

}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}


function getEmptyToy() {
    return {
        name: '',
        price: '',
        inStock: true,
        labels: _getRandomLabels(),
        createdAt: Date.now() - utilService.getRandomIntInclusive(0, 10000000),
        bgColor: _getRandomBgColor()
    }
}


function getDefaultFilter() {
    return { name: '', price: '' }
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

function getSortFromSearchParams(searchParams) {
    const defaultSort = getDefaultSort()
    const sortBy = {}
    for (const field in defaultSort) {
        if (searchParams.get(field) !== null) {
            sortBy[field] = searchParams.get(field)
        } else {
            sortBy[field] = defaultSort[field]
        }
    }
    return sortBy
}


function getToyLabels() {
    return [...labels]
  }
  
  function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
      const randomIdx = Math.floor(Math.random() * labelsCopy.length)
      randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
    }
    return randomLabels
  }



  function getBgColors() {
    return [...bgColors]
}

function _getRandomBgColor() {
    const bgColorsCopy = [...bgColors]
    const randomIdx = Math.floor(Math.random() * bgColorsCopy.length)
    return bgColorsCopy[randomIdx]
}


  function getImportanceStats() {
    return httpService.get(BASE_URL)
        .then(toys => {
            const toyStatsByLabel = _getToyStatsByLabel(toys)
            const data = labels.map(label => ({
                label,
                toyAmount: toyStatsByLabel[label]?.toyAmount || 0,
                avgPrice: toyStatsByLabel[label]?.avgPrice || 0
            }))
            return data
        })
}

function _getToyStatsByLabel(toys) {
    const toyStatsByLabel = {}

    labels.forEach(label => {
        toyStatsByLabel[label] = { toyAmount: 0, totalPrice: 0, avgPrice: 0 }
    })

    toys.forEach(toy => {
        toy.labels.forEach(label => {
            toyStatsByLabel[label].toyAmount++
            toyStatsByLabel[label].totalPrice += parseFloat(toy.price)
        })
    })

    Object.keys(toyStatsByLabel).forEach(label => {
        if (toyStatsByLabel[label].toyAmount > 0) {
            toyStatsByLabel[label].avgPrice = (toyStatsByLabel[label].totalPrice / toyStatsByLabel[label].toyAmount).toFixed(2)
            // Convert back to number
            toyStatsByLabel[label].avgPrice = parseFloat(toyStatsByLabel[label].avgPrice)
        } else {
            toyStatsByLabel[label].avgPrice = 0
        }
    })

    return toyStatsByLabel
}

function toggleMenu() {
    document.body.classList.toggle("menu-open")

}



// function _filter(toys, filterBy) {
//     if (filterBy.name) {
//         const regExp = new RegExp(filterBy.name, 'i')
//         toys = toys.filter(toy => regExp.test(toy.name))
//     }
//     if (filterBy.price) {
//         toys = toys.filter(toy => toy.price.startsWith(filterBy.price))
//     }
//     return toys
// }

// function _sort(toys, sortBy) {
//     if (sortBy.field === 'name') {
//         toys = toys.toSorted((c1, c2) => c1.name.localeCompare(c2.name) * sortBy.dir)
//     } else if (sortBy.field === 'price') {
//         toys = toys.toSorted((c1, c2) => (c2.price - c1.price) * sortBy.dir)
//     } else if (sortBy.field === 'created') {
//         toys = toys.toSorted((c1, c2) => (c2.createdAt - c1.createdAt) * sortBy.dir)
//     } else if (sortBy.field === 'inStock') {
//         toys = toys.toSorted((c1, c2) => (c2.inStock - c1.inStock) * sortBy.dir)
//     }
//     return toys
// }
