import React, { useEffect } from 'react';
import styles from './landing.module.css';
import { CategoryCard, Footer } from '../../components';
import windowImage from '../../assets/window.svg'
import ReactPlayer from 'react-player';
import axios from 'axios';
import { toast } from 'react-toastify';
import useCustomContext from '../../customHooks/Hook';
import { GET_LOGGED_IN_USER } from '../../constants/type';

const Landing = () => {

    const { state, dispatch } = useCustomContext();
    const { user } = state;

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

                    <CategoryCard image="https://i.pinimg.com/originals/c7/e5/ae/c7e5ae44d75084fd6b5f253ce828e1d5.png" channelname="Kara & Nate" channelId="UC4ijq8Cg-8zQKx8OH12dUSw" />

                    <CategoryCard image="https://yt3.ggpht.com/ytc/AAUvwngopd1przlk3ZZDKxtw3hqN-Hr_BB8cs3qlAHuLoA=s900-c-k-c0x00ffffff-no-rj" channelname="Lexie Limitless" channelId="UCWoEpiHaC7LOQhaHFT8Rx7A" />

                    <CategoryCard image="https://www.hotfridaytalks.com/wp-content/uploads/2019/02/3c73adf7-varun-vagish-640x480.jpg" channelname="MOUNTAIN TREKKER" channelId="UCl5dXugC3XZeDVsDkTaWJ4g" />

                    <CategoryCard image="https://magazine.xpert.tv/wp-content/uploads/2020/05/unnamed-12.jpg" channelname="Tanya Khanijow" channelId="UCGeGhS_akOxBWQcSmje6B-w" />

                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Landing;