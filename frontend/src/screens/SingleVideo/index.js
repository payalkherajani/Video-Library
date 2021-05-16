import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useCustomContext from '../../customHooks/Hook';
import { SINGLE_VIDEO_REQUEST, SINGLE_VIDEO_SUCCESS, SINGLE_VIDEO_FAILURE, ADD_TO_HISTORY, ADD_WATCH_LATER, LIKE_VIDEO } from '../../constants/type';
import axios from 'axios';
import { Banner, Modal, Footer } from '../../components';
import ReactPlayer from 'react-player';
import styles from './single_video.module.css';
import dateformat from 'dateformat';
import { toast } from 'react-toastify';


const SingleVideo = () => {

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const videoId = query.get('v');
    const { state, dispatch } = useCustomContext();
    const { singleVideo } = state;
    const [showModal, setShowModal] = useState(false);

    const getVideoDetails = async () => {
        try {
            dispatch({ type: SINGLE_VIDEO_REQUEST })
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/videos/video/${videoId}`, { headers: { 'x-auth-token': localStorage.getItem('token') } });
            if (response.status === 200) {
                const { data } = response;
                dispatch({ type: SINGLE_VIDEO_SUCCESS, payload: data })
            }
        } catch (err) {
            dispatch({ type: SINGLE_VIDEO_FAILURE, payload: 'Something went wrong' })
        }
    }


    useEffect(() => {
        getVideoDetails()
    }, [])

    const addtoLikedVideos = async (id) => {
        try {
            const { data: { likedvideos } } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/likedvideos`, { 'videoID': id }, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            dispatch({ type: LIKE_VIDEO, payload: likedvideos })
            toast.success("Added to Liked Videos")
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }
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

    const addtoHistory = async (videoID) => {
        try {
            const { data: { historyvideos } } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/history`, { 'videoID': videoID }, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            dispatch({ type: ADD_TO_HISTORY, payload: historyvideos })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    const checkWL = (id) => {
        return state.watchlater.some((v) => v === id)
    }

    const check = (id) => {
        return state.liked.some((l) => l === id)
    }

    return (
        Object.keys(singleVideo).length === 0 ? null : (

            <div className={styles.single_video_container}>
                <div className={styles.banner_container}>
                    <Banner channelId={singleVideo.snippet.channelId} />
                </div>

                <div className={styles.player_container}>

                    <div className={styles.player__custom_height}>
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${videoId}`}
                            width='100%'
                            height='100%'
                            controls={true}
                            onStart={() => addtoHistory(videoId)}
                        />
                    </div>

                    <div className={styles.player__buttons}>

                        <button className="btn">
                            {
                                check(videoId) ? (
                                    <>
                                        <i className="fas fa-thumbs-up color-blue"></i>
                                        {" "} {singleVideo.statistics.likeCount = Number(singleVideo.statistics.likeCount)}
                                    </>

                                ) : (
                                    <>
                                        <i className="fas fa-thumbs-up" onClick={() => addtoLikedVideos(videoId)}></i>
                                        {" "} {singleVideo.statistics.likeCount}
                                    </>
                                )
                            }

                        </button>

                        {
                            checkWL(videoId) ? (
                                <button className="btn">
                                    <i className="fas fa-check"></i>
                                </button>
                            ) : (
                                <button className="btn">
                                    <i className="fas fa-clock" onClick={() => addToWatchLater(videoId)}></i>
                                </button>
                            )
                        }

                        <button className="btn">
                            <i className="fas fa-list-ul" onClick={() => setShowModal((showModal) => !showModal)}></i>
                        </button>

                    </div>

                    <div className={styles.player__contents}>
                        <p className="lead">{singleVideo.snippet.title}</p>
                        <p className="lead">{singleVideo.statistics.viewCount}{" "}Views</p>
                        <p className="lead">{dateformat(singleVideo.snippet.publishedAt, "isoDate")}</p>
                    </div>

                    <div className={styles.modal_container}>
                        {
                            showModal === true ? (<Modal setShowModal={setShowModal} videoId={videoId} />) : (null)
                        }
                    </div>
                </div>
                <Footer />
            </div>
        )

    )
}

export default SingleVideo;