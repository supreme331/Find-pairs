import styles from './Preloader.module.css'

export const Preloader = () => {
    return <div className={styles.root}>
        <span className={styles.span + ' ' + styles.one}></span>
        <span className={styles.span + ' ' + styles.two}></span>
        <span className={styles.span + ' ' + styles.three}></span>
        <span className={styles.span + ' ' + styles.four}></span>
    </div>
}