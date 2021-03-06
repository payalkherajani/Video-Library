import React from 'react';
import { Navbar } from '../../components';
import { CLEAR_WATCH_LATER, REMOVE_WATCH_LATER } from '../../constants/type';
import useCustomContext from '../../customHooks/Hook';
import styles from './watchlater.module.css';
import ReactPlayer from 'react-player'
import axios from 'axios'
import { toast } from 'react-toastify';

const WatchLater = () => {

    const { state: { watchlater }, dispatch } = useCustomContext();

    const clearWatchLater = async () => {
        try {
            const { data: { watchlater } } = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/watchlater`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            dispatch({ type: CLEAR_WATCH_LATER, payload: watchlater })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    const deleteFromWatchLater = async (id) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/watchlater/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            const { data: { watchlater } } = response
            dispatch({ type: REMOVE_WATCH_LATER, payload: watchlater })
            if (response.status === 200) {
                toast.success("Removed from Watch Later")
            }
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    return (
        <>
            <Navbar landing={false} />
            {
                watchlater.length > 0 ? (
                    <div className={styles.clear_watchlater}>
                        <button className="btn btn-danger color-red" onClick={() => clearWatchLater()}>
                            Clear WatchLater
                        </button>
                    </div>
                )

                    :
                    (null)
            }
            <div className={styles.watchlater__container}>
                {
                    watchlater.length > 0 ? (
                        watchlater.map((id) => {

                            return <div key={id} className={styles.watchlater__video}>

                                <div className={styles.player_height}>
                                    <ReactPlayer
                                        url={`https://www.youtube.com/watch?v=${id}`}
                                        width='100%'
                                        height='100%'
                                        controls={true}
                                    />
                                </div>

                                <div className={styles.watchlater__video_delete}>
                                    <button className="btn btn-danger color-red" onClick={() => deleteFromWatchLater(id)}><i className="fas fa-trash"></i></button>
                                </div>

                            </div>
                        })
                    ) : (
                        <div className={styles.no_watchlater}> No Videos in WatchLater </div>
                    )
                }

            </div>
        </>
    )
}

export default WatchLater;