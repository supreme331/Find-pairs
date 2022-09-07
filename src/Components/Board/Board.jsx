import styles from './Board.module.scss'
import {Cell} from "../Cell/Cell"
import {useDispatch, useSelector} from "react-redux"
import {
    initBoard, raceInit,
    setIsAllPairsFound,
    setIsFindAPair, setIsRaceClicked,
    setIsSelected,
    setIsSelectedAll, setIsWin, setRaceCount
} from "../../redux/reducers/BoardSlice"
import {useEffect, useState} from "react"
import {setActiveLevels, setCompletedLevels} from "../../redux/reducers/LevelsSlice"
import {NavigateButton} from "../Navigate/Navigate"
import confetti from  'canvas-confetti'
import GoBackImg from "../../img/goBack.png"
import silverStarImg from "../../img/silverStar.png"
import goldStarImg from "../../img/goldStar.png"
import clock from "../../img/clock.png"



export const BoardPage = () => {

    const dispatch = useDispatch()
    const [selectedCell, setSelectedCell] = useState(null)
    const {boardCells, boardSize, isInit, isAllPairsFound, raceMode, raceCount, isWin} = useSelector(state => state.board)
    const [isCellDisabled, setIsCellDisabled] = useState(false)
    const boardSizes = useSelector(state => state.levels.boardSizes)
    const [time, setTime] = useState(10)
    const [isLose, setIsLose] = useState(false)
    const [starsArray, setStarsArray] = useState([])
    const lastLevel = boardSize === boardSizes[boardSizes.length - 1]

    const boardStyle = boardSize === '3x2' ? styles.board3x2
        : boardSize === '4x3' || boardSize === '4x4' ? styles.board4x3
            : boardSize === '5x4' ? styles.board5x4
                : boardSize === '6x5' || boardSize === '6x6' ? styles.board6x5 : ''

    const OnCellClick = (cell) => {
        if (raceMode) {
            if (!selectedCell) {
                dispatch(setIsRaceClicked({id: cell.id, isRaceClicked: true}))
                setSelectedCell(cell)
                return
            }
            if (selectedCell && selectedCell.id !== cell.id) {
                if (selectedCell.data === cell.data) {
                    dispatch(setIsRaceClicked({id: cell.id, isRaceClicked: true}))
                    setTimeout(() => {
                        nextLevel()
                        setSelectedCell(null)
                    }, 700)
                } else {
                    dispatch(setIsRaceClicked({id: cell.id, isRaceClicked: false}))
                    dispatch(setIsRaceClicked({id: selectedCell.id, isRaceClicked: false}))
                    setSelectedCell(null)
                }
            }
        } else {
            if (!selectedCell) {
                dispatch(setIsSelected({id: cell.id, isSelected: true}))
                setSelectedCell(cell)
                return
            }
            if (selectedCell && selectedCell.id !== cell.id) {
                if (selectedCell.data === cell.data) {
                    dispatch(setIsFindAPair({firstId: selectedCell.id, secondId: cell.id}))
                    setSelectedCell(null)
                } else {
                    dispatch(setIsSelected({id: cell.id, isSelected: true}))
                    setIsCellDisabled(true)
                    setTimeout(() => {
                        dispatch(setIsSelected({id: cell.id, isSelected: false}))
                        dispatch(setIsSelected({id: selectedCell.id, isSelected: false}))
                        setIsCellDisabled(false)
                    }, 700)
                    setSelectedCell(null)
                }
            }
        }
    }

    const restartLevel = (size) => {
        if (raceMode) {
            dispatch(setRaceCount({raceCount: 0}))
            dispatch(raceInit({size: '3x2'}))
            setTime(10)
            setIsLose(false)
            dispatch(setIsWin({isWin: false}))
        } else {
            dispatch(initBoard({size: size}))
            dispatch(setIsAllPairsFound({isAllPairsFound: false}))
            showFruits()
        }
    }

    const nextLevel = () => {
        let indexOfCurrentBoardSize = boardSizes.findIndex((size) => size === boardSize)
        let nextLevelBoardSize = boardSizes[indexOfCurrentBoardSize + 1]
        if (raceMode) {
            if (raceCount < 4) {
                dispatch(setRaceCount({raceCount: raceCount + 1}))
                dispatch(raceInit({size: boardSize}))
            } else {
                dispatch(setRaceCount({raceCount: raceCount + 1}))
                if (lastLevel) {
                    dispatch(setIsWin({isWin: true}))
                    victory()
                } else {
                    setTimeout(() => {
                        dispatch(setRaceCount({raceCount: 0}))
                        dispatch(raceInit({size: nextLevelBoardSize}))
                    }, 1500)
                }
            }
        } else {
            dispatch(initBoard({size: nextLevelBoardSize}))
            dispatch(setIsAllPairsFound({isAllPairsFound: false}))
            showFruits()
        }
    }

    const prevLevel = () => {
        let indexOfCurrentBoardSize = boardSizes.findIndex((size) => size === boardSize)
        let prevLevelBoardSize = boardSizes[indexOfCurrentBoardSize - 1]
        dispatch(setRaceCount({raceCount: 4}))
        dispatch(raceInit({size: prevLevelBoardSize}))
    }

    const showFruits = () => {
        if (isInit) {
            if (raceMode) {
                dispatch(setIsSelectedAll({isSelected: true}))
            } else {
                setIsCellDisabled(true)
                setTimeout(() => {
                    dispatch(setIsSelectedAll({isSelected: false}))
                    setIsCellDisabled(false)
                }, 3000)
            }
        }
    }

    const timeIsOut = () => {
        if (raceCount > 0) {
            dispatch(setRaceCount({raceCount: raceCount - 1}))
            setTime(10)
            dispatch(raceInit({size: boardSize}))
        } else if (raceCount === 0) {
            setTime(10)
            prevLevel()
        }
    }

    const victory = () => {
        let duration = 7 * 1000;
        let animationEnd = Date.now() + duration;
        let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min
        }

        let interval = setInterval(function() {
            let timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            let particleCount = 50 * (timeLeft / duration)

            confetti(Object.assign({}, defaults,
                { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }))
            confetti(Object.assign({}, defaults,
                { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }))
        }, 250)
    }

    useEffect(() => {
        if (time < 1) {
            if (boardSize === '3x2' && raceCount === 0) setIsLose(true)
            else timeIsOut()
        }
    }, [time])

    useEffect(() => {
        if (raceMode && !isLose && !isWin) {
            const interval = setInterval(() => {
                setTime((time) => time - 1)
            }, 1000)
            setTime(time => time + 5)
            let starsArr = []
            for (let i = 0; i < raceCount; i++) {
                starsArr.push(goldStarImg)
            }
            for (let i = 0; i < 5 - raceCount; i++) {
                starsArr.push(silverStarImg)
            }
            setStarsArray(starsArr)
            return () => clearInterval(interval)
        }
    }, [raceCount, isLose, isWin])

    useEffect(() => {
        if (isAllPairsFound) {
            if (lastLevel) {
                victory()
            } else {
                dispatch(setCompletedLevels({size: boardSize}))
                dispatch(setActiveLevels())
            }
        }
    }, [isAllPairsFound])

    useEffect(() => {
        showFruits()
    }, [isInit])

    return <div className={styles.root}>
        <ModalBlock boardSize={boardSize}
                    isAllPairsFound={isAllPairsFound}
                    lastLevel={lastLevel}
                    dispatch={dispatch}
                    restartLevel={restartLevel}
                    nextLevel={nextLevel}
                    isLose={isLose}
                    isWin={isWin}/>
        <HeadBlock boardSize={boardSize}
                   isLose={isLose}
                   isWin={isWin}
                   raceMode={raceMode}
                   starsArray={starsArray}
                   time={time}/>
        <Board boardCells={boardCells}
               boardStyle={boardStyle}
               isCellDisabled={isCellDisabled}
               OnCellClick={OnCellClick}/>
    </div>
}

const ModalBlock = ({boardSize, isAllPairsFound, lastLevel, dispatch, restartLevel, nextLevel, isLose, isWin}) => {

    return <>
        <div className={isAllPairsFound ? styles.overlayShow : styles.overlayHidden}>
            <div className={isAllPairsFound ? styles.modalShow : styles.modalHidden}>
                <div className={styles.title}>{!lastLevel ? "Уровень пройден" : "Ура! Все уровни пройдены!"}</div>
                {!lastLevel && <NavigateButton callBack={() => nextLevel()}
                                               to={"/board"}
                                               title={"Следующий уровень"}/>}
                <NavigateButton callBack={() => restartLevel(boardSize)}
                                to={"/board"}
                                title={"Перезапустить уровень"}/>
                <NavigateButton callBack={() => dispatch(setIsAllPairsFound({isAllPairsFound: false}))}
                                to={"/levels"}
                                title={"К выбору уровня"}/>
                <NavigateButton callBack={() => dispatch(setIsAllPairsFound({isAllPairsFound: false}))}
                                to={"/"}
                                title={"На главную"}/>
            </div>
        </div>
        <div className={isLose ? styles.overlayShow : styles.overlayHidden}>
            <div className={isLose ? styles.modalShow : styles.modalHidden}>
                <div className={styles.title}>Время вышло</div>
                <NavigateButton callBack={() => restartLevel(boardSize)}
                                to={"/board"}
                                title={"Попробовать еще раз"}/>
                <NavigateButton callBack={() => dispatch(setIsAllPairsFound({isAllPairsFound: false}))}
                                to={"/"}
                                title={"На главную"}/>
            </div>
        </div>
        <div className={isWin ? styles.overlayShow : styles.overlayHidden}>
            <div className={isWin ? styles.modalShow : styles.modalHidden}>
                <div className={styles.title}>Ура! Режим 2.0 пройден</div>
                <NavigateButton callBack={() => restartLevel('3x2')}
                                to={"/board"}
                                title={"Начать сначала"}/>
                <NavigateButton callBack={() => dispatch(setIsWin({isWin: false}))}
                                to={"/"}
                                title={"На главную"}/>
            </div>
        </div>
    </>
}

const HeadBlock = ({raceMode, boardSize, isWin, isLose, time, starsArray}) => {

    return <div className={styles.headBlock}>
        {raceMode
            ? <NavigateButton to={"/"} title={"На главную"} LeftImage={GoBackImg}/>
            : <NavigateButton to={"/levels"} title={"К выбору уровня"} LeftImage={GoBackImg}/>}
        <div className={styles.infoBlock}>
            <div className={styles.title}>
                {boardSize}
            </div>
            {raceMode && <div className={isWin || isLose ? styles.timerStop : styles.timer}>
                <img src={clock} alt="clock"/>
                <span className={time < 10 ? styles.redCounter : styles.counter}>{time}</span>
            </div>}
        </div>
        {raceMode && <div className={styles.starBlock}>
            {starsArray.map((star, index) => {
                if (star === silverStarImg) {
                    return <img className={styles.silverStar} key={index} src={star} alt="star"/>
                }
                if (star === goldStarImg) {
                    return <img className={styles.goldStar} key={index} src={star} alt="star"/>
                }
            })}
        </div>}
    </div>
}

const Board = ({boardStyle, boardCells, isCellDisabled, OnCellClick}) => {

    return <div className={boardStyle}>
        {boardCells.length > 0 &&
            boardCells.map((cell) => <Cell
                key={cell.id}
                isCellDisabled={isCellDisabled}
                OnCellClick={OnCellClick}
                cell={cell}/>)}
    </div>
}