import styles from './Levels.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {initBoard} from "../../redux/reducers/BoardSlice"
import {useNavigate} from "react-router-dom"
import {NavigateButton} from "../Navigate/Navigate"
import {Preloader} from "../Preloader/Preloader"
import GoBackImg from "../../img/goBack.png"
import PassedImg from "../../img/passed.png"

export const LevelsPage = () => {

    const levels = useSelector(state => state.levels.items)
    const completedLevels = useSelector(state => state.levels.completedLevels)
    const activeLevels = useSelector(state => state.levels.activeLevels)

    return <div className={styles.root}>
        <div className={styles.title}>Уровни</div>
        <NavigateButton to={"/"} title={"на главную"} LeftImage={GoBackImg}/>
        <div className={styles.cards}>
            {levels.length > 0 ? levels.map((level) => <Card key={level.id} level={level}
                                                             completedLevels={completedLevels}
                                                             activeLevels={activeLevels}/>) : <Preloader/>}
        </div>
    </div>
}

const Card = ({level, completedLevels, activeLevels}) => {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const completedLevel = completedLevels.includes(level.size)
    const isActive = activeLevels.includes(level.size)

    const onLevelClick = (size) => {
        dispatch(initBoard({size: size}))
        navigate('/board')
    }
    return isActive ? <div onClick={() => onLevelClick(level.size)} className={styles.cardItem}>
        {completedLevel ? <div className={styles.completed}><img src={PassedImg} alt=""/>
            <div>{level.size}</div>
        </div> : level.size}
    </div> : <div className={styles.notActive}>{level.size}</div>
}