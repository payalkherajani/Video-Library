import { createContext, useReducer } from 'react';
import { reducer } from '../reducer/reducer';

export const Context = createContext({});

const initialState = {
    videos: [],
    playlist: [],
    notes: [],
    watchlater: [],
    liked: []
}

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Context.Provider value={{ state, dispatch }}>
            { children}
        </Context.Provider>
    )
}