import React from 'react';
import styles from './drawer.module.css';

const Drawer = () => {
    return (
        <div className={styles.drawer_container}>
            <ul>
                <li>Home</li>
                <li>Watch Later</li>
                <li>Liked Videos</li>
                <li>History</li>
            </ul>
        </div>
    )
}

export default Drawer