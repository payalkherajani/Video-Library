import { VIDEOS_LIST_FAILURE, VIDEOS_LIST_SUCCESS, GET_VIDEOS_LIST_REQUEST, SINGLE_VIDEO_REQUEST, SINGLE_VIDEO_SUCCESS, SINGLE_VIDEO_FAILURE, ADD_TO_HISTORY, REMOVE_FROM_HISTORY } from '../constants/type';


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
            console.log({ filterHistory });
            return { ...state, history: filterHistory }

        default:
            return state


    }
}