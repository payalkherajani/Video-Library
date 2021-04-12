import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useCustomContext from '../../customHooks/Hook';
import { SINGLE_VIDEO_REQUEST, SINGLE_VIDEO_SUCCESS, SINGLE_VIDEO_FAILURE, ADD_TO_HISTORY } from '../../constants/type';
import axios from 'axios';
import { Banner } from '../../components';
import ReactPlayer from 'react-player';
import styles from './single_video.module.css';
import dateformat from 'dateformat';

const SingleVideo = () => {

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const videoId = query.get('v');
    const { state: { singleVideo, history }, dispatch } = useCustomContext();

    const getVideoDetails = async () => {
        try {
            dispatch({ type: SINGLE_VIDEO_REQUEST })
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);

            if (response.status === 200) {
                const { data: { items } } = response;

                dispatch({ type: SINGLE_VIDEO_SUCCESS, payload: items[0] })
            }
        } catch (err) {
            dispatch({ type: SINGLE_VIDEO_FAILURE, payload: 'Something went wrong' })
        }
    }


    useEffect(() => {
        getVideoDetails()
    }, [])

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
                            onStart={() => dispatch({ type: ADD_TO_HISTORY, payload: videoId })}
                        />
                    </div>

                    <div className={styles.player__buttons}>

                        <button className="btn">
                            <i className="fas fa-thumbs-up"></i>{" "}{singleVideo.statistics.likeCount}
                        </button>

                        <button className="btn">
                            <i className="fas fa-thumbs-down"></i>{" "}{singleVideo.statistics.dislikeCount}
                        </button>

                        <button className="btn">
                            <i className="fas fa-list-ul"></i>
                        </button>

                        <button className="btn">
                            <i className="fas fa-plus"></i>
                        </button>

                    </div>

                    <div className={styles.player__contents}>
                        <p className="lead">{singleVideo.snippet.title}</p>
                        <p className="lead">{singleVideo.statistics.viewCount}{" "}Views</p>
                        <p className="lead">{dateformat(singleVideo.snippet.publishedAt, "isoDate")}</p>
                    </div>
                </div>

            </div>
        )

    )
}

export default SingleVideo;