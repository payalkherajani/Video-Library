import React from 'react';
import styles from './navbar.module.css';
import Searchbar from '../searchbar';
import { Link } from 'react-router-dom';
import useCustomContext from '../../customHooks/Hook';

const Navbar = ({ setOpen, landing }) => {
    const { state, dispatch } = useCustomContext()
    const { user } = state

    return (
        landing === true ?
            (
                <div className={styles.navbar_wrapper}>
                    <div className={styles.start}>
                        <i className="fas fa-bars" onClick={() => setOpen((open) => !open)} style={{ cursor: 'pointer' }}></i>
                        <Link to='/'><p className={styles.heading}><strong>Khidki</strong></p></Link>
                    </div>

                    <div className={styles.center}>
                        <Searchbar />
                    </div>

                    <div className={styles.end}>
                        <img src={user.avatar} className="avatar avatar-md" />
                    </div>
                </div>
            ) :
            (
                <div className={styles.custom__navbar}>

                    <ul className={styles.navbar__items}>
                        <Link to={{ pathname: '/' }} className="color-white">
                            <div className={styles.list__item} title="home">
                                <i className="fas fa-home"></i>
                            </div>
                        </Link>

                        <Link to={{ pathname: '/videos/watchlater' }} className="color-white">
                            <div className={styles.list__item} title="watch later">
                                <i className="fas fa-clock"></i>
                            </div>
                        </Link>

                        <Link to={{ pathname: '/videos/liked' }} className="color-white">
                            <div className={styles.list__item} title="liked videos">
                                <i className="fas fa-thumbs-up"></i>
                            </div>
                        </Link>

                        <Link to={{ pathname: '/videos/history' }} className="color-white">
                            <div className={styles.list__item} title="history">
                                <i className="fas fa-history"></i>
                            </div>
                        </Link>

                        <Link to={{ pathname: '/playlists' }} className="color-white">
                            <div className={styles.list__item} title="playlist">
                                <i className="fas fa-list"></i>
                            </div>
                        </Link>


                    </ul>

                </div>
            )
    )
}

export default Navbar;