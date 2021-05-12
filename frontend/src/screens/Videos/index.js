import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useCustomContext from '../../customHooks/Hook';
import { VIDEOS_LIST_FAILURE, GET_VIDEOS_LIST_REQUEST, VIDEOS_LIST_SUCCESS } from '../../constants/type';
import axios from 'axios';
import { Navbar, Main, Drawer, Footer } from '../../components';
import styles from './videos.module.css';

const Videos = () => {
    const { id } = useParams();
    const { dispatch } = useCustomContext();
    const [open, setOpen] = useState(false);

    const getVideosofChannel = async (id) => {

        try {
            dispatch({ type: GET_VIDEOS_LIST_REQUEST })
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/videos/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            dispatch({ type: VIDEOS_LIST_SUCCESS, payload: data });
        } catch (err) {
            dispatch({ type: VIDEOS_LIST_FAILURE, payload: 'Something went Wrong' })
        }
    }

    useEffect(() => {
        getVideosofChannel(id)
    }, [])

    return (
        <>
            <Navbar setOpen={setOpen} landing={true} />
            <div className={styles.videos_layout}>

                <div className={`${open === true ? (styles.videos_drawer) : (styles.videos_drawer_display_none)}`} >
                    <Drawer />
                </div>

                <div className={`${open === true ? (styles.main) : (styles.main_fullwidth)}`} >
                    <Main />
                </div>
            </div>
            <Footer />
        </>
    )
}


export default Videos;