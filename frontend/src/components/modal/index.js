import React, { useState } from 'react';
import styles from './modal.module.css';
import useCustomContext from '../../customHooks/Hook';
import { ADD_NEW_PLAYLIST, TOGGLE_PLAYLIST_ITEM } from '../../constants/type';
import axios from 'axios';
import { toast } from 'react-toastify';


const Modal = ({ setShowModal, videoId }) => {

    const { state, dispatch } = useCustomContext();
    const { playlist } = state;

    const [formData, setFormData] = useState({
        name: '',
        videos: videoId
    })

    const { name, videos } = formData;

    const handleChange = async (e, playlistID, videoId) => {
        try {
            const { data: { playlists } } = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/playlist`, { "videoID": videoId, "playlistID": playlistID }, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            dispatch({ type: TOGGLE_PLAYLIST_ITEM, payload: playlists })
            toast.success(`Playlist Updated`);
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    const check = (videoId, videos) => {
        return videos.some((val) => val === videoId)
    }

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const addNewPlaylist = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/playlist`, { "name": name, "videoID": videoId }, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            dispatch({ type: ADD_NEW_PLAYLIST, payload: response.data.playlists })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
        finally {
            setFormData({ ...formData, name: '', videos: "" })
        }

    }

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
                            playlist.map(({ _id, name, videos }) => (
                                <div className={styles.one_playlist} key={_id}>
                                    <input type="checkbox" onChange={(e) => handleChange(e, _id, videoId)} checked={check(videoId, videos)} />
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