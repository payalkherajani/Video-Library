import { VIDEOS_LIST_FAILURE, VIDEOS_LIST_SUCCESS, GET_VIDEOS_LIST_REQUEST, SINGLE_VIDEO_REQUEST, SINGLE_VIDEO_SUCCESS, SINGLE_VIDEO_FAILURE, ADD_TO_HISTORY, REMOVE_FROM_HISTORY, CLEAR_HISTORY, ADD_WATCH_LATER, REMOVE_WATCH_LATER, CLEAR_WATCH_LATER, SEARCH_KEYWORD, CLEAR_SEARCH, LIKE_VIDEO, REMOVE_LIKE_VIDEO, ADD_NEW_PLAYLIST, DELETE_PLAYLIST, TOGGLE_PLAYLIST_ITEM, REMOVE_ITEM_FROM_PLAYLIST, SET_TOKEN_IN_LOCALSTORAGE, GET_LOGGED_IN_USER, REMOVE_TOKEN_FROM_LOCALSTORAGE, GET_ALL_CHANNELS, GET_ALL_VIDEOS_OF_WATCHLATER, GET_ALL_LIKEDVIDEOS, GET_ALL_HISTORYVIDEOS, GET_ALL_PLAYLIST } from '../constants/type';


export const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {

        case GET_VIDEOS_LIST_REQUEST:
            return { ...state, videos: [], loading: true }

        case VIDEOS_LIST_SUCCESS:
            return { ...state, videos: payload, loading: false }

        case VIDEOS_LIST_FAILURE:
            return { ...state, error: payload, loading: false }

        case SINGLE_VIDEO_REQUEST:
            return { ...state, singleVideo: {}, loading: true }

        case SINGLE_VIDEO_SUCCESS:
            return { ...state, singleVideo: payload, loading: false }

        case SINGLE_VIDEO_FAILURE:
            return { ...state, error: payload, loading: false }

        case ADD_TO_HISTORY:
        case REMOVE_FROM_HISTORY:
        case CLEAR_HISTORY:
        case GET_ALL_HISTORYVIDEOS:
            return { ...state, history: payload }


        case ADD_WATCH_LATER:
        case REMOVE_WATCH_LATER:
        case CLEAR_WATCH_LATER:
        case GET_ALL_VIDEOS_OF_WATCHLATER:
            return { ...state, watchlater: payload }


        case SEARCH_KEYWORD:
            const toSearch = payload.toLowerCase();
            return { ...state, keyword: toSearch }

        case CLEAR_SEARCH:
            return { ...state, keyword: '' }

        case LIKE_VIDEO:
        case REMOVE_LIKE_VIDEO:
        case GET_ALL_LIKEDVIDEOS:
            return { ...state, liked: payload }

        case TOGGLE_PLAYLIST_ITEM:
        case ADD_NEW_PLAYLIST:
        case DELETE_PLAYLIST:
        case REMOVE_ITEM_FROM_PLAYLIST:
        case GET_ALL_PLAYLIST:
            return { ...state, playlist: payload }

        case SET_TOKEN_IN_LOCALSTORAGE:
            localStorage.setItem('token', payload);
            return state;

        case GET_LOGGED_IN_USER:
            return { ...state, user: payload }

        case REMOVE_TOKEN_FROM_LOCALSTORAGE:
            localStorage.removeItem('token')
            return state

        case GET_ALL_CHANNELS:
            return { ...state, channels: payload }

        default:
            return state

    }
}