import React from 'react';
import styles from './drawer.module.css';
import { Link } from 'react-router-dom';
import { REMOVE_TOKEN_FROM_LOCALSTORAGE } from '../../constants/type';
import useCustomContext from '../../customHooks/Hook';


const Drawer = () => {

    const { dispatch } = useCustomContext()

    const logout = () => {
        dispatch({ type: REMOVE_TOKEN_FROM_LOCALSTORAGE })
    }

    return (
        <div className={styles.drawer_container}>
            <ul className={styles.drawer__contents}>

                <Link to={{ pathname: '/' }} className="color-white">
                    <div className={styles.list__item}>
                        <i className="fas fa-home"></i>
                        <li>Home</li>
                    </div>
                </Link>

                <Link to={{ pathname: '/videos/watchlater' }} className="color-white">
                    <div className={styles.list__item}>
                        <i className="fas fa-clock"></i>
                        <li>Watch Later</li>
                    </div>
                </Link>

                <Link to={{ pathname: '/videos/liked' }} className="color-white">
                    <div className={styles.list__item}>
                        <i className="fas fa-thumbs-up"></i>
                        <li>Liked Videos</li>
                    </div>
                </Link>

                <Link to={{ pathname: '/videos/history' }} className="color-white">
                    <div className={styles.list__item}>
                        <i className="fas fa-history"></i>
                        <li>History</li>
                    </div>
                </Link>

                <Link to={{ pathname: '/playlists' }} className="color-white">
                    <div className={styles.list__item}>
                        <i className="fas fa-list"></i>
                        <li>Playlists</li>
                    </div>
                </Link>

                <Link to={{ pathname: '/login' }} className="color-white">
                    <div className={styles.list__item} onClick={() => logout()}>
                        <i className="fas fa-sign-out-alt"></i>
                        <li>Logout</li>
                    </div>
                </Link>

            </ul>
        </div>
    )
}

export default Drawer;