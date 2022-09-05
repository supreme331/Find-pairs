import {createSlice} from "@reduxjs/toolkit"

let cellsData = [
    'apricot',
    'avocado',
    'banana',
    'blueberries',
    'goosebeery',
    'orange',
    'raspberry',
    'strawberry',
    'apple',
    'cherry',
    'grapes',
    'mangosteen',
    'pear',
    'persimmon',
    'pineapple',
    'pomegranate',
    'tomato',
    'watermelon',
]

const initialState = {
    boardCells: [],
    boardSize: '',
    isInit: false,
    isAllPairsFound: false
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        initBoard: (state= initialState, action) => {
            state.boardCells = []
            state.isInit = false
            state.boardSize = action.payload.size

            let countOfCells = action.payload.size.split('x').reduce((a, b) => +a * +b, 1)
            let countOfDifferentFruits = countOfCells / 2
            let randomArr = createRandomArray(cellsData.length)
            let fruits = []

            cellsData.forEach((fruit, index) => {
                fruits[randomArr[index]] = fruit
            })

            let randomIdArr = createRandomArray(36)

            for (let i = 0; i < countOfDifferentFruits; i++) {
                state.boardCells.push({id: randomIdArr[i], data: fruits[i],
                    isFindAPair: false, isSelected: true})
                state.boardCells.push({id: randomIdArr[randomIdArr.length - 1 - i], data: fruits[i],
                    isFindAPair: false, isSelected: true})
            }

            state.boardCells.sort((a, b) => a.id - b.id)

            state.isInit = true

        },
        setIsSelected: (state = initialState, action) => {
            console.log('slice isSelected', action.payload)
            state.boardCells.forEach(cell => {

                if (cell.id === action.payload.id) {
                    cell.isSelected = action.payload.isSelected
                }
            })
        },
        setIsSelectedAll: (state = initialState, action) => {
            state.boardCells.forEach(cell => cell.isSelected = action.payload.isSelected)
        },
        setIsFindAPair: (state = initialState, action) => {
            state.boardCells.forEach(cell => {
                if (cell.id === action.payload.firstId || cell.id === action.payload.secondId) {
                    cell.isSelected = false
                    cell.isFindAPair = true
                }
            })
            state.isAllPairsFound = state.boardCells.every(cell => cell.isFindAPair)
        },
        setIsAllPairsFound: (state = initialState, action) => {
            state.isAllPairsFound = action.payload.isAllPairsFound
        }

    },

})

function createRandomArray(count) {
    let set = new Set()

    do {
        let number = Math.floor(Math.random() * count)
        set.add(number)
    } while (set.size < count)

    return Array.from(set)
}

export const { initBoard, setIsFindAPair, setIsSelected, setIsSelectedAll, setIsAllPairsFound } = boardSlice.actions

export default boardSlice.reducer