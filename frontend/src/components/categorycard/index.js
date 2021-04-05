import React from 'react';
import styles from './categorycard.module.css'

const CategoryCard = ({ channelname, image, channelId }) => {
    return (
        <div className={styles.categorycard_container}>
            <img src={image} alt='categor-card' className={styles.categorycard__image} />
            <div className={styles.card__imageoverlay}>
                {channelname}
            </div>
        </div>
    )
}

export default CategoryCard;