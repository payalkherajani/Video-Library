import React from 'react';
import { Navbar } from '../../components';
import useCustomContext from '../../customHooks/Hook';

const History = () => {
    const { state, dispatch } = useCustomContext();
    console.log({ state });

    return (
        <>
            <Navbar landing={false} />
            {/* <div className={styles.history_container}>
                {

                }

            </div> */}

        </>
    )
}

export default History;