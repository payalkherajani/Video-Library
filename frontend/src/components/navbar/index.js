import React from 'react';
import styles from './navbar.module.css';
import Searchbar from '../searchbar';

const Navbar = () => {
    return (
        <div className={styles.navbar_wrapper}>
            <div className={styles.start}>
                <i className="fas fa-bars"></i>
                <p><strong>Khidki</strong></p>
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