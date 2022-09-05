import styles from './Navigate.module.scss'
import {NavLink} from "react-router-dom"

export const NavigateButton = ({to, title, LeftImage, RightImage, callBack}) => {
    return <NavLink onClick={callBack ? () => callBack() : () => {
    }} className={styles.root} to={to}>
        {LeftImage ? <img className={styles.leftImage} src={LeftImage} alt=""/> : null}
        <div>{title}</div>
        {RightImage ? <img className={styles.image} src={RightImage} alt=""/> : null}
    </NavLink>
}

