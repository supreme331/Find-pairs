import {createSlice} from "@reduxjs/toolkit"

let cellsData = [
    'apricot',
    'avocado',
    'banana',
    'blueberries',
    'kiwi',
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
    'beet',
    'cabbage',
    'carambola',
    'carrot',
    'coconut',
    'corn',
    'cucumber',
    'durian',
    'eggplant',
    'guava',
    'jackfruit',
    'lemon',
    'lychee',
    'mandarin',
    'mango',
    'onion',
    'papaya',
    'passion',
    'pea',
    'pepper',
    'potatoe',
]

const initialState = {
    boardCells: [],
    boardSize: '',
    isInit: false,
    isAllPairsFound: false,
    raceMode: false,
    raceCount: 0,
    isWin: false,
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        initBoard: (state = initialState, action) => {
            state.raceMode = false
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
                state.boardCells.push({
                    id: randomIdArr[i], data: fruits[i],
                    isFindAPair: false, isSelected: true
                })
                state.boardCells.push({
                    id: randomIdArr[randomIdArr.length - 1 - i], data: fruits[i],
                    isFindAPair: false, isSelected: true
                })
            }

            state.boardCells.sort((a, b) => a.id - b.id)

            state.isInit = true

        },
        setIsSelected: (state = initialState, action) => {
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
        },
        raceInit: (state = initialState, action) => {
            state.raceMode = true
            state.boardCells = []
            state.isInit = false
            state.boardSize = action.payload.size
            let countOfCells = action.payload.size.split('x').reduce((a, b) => +a * +b, 1)
            let randomArr = createRandomArray(cellsData.length)
            let fruits = []
            cellsData.forEach((fruit, index) => {
                fruits[randomArr[index]] = fruit
            })
            let randomIdArr = createRandomArray(18)
            for (let i = 0; i < countOfCells; i++) {
                if (i === 1) {
                    state.boardCells.push({
                        id: randomIdArr[i], data: fruits[0],
                        isFindAPair: false, isSelected: true
                    })
                    continue
                }
                state.boardCells.push({
                    id: randomIdArr[i], data: fruits[i],
                    isFindAPair: false, isSelected: true
                })
            }

            state.boardCells.sort((a, b) => a.id - b.id)
            state.isInit = true
        },
        setIsRaceClicked: (state = initialState, action) => {
            state.boardCells.forEach(cell => {
                if (cell.id === action.payload.id) {
                    cell.isRaceClicked = action.payload.isRaceClicked
                }
            })
        },
        setRaceCount: (state = initialState, action) => {
            state.raceCount = action.payload.raceCount
        },
        setIsWin: (state = initialState, action) => {
            state.isWin = action.payload.isWin
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

export const {
    initBoard,
    setIsFindAPair,
    setIsSelected,
    setIsSelectedAll,
    setIsAllPairsFound,
    raceInit,
    setIsRaceClicked,
    setRaceCount,
    setIsWin,
} = boardSlice.actions

export default boardSlice.reducer