import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useCustomContext from '../../customHooks/Hook';
import { VIDEOS_LIST_FAILURE, GET_VIDEOS_LIST_REQUEST, VIDEOS_LIST_SUCCESS } from '../../constants/type';
import axios from 'axios';
import { Navbar, Main, Drawer } from '../../components';
import styles from './videos.module.css';

const Videos = () => {
    const { id } = useParams();
    const { state, dispatch } = useCustomContext();
    const [open, setOpen] = useState(false);

    const getVideosofChannel = async (id) => {

        try {
            dispatch({ type: GET_VIDEOS_LIST_REQUEST })

            const { data: { items } } = await axios.get(`https://www.googleapis.com/youtube/v3/channels?id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=contentDetails`);

            const uploadId = items[0].contentDetails.relatedPlaylists.uploads

            const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${uploadId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&fields=items(id,snippet(channelId,title,description,publishedAt,resourceId.videoId))&part=snippet&maxResults=10`);

            dispatch({ type: VIDEOS_LIST_SUCCESS, payload: data.items });

        } catch (err) {
            dispatch({ type: VIDEOS_LIST_FAILURE, payload: 'Something went Wrong' })
        }
    }

    useEffect(() => {
        getVideosofChannel(id)
    }, [])

    return (
        <>
            <Navbar setOpen={setOpen} />
            <div className={styles.videos_layout}>
                {
                    open && <Drawer className={styles.videos_drawer} />
                }
                <Main className={styles.main} />
            </div>
        </>
    )
}


export default Videos;