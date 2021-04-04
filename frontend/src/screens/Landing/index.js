import React from 'react';
import styles from './landing.module.css';
import { CategoryCard } from '../../components'

const Landing = () => {
    return (
        <div className={styles.landing_container}>
            <h1 className={styles.landing__heading}>Welcome</h1>
            <div className={styles.landing__cards}>
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>
        </div>
    )
}

export default Landing;