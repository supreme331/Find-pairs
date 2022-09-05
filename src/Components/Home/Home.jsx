import styles from './Home.module.css'
import {initBoard} from "../../redux/reducers/BoardSlice"
import {useDispatch, useSelector} from "react-redux"
import {NavigateButton} from "../Navigate/Navigate"
import PlayImg from '../../img/play.png'
import SettingsImg from '../../img/settings.png'
import GoInto from '../../img/goInto.png'

export const Home = () => {
    const dispatch = useDispatch()
    const activeLevels = useSelector(state => state.levels.activeLevels)
    const actualLevel = activeLevels[activeLevels.length - 1]

    return <>
        <div className={styles.title}>Найди пару</div>
        <div className={styles.menu}>
            <NavigateButton callBack={() => dispatch(initBoard({size: actualLevel}))}
                            to={'/board'} title={actualLevel === '3x2' ? 'Новая игра' : 'Продолжить'}
                            RightImage={PlayImg}/>
            <NavigateButton to={'/levels'} title={'Выбрать уровень'} RightImage={GoInto}/>
            <NavigateButton to={'/settings'} title={'Настройки'} RightImage={SettingsImg}/>
        </div>
    </>
}