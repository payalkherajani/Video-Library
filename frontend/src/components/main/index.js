import React, { Fragment } from 'react';
import styles from './main.module.css';
import useCustomContext from '../../customHooks/Hook';
import ReactPlayer from 'react-player/youtube';
import dateformat from 'dateformat';
import { Link } from 'react-router-dom'

const Main = () => {
    const { state: { videos }, dispatch } = useCustomContext();

    return (
        <div className={styles.main_container}>
            {
                videos.map(({ id, snippet: { publishedAt, resourceId, title } }) => {
                    return (
                        <>
                            <div key={id} className={styles.main__video}>
                                <div style={{ height: '300px' }}>
                                    <ReactPlayer
                                        url={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
                                        width='100%'
                                        height='100%'
                                        config={{
                                            youtube: {
                                                playerVars: { showinfo: 1 }
                                            }
                                        }}
                                    />
                                </div>
                                <p className={styles.main__video__content}><strong>{title}</strong></p>
                                <div className={styles.main__video_watch}>
                                    <p> Published At: {dateformat(publishedAt, "isoDate")}</p>
                                    <Link to={{ pathname: `/watch?v=${resourceId.videoId}` }}> <button className="btn btn-danger color-red"><i className="fas fa-play"></i></button></Link>
                                </div>

                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default Main;