import React from 'react'
import { CLEAR_SEARCH, SEARCH_KEYWORD } from '../../constants/type';
import styles from './searchbar.module.css';
import useCustomContext from '../../customHooks/Hook';

const SearchBar = () => {

    const { state, dispatch } = useCustomContext();

    const handleSearch = (e) => {
        dispatch({ type: SEARCH_KEYWORD, payload: e.target.value })
    }

    const clearSearch = () => {
        dispatch({ type: CLEAR_SEARCH })
    }

    console.log({ state })

    return (
        <>
            <input type="text" placeholder="Search" className={styles.search} onChange={handleSearch} value={state.keyword} />
            <i className="fas fa-times search-icon" onClick={clearSearch} ></i>
        </>
    )
}

export default SearchBar;