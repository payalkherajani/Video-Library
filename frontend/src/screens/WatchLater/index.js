import React from 'react';
import { Navbar } from '../../components';
import { CLEAR_WATCH_LATER, REMOVE_WATCH_LATER } from '../../constants/type';
import useCustomContext from '../../customHooks/Hook';
import styles from './watchlater.module.css';
import ReactPlayer from 'react-player'

const WatchLater = () => {

    const { state: { watchlater }, dispatch } = useCustomContext();

    const clearwatchLater = () => {
        dispatch({ type: CLEAR_WATCH_LATER })
    }

    const deleteFromWatchLater = (id) => {
        dispatch({ type: REMOVE_WATCH_LATER, payload: id })
    }

    return (
        <>
            <Navbar landing={false} />
            {
                watchlater.length > 0 ? (
                    <div className={styles.clear_watchlater}>
                        <button className="btn btn-danger color-red" onClick={() => clearwatchLater()}>
                            Clear WatchLater
                    </button>
                    </div>
                )

                    :
                    (null)
            }
            <div className={styles.watchlater__container}>
                {
                    watchlater.length > 0 ? (
                        watchlater.map((id) => (
                            <>
                                <div key={id} className={styles.watchlater__video}>

                                    <div style={{ height: '300px' }}>
                                        <ReactPlayer
                                            url={`https://www.youtube.com/watch?v=${id}`}
                                            width='100%'
                                            height='100%'
                                            controls={true}
                                        />
                                    </div>

                                    <div className={styles.watchlater__video_delete}>
                                        <button className="btn btn-danger color-red" onClick={() => deleteFromWatchLater(id)}><i className="fas fa-trash"></i></button>
                                    </div>

                                </div>
                            </>
                        ))
                    ) : (
                        <div className={styles.no_watchlater}> No Videos in WatchLater </div>
                    )
                }

            </div>
        </>
    )
}

export default WatchLater;