import styles from './Board.module.scss'
import {Cell} from "../Cell/Cell"
import {useDispatch, useSelector} from "react-redux"
import {
    initBoard,
    setIsAllPairsFound,
    setIsFindAPair,
    setIsSelected,
    setIsSelectedAll
} from "../../redux/reducers/BoardSlice"
import {useEffect, useState} from "react"
import {setActiveLevels, setCompletedLevels} from "../../redux/reducers/LevelsSlice"
import {NavigateButton} from "../Navigate/Navigate"
import GoBackImg from "../../img/goBack.png"


export const Board = () => {
    const [selectedCell, setSelectedCell] = useState(null)
    const {boardCells, boardSize, isInit, isAllPairsFound} = useSelector(state => state.board)
    const boardSizes = useSelector(state => state.levels.boardSizes)
    const dispatch = useDispatch()
    const [isCellDisabled, setIsCellDisabled] = useState(false)

    const lastLevel = boardSize === boardSizes[boardSizes.length - 1]

    const boardStyle = boardSize === '3x2' ? styles.board3x2
        : boardSize === '4x3' || boardSize === '4x4' ? styles.board4x3
            : boardSize === '5x4' ? styles.board5x4
                : boardSize === '6x5' || boardSize === '6x6' ? styles.board6x5 : ''


    const OnCellClick = (cell) => {
        if (!selectedCell) {
            console.log(cell)
            dispatch(setIsSelected({id: cell.id, isSelected: true}))
            setSelectedCell(cell)
            return
        }
        if (selectedCell && selectedCell.id !== cell.id) {
            console.log(selectedCell, cell)
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

    const restartLevel = (size) => {
        dispatch(initBoard({size: size}))
        dispatch(setIsAllPairsFound({isAllPairsFound: false}))
        showFruits()
    }

    const nextLevel = () => {
        let indexOfCurrentBoardSize = boardSizes.findIndex((size) => size === boardSize)
        let nextLevelBoardSize = boardSizes[indexOfCurrentBoardSize + 1]
        dispatch(initBoard({size: nextLevelBoardSize}))
        dispatch(setIsAllPairsFound({isAllPairsFound: false}))
        showFruits()
    }

    const showFruits = () => {
        if (isInit) {
            setIsCellDisabled(true)
            setTimeout(() => {
                dispatch(setIsSelectedAll({isSelected: false}))
                setIsCellDisabled(false)
            }, 3000)
        }
    }

    useEffect(() => {
        if (isAllPairsFound) {
            dispatch(setCompletedLevels({size: boardSize}))
            dispatch(setActiveLevels())
        }
    }, [isAllPairsFound])

    useEffect(() => {
        showFruits()
    }, [isInit])

    return <div className={styles.root}>
        <div className={!isAllPairsFound ? styles.overlayHidden : styles.overlayShow}>
            <div className={!isAllPairsFound ? styles.modalHidden : styles.modalShow}>
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
        <NavigateButton to={"/levels"} title={"К выбору уровня"} LeftImage={GoBackImg}/>
        <div className={styles.title}>
            {boardSize}
        </div>
        <div className={boardStyle}>
            {boardCells.length > 0 &&
                boardCells.map((cell) => <Cell
                    key={cell.id}
                    isCellDisabled={isCellDisabled}
                    OnCellClick={OnCellClick}
                    cell={cell}/>)
            }
        </div>
    </div>

}