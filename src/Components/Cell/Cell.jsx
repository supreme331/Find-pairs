import styles from './Cell.module.scss'
import catering from '../../img/catering.png'
import apricot from '../../img/apricot.png'
import avocado from '../../img/avocado.png'
import banana from '../../img/banana.png'
import blueberries from '../../img/blueberries.png'
import kiwi from '../../img/kiwi.png'
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
import beet from '../../img/beet.png'
import cabbage from '../../img/cabbage.png'
import carambola from '../../img/carambola.png'
import carrot from '../../img/carrot.png'
import coconut from '../../img/coconut.png'
import corn from '../../img/corn.png'
import cucumber from '../../img/cucumber.png'
import durian from '../../img/durian.png'
import eggplant from '../../img/eggplant.png'
import guava from '../../img/guava.png'
import jackfruit from '../../img/jackfruit.png'
import lemon from '../../img/lemon.png'
import lychee from '../../img/lychee.png'
import mandarin from '../../img/mandarin.png'
import mango from '../../img/mango.png'
import onion from '../../img/onion.png'
import papaya from '../../img/papaya.png'
import passion from '../../img/passion.png'
import pea from '../../img/pea.png'
import pepper from '../../img/pepper.png'
import potatoe from '../../img/potatoe.png'


export const Cell = ({cell, isClicked, OnCellClick, isCellDisabled}) => {
    const isFindAPair = cell.isFindAPair
    const isSelected = cell.isSelected
    const isRaceClicked = cell.isRaceClicked
    let fruits = {
        'apricot': apricot,
        'avocado': avocado,
        'banana': banana,
        'blueberries': blueberries,
        'kiwi': kiwi,
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
        'beet': beet,
        'cabbage': cabbage,
        'carambola': carambola,
        'carrot': carrot,
        'coconut': coconut,
        'corn': corn,
        'cucumber': cucumber,
        'durian': durian,
        'eggplant': eggplant,
        'guava': guava,
        'jackfruit': jackfruit,
        'lemon': lemon,
        'lychee': lychee,
        'mandarin': mandarin,
        'mango': mango,
        'onion': onion,
        'papaya': papaya,
        'passion': passion,
        'pea': pea,
        'pepper': pepper,
        'potatoe': potatoe,
    }
    return (
        <div onClick={() => {
            if (!isCellDisabled) {
                OnCellClick(cell)
            }
        }}
             key={cell.id}
             className={isRaceClicked ? styles.clicked : styles.cell}>
            {isSelected || isFindAPair ?
                <div className={styles.back}><img rel="preload" src={fruits[cell.data]} alt={cell.data}/></div> :
                <div className={styles.front}><img rel="preload" src={catering} alt="catering"/></div>}
        </div>
    )


}
