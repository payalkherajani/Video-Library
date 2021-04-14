import React, { useState } from 'react';
import styles from './modal.module.css';
import useCustomContext from '../../customHooks/Hook';
import { ADD_NEW_PLAYLIST, TOGGLE_PLAYLIST_ITEM } from '../../constants/type';
import { v4 as uuidv4 } from 'uuid'

const Modal = ({ setShowModal, videoId }) => {

    const { state, dispatch } = useCustomContext();
    const { playlist } = state;

    const [formData, setFormData] = useState({
        id: uuidv4(),
        name: '',
        videos: [videoId]
    })

    const { name, videos, id } = formData;

    const handleChange = (e, playlistID, videoId) => {
        dispatch({ type: TOGGLE_PLAYLIST_ITEM, payload: { playlistID, videoId } })
    }

    const check = (videoId, videos) => {
        return videos.some((val) => val === videoId)
    }

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const addNewPlaylist = (e) => {
        e.preventDefault();
        try {
            dispatch({ type: ADD_NEW_PLAYLIST, payload: formData })
        } catch (err) {
            console.error(err);
        }
        finally {
            setFormData({ ...formData, name: '', id: '', videos: [] })
        }

    }

    console.log({ state })
    return (
        <div className={styles.modal}>
            <div className="modal">

                <div className="modal-header">
                    <h5 className="modal-title">Playlists</h5>
                    <button className="btn"><i className="fas fa-times" onClick={() => setShowModal((showModal) => !showModal)}></i></button>
                </div>

                <div className="modal-body">
                    {
                        playlist.length > 0 ? (
                            playlist.map(({ id, name, videos }) => (
                                <div className={styles.one_playlist} key={id}>
                                    <input type="checkbox" onChange={(e) => handleChange(e, id, videoId)} checked={check(videoId, videos)} />
                                    <p>{name}</p>
                                </div>
                            ))
                        ) : (null)
                    }
                </div>

                <div className="modal-footer">
                    <form onSubmit={addNewPlaylist}>
                        <input type="text" value={name} name="name" onChange={handleFormData} required />
                        <button className="btn"><i className="fas fa-plus"></i></button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Modal;