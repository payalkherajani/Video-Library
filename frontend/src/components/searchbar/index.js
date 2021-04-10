import React from 'react'
import styles from './searchbar.module.css'

const SearchBar = () => {
    return (
        <>
            <input type="text" placeholder="Search" className={styles.search} />
            <i className="fas fa-times search-icon" ></i>
        </>
    )
}

export default SearchBar;