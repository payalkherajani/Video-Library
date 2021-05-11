import React, { useEffect } from 'react';
import styles from './landing.module.css';
import { CategoryCard, Footer } from '../../components';
import windowImage from '../../assets/window.svg'
import ReactPlayer from 'react-player';
import axios from 'axios';
import { toast } from 'react-toastify';
import useCustomContext from '../../customHooks/Hook';
import { GET_ALL_CHANNELS, GET_LOGGED_IN_USER } from '../../constants/type';

const Landing = () => {

    const { state, dispatch } = useCustomContext();
    const { user, channels } = state;

    const fetchUserDetails = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            dispatch({ type: GET_LOGGED_IN_USER, payload: data })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])

    const fetchChannelsData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/channels`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            dispatch({ type: GET_ALL_CHANNELS, payload: data })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    useEffect(() => {
        fetchChannelsData()
    }, [])


    return (
        <div className={styles.landing_container}>
            <h1 className={styles.landing__heading}>Welcome {user.name}</h1>

            <div className={styles.landing__grid}>

                <div className={styles.landing__svg}>
                    <h1>Welcome {user.name}</h1>
                    <img src={windowImage} alt='window-svg' className={styles.landing__window} />

                    <ReactPlayer
                        url='https://www.youtube.com/watch?v=YdAIBlPVe9s'
                        width='100%'
                        height='100%'
                        controls={true}
                    />

                </div>

                <div className={styles.landing__cards}>
                    {
                        channels.map(({ channelname, image, channelId, _id }) => (
                            <CategoryCard key={_id} image={image} channelId={channelId} channelname={channelname} />
                        ))
                    }
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Landing;