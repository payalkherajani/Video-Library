import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useCustomContext from '../../customHooks/Hook';
import { GET_VIDEOS_LIST_FAILURE, GET_VIDEOS_LIST_REQUEST } from '../../constants/type';
import axios from 'axios';

const Videos = (props) => {
    const { id } = useParams();
    const { state, dispatch } = useCustomContext()

    const getVideosofChannel = async (id) => {
        try {
            dispatch({ type: GET_VIDEOS_LIST_REQUEST })

            const { data: { items } } = await axios.get(`https://www.googleapis.com/youtube/v3/channels?id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=contentDetails`);

            const uploadId = items[0].contentDetails.relatedPlaylists.uploads

            const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${uploadId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&fields=items(id,snippet(channelId,title,description,publishedAt))&part=snippet&maxResults=10`)


        } catch (err) {
            dispatch({ type: GET_VIDEOS_LIST_FAILURE, payload: 'Something went Wrong' })
        }
    }

    useEffect(() => {
        getVideosofChannel(id)
    }, [])

    return (
        <div>
            Videos
        </div>
    )
}


export default Videos;