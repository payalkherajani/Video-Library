import React from 'react';
import { Navbar } from '../../components'
import useCustomContext from '../../customHooks/Hook';
import styles from './singleplaylist.module.css';
import ReactPlayer from 'react-player';
import { useParams, Link } from 'react-router-dom';
import { DELETE_PLAYLIST, REMOVE_ITEM_FROM_PLAYLIST } from '../../constants/type';

const SinglePlaylist = () => {
    const { state: { playlist }, dispatch } = useCustomContext();
    const { id } = useParams();


    const deleteFromPlaylist = (playlistId, id) => {
        dispatch({ type: REMOVE_ITEM_FROM_PLAYLIST, payload: { playlistId, id } })
    }

    const deletePlaylist = (id) => {
        dispatch({ type: DELETE_PLAYLIST, payload: id })
    }

    const findVideosofPlaylist = playlist.filter((one) => one.id === id);

    return (
        <>
            <Navbar landing={false} />
            <h1>{findVideosofPlaylist[0].name}</h1>
            <Link to='/playlists'> <button className="btn btn-danger" onClick={() => deletePlaylist(findVideosofPlaylist[0].id)}>Delete Playlist</button></Link>

            <div className={styles.singleplaylist__container}>
                {
                    findVideosofPlaylist[0].videos.length > 0 ? (
                        findVideosofPlaylist[0].videos.map((id) => (

                            <div key={id} className={styles.singleplaylist__video}>

                                <div style={{ height: '300px' }}>
                                    <ReactPlayer
                                        url={`https://www.youtube.com/watch?v=${id}`}
                                        width='100%'
                                        height='100%'
                                        controls={true}
                                    />
                                </div>

                                <div className={styles.singleplaylist__video_delete}>
                                    <button className="btn btn-danger color-red" onClick={() => deleteFromPlaylist(findVideosofPlaylist[0].id, id)}><i className="fas fa-trash"></i></button>
                                </div>

                            </div>

                        ))
                    ) : (
                        <div className={styles.no_singleplaylist}> No Videos are in playlist </div>
                    )
                }

            </div>


        </>
    )
}

export default SinglePlaylist;