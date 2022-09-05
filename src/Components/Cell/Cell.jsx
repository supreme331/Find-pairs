import styles from './Cell.module.css'
import catering from '../../img/catering.png'
import apricot from '../../img/apricot.png'
import avocado from '../../img/avocado.png'
import banana from '../../img/banana.png'
import blueberries from '../../img/blueberries.png'
import goosebeery from '../../img/goosebeery.png'
import orange from '../../img/orange.png'
import raspberry from '../../img/raspberry.png'
import apple from '../../img/apple.png'
import cherry from '../../img/cherry.png'
import grapes from '../../img/grapes.png'
import mangosteen from '../../img/mangosteen.png'
import pear from '../../img/pear.png'
import persimmon from '../../img/persimmon.png'
import pineapple from '../../img/pineapple.png'
import pomegranate from '../../img/pomegranate.png'
import tomato from '../../img/tomato.png'
import watermelon from '../../img/watermelon.png'
import strawberry from '../../img/strawberry.png'

export const Cell = ({cell, OnCellClick, isCellDisabled}) => {
    const isFindAPair = cell.isFindAPair
    const isSelected = cell.isSelected
    let fruits = {
        'apricot': apricot,
        'avocado': avocado,
        'banana': banana,
        'blueberries': blueberries,
        'goosebeery': goosebeery,
        'orange': orange,
        'raspberry': raspberry,
        'strawberry': strawberry,
        'apple': apple,
        'cherry': cherry,
        'grapes': grapes,
        'mangosteen': mangosteen,
        'pear': pear,
        'persimmon': persimmon,
        'pineapple': pineapple,
        'pomegranate': pomegranate,
        'tomato': tomato,
        'watermelon': watermelon,
    }
    return (
        <div onClick={() => {
            if (!isCellDisabled) {
                OnCellClick(cell)
            }
        }}
             key={cell.id}
             className={styles.cell}>
            {isSelected || isFindAPair ?
                <div className={styles.back}><img rel="preload" src={fruits[cell.data]} alt={cell.data}/></div> :
                    <div className={styles.front}><img rel="preload" src={catering} alt="catering"/></div>}
        </div>
    )


}
