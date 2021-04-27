import React from 'react';
import styles from './categorycard.module.css';
import { Link } from 'react-router-dom';

const CategoryCard = ({ channelname, image, channelId }) => {
    return (
        <div className={styles.categorycard_container}>
            <Link to={{ pathname: `/channel/${channelId}` }}>
                <img src={image} alt='categor-card' className={styles.categorycard__image} />
                <div className={styles.card__imageoverlay}>
                    {channelname}
                </div>
            </Link>
        </div>

    )
}

export default CategoryCard;