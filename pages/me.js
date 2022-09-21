import { Toolbar } from "../components/toolbar"
import styles from '../styles/Me.module.css'

export const Me = () => {
    return <>
    <Toolbar />
        <div className={styles.page}>
            <div>
                <h2>Developer's Column..</h2>
                <img className={styles.avatar} src="/static/images/35753711.jpg" alt="me"/>
            </div>
        </div>
    </>
}

export default Me