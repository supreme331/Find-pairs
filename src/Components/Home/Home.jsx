import styles from './Home.module.css'
import {initBoard, raceInit, setRaceCount} from "../../redux/reducers/BoardSlice"
import {useDispatch, useSelector} from "react-redux"
import {NavigateButton} from "../Navigate/Navigate"
import PlayImg from '../../img/play.png'
import racePlayImg from '../../img/racePlay.png'
import SettingsImg from '../../img/settings.png'
import GoInto from '../../img/goInto.png'

export const HomePage = () => {

    const dispatch = useDispatch()
    const activeLevels = useSelector(state => state.levels.activeLevels)
    const actualLevel = activeLevels[activeLevels.length - 1]

    const startRaceMode = () => {
        dispatch(setRaceCount({raceCount: 0}))
        dispatch(raceInit({size: '3x2'}))
    }

    return <>
        <div className={styles.title}>Найди пару</div>
        <div className={styles.menu}>
            <NavigateButton callBack={() => dispatch(initBoard({size: actualLevel}))}
                            to={'/board'} title={actualLevel === '3x2' ? 'Новая игра' : 'Продолжить'}
                            RightImage={PlayImg}/>
            <NavigateButton to={'/levels'} title={'Выбрать уровень'} RightImage={GoInto}/>
            <NavigateButton callBack={() => startRaceMode()} to={'/board'} title={'Режим 2.0'}
                            RightImage={racePlayImg}/>
            <NavigateButton to={'/settings'} title={'Настройки'} RightImage={SettingsImg}/>
        </div>
    </>
}