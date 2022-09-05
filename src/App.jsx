import styles from './App.module.css'
import {Board} from "./Components/Board/Board"
import {useDispatch} from "react-redux"
import {useEffect, useState} from "react"
import {Home} from "./Components/Home/Home"
import {Route, Routes} from 'react-router-dom'
import {Levels} from "./Components/Levels/Levels"
import {initLevels, setActiveLevels} from "./redux/reducers/LevelsSlice"
import {Settings} from "./Components/Settings/Settings"
import {Preloader} from "./Components/Preloader/Preloader"
import catering from '../src/img/catering.png'
import apricot from '../src/img/apricot.png'
import avocado from '../src/img/avocado.png'
import banana from '../src/img/banana.png'
import blueberries from '../src/img/blueberries.png'
import goosebeery from '../src/img/goosebeery.png'
import orange from '../src/img/orange.png'
import raspberry from '../src/img/raspberry.png'
import apple from '../src/img/apple.png'
import cherry from '../src/img/cherry.png'
import grapes from '../src/img/grapes.png'
import mangosteen from '../src/img/mangosteen.png'
import pear from '../src/img/pear.png'
import persimmon from '../src/img/persimmon.png'
import pineapple from '../src/img/pineapple.png'
import pomegranate from '../src/img/pomegranate.png'
import tomato from '../src/img/tomato.png'
import watermelon from '../src/img/watermelon.png'
import strawberry from '../src/img/strawberry.png'

function App() {

    const [isInitializing, setIsInitializing] = useState(false)
    let srcArray = [catering, apricot, avocado, banana, blueberries, goosebeery, orange, raspberry, apple, cherry,
        grapes, mangosteen, pear, persimmon, pineapple, pomegranate, tomato, watermelon, strawberry]

    const dispatch = useDispatch()

    const cacheImages = async (srcArray) => {
        const promises = await srcArray.map(src => {
            return new Promise(function (resolve, reject) {
                const img = new Image()
                img.src = src
                img.onload = resolve()
                img.onerror = reject()
            })
        })

        await Promise.all(promises)
    }

    const initializeApp = async () => {
        setIsInitializing(true)
        await cacheImages (srcArray)
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
                <Route path='/' element={<Home/>}/>
                <Route path='/board/' element={<Board/>}/>
                <Route path='/levels/' element={<Levels/>}/>
                <Route path='/settings/' element={<Settings/>}/>
            </Routes>}
        </div>
    </>
}

export default App;
