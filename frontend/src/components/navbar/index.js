import React from 'react';
import styles from './navbar.module.css';
import Searchbar from '../searchbar';
import { Link } from 'react-router-dom'

const Navbar = ({ setOpen }) => {

    return (
        <div className={styles.navbar_wrapper}>
            <div className={styles.start}>
                <i className="fas fa-bars" onClick={() => setOpen((open) => !open)}></i>
                <Link to='/'><p className={styles.heading}><strong>Khidki</strong></p></Link>
            </div>

            <div className={styles.center}>
                <Searchbar />
            </div>

            <div className={styles.end}>
                <i className="fas fa-bell"></i>
            </div>
        </div>
    )
}

export default Navbar;