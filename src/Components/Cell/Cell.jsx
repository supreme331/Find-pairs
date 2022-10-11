import styles from './Cell.module.scss'

export const Cell = ({cell, OnCellClick, isCellDisabled}) => {

    const isFindAPair = cell.isFindAPair
    const isSelected = cell.isSelected
    const isRaceClicked = cell.isRaceClicked

    return (
        <div onClick={() => {
            if (!isCellDisabled) {
                OnCellClick(cell)
            }
        }}
             key={cell.id}
             className={isRaceClicked ? styles.clicked : styles.cell}>
            {isSelected || isFindAPair ?
                <div className={styles.back}><img rel="preload" src={require(`../../img/${cell.data}.png`)} alt={cell.data}/></div> :
                <div className={styles.front}><img rel="preload" src={require("../../img/catering.png")} alt="catering"/></div>}
        </div>
    )
}
