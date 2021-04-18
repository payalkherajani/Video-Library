import React from 'react';
import useCustomContext from '../../customHooks/Hook';
import { Navbar, PlaylistCard } from '../../components';

const Playlists = () => {

    const { state: { playlist } } = useCustomContext();

    return (
        <>
            <Navbar landing={false} />

            {
                playlist.map((list) => <PlaylistCard list={list} key={list.id} />)
            }

        </>
    )
}

export default Playlists;