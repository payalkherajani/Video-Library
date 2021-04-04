import React from 'react';
import styles from './categorycard.module.css'

const CategoryCard = () => {
    return (
        <div className={styles.categorycard_container}>
            <img src="https://i.pinimg.com/originals/c7/e5/ae/c7e5ae44d75084fd6b5f253ce828e1d5.png" alt='categor-card' className={styles.categorycard__image} />
            <div className={styles.card__imageoverlay}>
                Kara & Nate
            </div>
        </div>
    )
}

export default CategoryCard;