import React from 'react';
import useCustomContext from '../../customHooks/Hook';
import { Navbar, PlaylistCard } from '../../components';
import styles from './playlist.module.css';

const Playlists = () => {

    const { state: { playlist } } = useCustomContext();

    return (
        <>
            <Navbar landing={false} />

            <div className={styles.playlists}>
                {
                    playlist.map((list) => <PlaylistCard list={list} key={list._id} />)
                }
            </div>

        </>
    )
}

export default Playlists;