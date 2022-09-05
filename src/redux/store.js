import {configureStore} from "@reduxjs/toolkit"
import boardReducer from './reducers/BoardSlice'
import levelsReducer from "./reducers/LevelsSlice"

const store = configureStore({
    reducer: {
        board: boardReducer,
        levels: levelsReducer
    }
})

export default store