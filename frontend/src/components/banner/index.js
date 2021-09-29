import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './banner.module.css'
import { Link } from 'react-router-dom'

const Banner = ({ channelId }) => {

    const [bannerUrl, setBannerUrl] = useState('')

    const getBannerImage = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/videos/banner/${channelId}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            setBannerUrl((bannerUrl) => data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getBannerImage();
        return () => {
            setBannerUrl((bannerUrl) => '')
        }
    }, [])

    return (
        <div className={styles.banner_container}>
            {
                bannerUrl && <img src={bannerUrl} alt="banner" className={styles.banner__image} />
            }
            <Link to={{ pathname: `/channel/${channelId}` }}><button className={`btn ${styles.position_up}`}><i className="fas fa-arrow-alt-circle-left"></i> Go Back</button></Link>
        </div>
    )
}

export default Banner;