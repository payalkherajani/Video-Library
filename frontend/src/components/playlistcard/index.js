import React from 'react';
import styles from './playlistcard.module.css';
import { Link } from 'react-router-dom';
import image from '../../assets/playlist.jpg'

const PlaylistCard = ({ list }) => {
    const { id, name, videos } = list;

    return (
        <div className={styles.playlistcard_container}>
            <Link to={{ pathname: `/playlist/${id}` }}>
                <img src={image} alt='playlist-card' className={styles.playlistcard__image} />
                <div className={styles.card__imageoverlay}>
                    <h6>Playlist Name: {name.toUpperCase()} </h6>
                    <h6>Total Videos: {videos.length} </h6>
                </div>
            </Link>
        </div>
    )
}

export default PlaylistCard;