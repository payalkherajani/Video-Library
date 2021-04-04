import React, { useState } from 'react';
import styles from './landing.module.css';
import { CategoryCard } from '../../components';
import windowImage from '../../assets/window.svg'
import ReactPlayer from 'react-player'

const Landing = () => {

    return (
        <div className={styles.landing_container}>
            <h1 className={styles.landing__heading}>Welcome</h1>

            <div className={styles.landing__grid}>

                <div className={styles.landing__svg}>
                    <h1>Welcome</h1>
                    <img src={windowImage} alt='window-svg' className={styles.landing__window} />

                    <ReactPlayer
                        url='http://www.youtube.com/watch?v=YdAIBlPVe9s'
                        width='100%'
                        height='100%'
                    />

                </div>

                <div className={styles.landing__cards}>
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                </div>
            </div>

        </div>
    )
}

export default Landing;