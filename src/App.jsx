import styles from './App.module.css'
import {BoardPage} from "./Components/Board/Board"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {HomePage} from "./Components/Home/Home"
import {Route, Routes} from 'react-router-dom'
import {LevelsPage} from "./Components/Levels/Levels"
import {initLevels, setActiveLevels} from "./redux/reducers/LevelsSlice"
import {SettingsPage} from "./Components/Settings/Settings"
import {Preloader} from "./Components/Preloader/Preloader"

function App() {

    const [isInitializing, setIsInitializing] = useState(false)
    const fruitNames = useSelector(state => state.board.cellsData)
    const dispatch = useDispatch()

    const initializeApp = () => {
        setIsInitializing(true)
        dispatch(initLevels())
        dispatch(setActiveLevels())
        setIsInitializing(false)
    }

    useEffect(() => {
        initializeApp()
    }, [])

    return <>
        <div className={styles.container}>
            {isInitializing ? <Preloader /> : <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/board/' element={<BoardPage/>}/>
                <Route path='/levels/' element={<LevelsPage/>}/>
                <Route path='/settings/' element={<SettingsPage/>}/>
            </Routes>}
            <div className={styles.hidden}>
                {fruitNames.map((name, index) => <img key={index} rel="preload" src={require(`./img/${name}.png`)} alt="catering"/>)}
            </div>
        </div>
    </>
}

export default App;
