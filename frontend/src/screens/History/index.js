import React from 'react';
import { Navbar } from '../../components';
import useCustomContext from '../../customHooks/Hook';
import ReactPlayer from 'react-player';
import styles from './history.module.css';
import { CLEAR_HISTORY, REMOVE_FROM_HISTORY } from '../../constants/type';
import axios from 'axios'
import { toast } from 'react-toastify';

const History = () => {
    const { state: { history }, dispatch } = useCustomContext();

    const deleteFromHistory = async (id) => {
        try {
            const { data: { historyvideos } } = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/history/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            dispatch({ type: REMOVE_FROM_HISTORY, payload: historyvideos })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    const clearHistory = async () => {
        try {
            const { data: { historyvideos } } = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/history`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
            dispatch({ type: CLEAR_HISTORY, payload: historyvideos })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    return (
        <>
            <Navbar landing={false} />
            {
                history.length > 0 ?
                    (
                        <div className={styles.clear_history}>
                            <button className="btn btn-danger color-red" onClick={() => clearHistory()}>
                                Clear History
                            </button>
                        </div>
                    )

                    :
                    (null)
            }
            <div className={styles.history__container}>
                {
                    history.length > 0 ? (
                        history.map((id) => (
                            <div key={id} className={styles.history__video}>

                                <div className={styles.player_height}>
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
                        ))
                    ) : (
                        <div className={styles.no_history}> No History </div>
                    )
                }

            </div>
        </>
    )
}

export default History;