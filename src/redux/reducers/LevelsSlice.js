import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    items: [],
    boardSizes: ['3x2','4x3', '4x4', '5x4', '6x5', '6x6'],
    completedLevels: [],
    activeLevels: []
}

export const levelsSlice = createSlice({
    name: 'levels',
    initialState,
    reducers: {
        initLevels: (state= initialState) => {
            state.items = []
            let storageData = window.localStorage.getItem('completedLevels')
            state.completedLevels = storageData ? JSON.parse(storageData) : []
            state.boardSizes.forEach((size, index) => {
                let level = {id: index, size: size}
                state.items.push(level)
            })
            state.activeLevels = []
            for (let i = 0; i <= state.completedLevels.length; i++) {
                state.activeLevels.push(state.boardSizes[i])
            }
        },
        setCompletedLevels: (state = initialState, action) => {
            let set = new Set()
            state.completedLevels.forEach(level => set.add(level))
            set.add(action.payload.size)
            state.completedLevels = Array.from(set)
            window.localStorage.setItem('completedLevels', JSON.stringify(state.completedLevels))
        },
        setActiveLevels: (state = initialState) => {
            state.activeLevels = []
            let set = new Set()
            for (let i = 0; i <= state.completedLevels.length; i++) {
                    state.activeLevels.push(state.boardSizes[i])
            }
            state.activeLevels.forEach(level => {
                if (level) {
                    set.add(level)
                }
            })
            state.activeLevels = Array.from(set)
        },
        resetProgress: (state = initialState) => {
            window.localStorage.setItem('completedLevels', JSON.stringify([]))
        }
    },

})

export const { initLevels, setCompletedLevels, setActiveLevels, resetProgress } = levelsSlice.actions

export default levelsSlice.reducer