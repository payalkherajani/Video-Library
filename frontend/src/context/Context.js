import { createContext, useReducer } from 'react';
import { reducer } from '../reducer/reducer';
import { v4 as uuidv4 } from 'uuid'

export const Context = createContext({});

const initialState = {
    videos: [],
    playlist: [{ id: uuidv4(), name: 'fav', videos: [] }],
    notes: [],
    watchlater: [],
    liked: [],
    loading: false,
    error: '',
    singleVideo: {},
    history: [],
    keyword: '',
    user: {},
    channels: [],
    activechannel: ''
}

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Context.Provider value={{ state, dispatch }}>
            { children}
        </Context.Provider>
    )
}