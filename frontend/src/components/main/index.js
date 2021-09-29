import React from 'react';
import styles from './main.module.css';
import useCustomContext from '../../customHooks/Hook';
import ReactPlayer from 'react-player/youtube';
import dateformat from 'dateformat';
import { Link } from 'react-router-dom'
import { ADD_TO_HISTORY, ADD_WATCH_LATER } from '../../constants/type';
import { toast } from 'react-toastify';
import axios from 'axios'

const Main = () => {
    const { state, dispatch } = useCustomContext();

    const addToWatchLater = async (id) => {
        try {
            const { data: { watchlater } } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/watchlater`, { 'videoID': id }, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            dispatch({ type: ADD_WATCH_LATER, payload: watchlater })
            toast.success("Added to Watchater")
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    const check = (id) => {
        return state.watchlater.some((v) => v === id)
    }

    const getData = (state, data) => {
        let sortedVideos = [...data];
        if (state.keyword) {
            sortedVideos = sortedVideos.filter((video) => video.snippet.title.toLowerCase().includes(state.keyword));
        }
        return sortedVideos;
    }

    const addtoHistory = async (videoID) => {
        try {
            const { data: { historyvideos } } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/history`, { 'videoID': videoID }, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            dispatch({ type: ADD_TO_HISTORY, payload: historyvideos })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }
    const filteredVideos = getData(state, state.videos)
    return (
        <div className={styles.main_container}>
            {
                filteredVideos.map(({ id, snippet: { publishedAt, resourceId, title } }) => {
                    return (

                        <div key={id} className={styles.main__video}>
                            <div style={{ height: '300px' }}>
                                <ReactPlayer
                                    url={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
                                    width='100%'
                                    height='100%'
                                    controls={true}
                                    onStart={() => addtoHistory(resourceId.videoId)}
                                />
                            </div>
                            <p className={`${styles.main__video__content} lead`}>{title}</p>
                            <div className={styles.main__video_watch}>

                                <p className="lead"> Published At: {dateformat(publishedAt, "isoDate")}</p>

                                {
                                    check(resourceId.videoId) === true ? (
                                        <button className="btn btn-danger color-green" disabled={true}>
                                            <i className="fas fa-check"></i>
                                        </button>
                                    ) : (
                                        <button className="btn btn-danger color-green" onClick={() => addToWatchLater(resourceId.videoId)}>
                                            <i className="fas fa-clock"></i>
                                        </button>
                                    )
                                }

                                <Link to={{ pathname: `/video/watch?v=${resourceId.videoId}` }}>
                                    <button className="btn btn-danger color-red">
                                        <i className="fas fa-expand"></i>
                                    </button>
                                </Link>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Main;