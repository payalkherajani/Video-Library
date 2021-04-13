import React from 'react';
import { Navbar } from '../../components';
import useCustomContext from '../../customHooks/Hook';
import ReactPlayer from 'react-player';
import styles from './history.module.css';
import { REMOVE_FROM_HISTORY } from '../../constants/type';


const History = () => {
    const { state: { history }, dispatch } = useCustomContext();

    const deleteFromHistory = (id) => {
        console.log("id", id)
        dispatch({ type: REMOVE_FROM_HISTORY, payload: id })
    }

    console.log(history, "history");
    return (
        <>
            <Navbar landing={false} />
            <div className={styles.history__container}>
                {
                    history.length > 0 ? (
                        history.map((id) => {

                            return <div key={id} className={styles.history__video}>

                                <div style={{ height: '300px' }}>
                                    <ReactPlayer
                                        url={`https://www.youtube.com/watch?v=${id}`}
                                        width='100%'
                                        height='100%'
                                        controls={true}
                                    />
                                </div>

                                <div className={styles.history__video_delete}>
                                    <button className="btn btn-danger color-red" onClick={() => deleteFromHistory(id)}><i className="fas fa-trash"></i></button>
                                </div>

                            </div>
                        })
                    ) : (
                        <div className={styles.no_history}> No History </div>
                    )
                }

            </div>
        </>
    )
}

export default History;