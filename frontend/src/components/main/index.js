import React, { Fragment } from 'react';
import styles from './main.module.css';
import useCustomContext from '../../customHooks/Hook';
import ReactPlayer from 'react-player/youtube';
import dateformat from 'dateformat';

const Main = () => {
    const { state: { videos }, dispatch } = useCustomContext();



    return (
        <div className={styles.main_container}>
            {
                videos.map(({ id, snippet: { publishedAt, resourceId, title } }) => {
                    return (
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
                            <p className="lead"><strong>{title}</strong></p>
                            <p className="lead"> Published At: {dateformat(publishedAt, "isoDate")}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Main;