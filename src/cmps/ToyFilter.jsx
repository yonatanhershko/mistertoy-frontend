

import { toyService } from '../services/toy.service.js'
import { utilService } from "../services/util.service.js"
import TextField from '@mui/material/TextField'
import { useEffect, useState, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const ITEM_HEIGHT = 40
const ITEM_PADDING_TOP = 8

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

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
            value = Array.from(target.selectedOptions, option => option.value || [])
        }
        value = type === 'price' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    const theme = useTheme()

    const { name, price, labels } = filterByToEdit

    return (
        <section className="filter-container">
            <h2>Filter</h2>
            <TextField
                id="name"
                label="By name"
                name="name"
                variant="outlined"
                size='small'
                value={name}
                onChange={handleChange}
            />
            <TextField
                id="price"
                label="By price"
                variant="outlined"
                name="price"
                size='small'
                value={price}
                onChange={handleChange}
            />
            <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="labels-multiple-label">Labels</InputLabel>
                    <Select
                        labelId="labels-multiple-label"
                        id="labels-multiple"
                        multiple
                        name="labels"
                        value={labels || []}
                        onChange={handleChange}
                        input={<OutlinedInput label="Labels" />}
                        MenuProps={MenuProps}
                    >

                        {toyLabels.map((label) => (
                            <MenuItem
                                key={label}
                                value={label}
                                style={getStyles(label, labels || [], theme)}
                            >
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </section>
    )
}