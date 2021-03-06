import React from 'react';
import { Navbar } from '../../components';
import useCustomContext from '../../customHooks/Hook';
import ReactPlayer from 'react-player';
import styles from './liked.module.css';
import { REMOVE_LIKE_VIDEO } from '../../constants/type';
import { toast } from 'react-toastify';
import axios from 'axios';

const LikedVideos = () => {
    const { state: { liked }, dispatch } = useCustomContext();

    const deleteFromLiked = async (id) => {
        try {
            const { data: { likedvideos } } = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/likedvideos/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            dispatch({ type: REMOVE_LIKE_VIDEO, payload: likedvideos })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    return (
        <>
            <Navbar landing={false} />

            <div className={styles.liked__container}>
                {
                    liked.length > 0 ? (
                        liked.map((id) => (

                            <div key={id} className={styles.liked__video}>

                                <div style={{ height: '300px' }}>
                                    <ReactPlayer
                                        url={`https://www.youtube.com/watch?v=${id}`}
                                        width='100%'
                                        height='100%'
                                        controls={true}
                                    />
                                </div>

                                <div className={styles.liked__video_delete}>
                                    <button className="btn btn-danger color-red" onClick={() => deleteFromLiked(id)}><i className="fas fa-trash"></i></button>
                                </div>

                            </div>

                        ))
                    ) : (
                        <div className={styles.no_liked}> No Videos are liked </div>
                    )
                }

            </div>
        </>
    )
}

export default LikedVideos;