import { VIDEOS_LIST_FAILURE, VIDEOS_LIST_SUCCESS, GET_VIDEOS_LIST_REQUEST, SINGLE_VIDEO_REQUEST, SINGLE_VIDEO_SUCCESS, SINGLE_VIDEO_FAILURE, ADD_TO_HISTORY, REMOVE_FROM_HISTORY, CLEAR_HISTORY, ADD_WATCH_LATER, REMOVE_WATCH_LATER, CLEAR_WATCH_LATER, SEARCH_KEYWORD, CLEAR_SEARCH, LIKE_VIDEO, REMOVE_LIKE_VIDEO, ADD_NEW_PLAYLIST, DELETE_PLAYLIST, TOGGLE_PLAYLIST_ITEM, REMOVE_ITEM_FROM_PLAYLIST, SET_TOKEN_IN_LOCALSTORAGE, GET_LOGGED_IN_USER, REMOVE_TOKEN_FROM_LOCALSTORAGE, GET_ALL_CHANNELS } from '../constants/type';


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
            const findVideoIdExistsinHistory = !![...state.history].find((video) => video === payload);
            if (findVideoIdExistsinHistory) {
                return state
            }
            return { ...state, history: [...state.history, payload] }

        case REMOVE_FROM_HISTORY:
            const filterHistory = state.history.filter((video) => video !== payload);
            return { ...state, history: filterHistory }

        case CLEAR_HISTORY:
            return { ...state, history: [] }

        case ADD_WATCH_LATER:
            const findWatchLaterID = !![...state.watchlater].find((video) => video === payload);
            if (findWatchLaterID) {
                return state
            }
            return { ...state, watchlater: [...state.watchlater, payload] }

        case REMOVE_WATCH_LATER:
            const filterWatchLater = state.watchlater.filter((video) => video !== payload);
            return { ...state, watchlater: filterWatchLater }

        case CLEAR_WATCH_LATER:
            return { ...state, watchlater: [] }

        case SEARCH_KEYWORD:
            const toSearch = payload.toLowerCase();
            return { ...state, keyword: toSearch }

        case CLEAR_SEARCH:
            return { ...state, keyword: '' }

        case LIKE_VIDEO:
            const likedVideosID = !![...state.liked].find((video) => video === payload)
            if (likedVideosID) {
                return state
            }
            return { ...state, liked: [...state.liked, payload] }

        case REMOVE_LIKE_VIDEO:
            const filterlikedvideos = state.liked.filter((video) => video !== payload)
            return { ...state, liked: filterlikedvideos }

        case TOGGLE_PLAYLIST_ITEM:
            const { playlistID, videoId } = payload;

            const iteminPlaylist = [...state.playlist].map((one) => {
                if (one.id === playlistID) {
                    const videoPresent = !!one.videos.find((video) => video === videoId);
                    if (videoPresent) {
                        const filtervideo = one.videos.filter((video) => video !== videoId)
                        return { ...one, videos: filtervideo }
                    }
                    else {
                        const newOne = { ...one, videos: [...one.videos, videoId] }
                        return newOne
                    }
                }
                return one
            })

            return { ...state, playlist: iteminPlaylist }

        case ADD_NEW_PLAYLIST:
            return { ...state, playlist: [...state.playlist, payload] }

        case DELETE_PLAYLIST:
            const filterPlaylist = [...state.playlist].filter((one) => one.id !== payload)
            return { ...state, playlist: filterPlaylist }

        case REMOVE_ITEM_FROM_PLAYLIST:
            const { playlistId, id } = payload;

            const removeitemfromplaylist = [...state.playlist].map((one) => {
                if (one.id === playlistId) {
                    const videoPresent = !!one.videos.find((video) => video === id);
                    if (videoPresent) {
                        const filtervideo = one.videos.filter((video) => video !== id)
                        return { ...one, videos: filtervideo }
                    }
                    else {
                        return one
                    }
                }
                return one
            })

            return { ...state, playlist: removeitemfromplaylist }

        case SET_TOKEN_IN_LOCALSTORAGE:
            localStorage.setItem('token', payload);
            return state;

        case GET_LOGGED_IN_USER:
            return { ...state, user: payload }

        case REMOVE_TOKEN_FROM_LOCALSTORAGE:
            localStorage.clear('token');
            return state

        case GET_ALL_CHANNELS:
            return { ...state, channels: payload }


        default:
            return state

    }
}