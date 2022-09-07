import styles from './Settings.module.scss'
import {NavigateButton} from "../Navigate/Navigate"
import {useDispatch} from "react-redux"
import {initLevels, resetProgress} from "../../redux/reducers/LevelsSlice"
import DeleteImg from '../../img/delete.png'
import GoBackImg from "../../img/goBack.png"

export const SettingsPage = () => {

    const dispatch = useDispatch()
    const resetGameProgress = () => {
        if (window.confirm('Вы действительно хотите сбросить прогресс игры?')) {
            dispatch(resetProgress())
            dispatch(initLevels())
        }
    }

    return <div>
        <div className={styles.title}>Настройки</div>
        <NavigateButton to={"/"} title={"На главную"} LeftImage={GoBackImg}/>
        <div className={styles.button} onClick={() => resetGameProgress()}>
            <div className={styles.subTitle}>Сбросить прогресс игры</div>
            <img className={styles.image} src={DeleteImg} alt=""/>
        </div>
    </div>
}