import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './banner.module.css'
import { Link } from 'react-router-dom'

const Banner = ({ channelId }) => {

    const [bannerUrl, setBannerUrl] = useState('')

    const getBannerImage = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);

            if (response.status === 200) {
                const { data: { items } } = response;
                const bannerimage = items[0].brandingSettings.image.bannerExternalUrl
                setBannerUrl((bannerUrl) => bannerimage);
            }
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