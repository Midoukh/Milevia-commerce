import React from 'react'
import classes from './Search.css'
import Icon from '@material-ui/core/Icon';

function Search() {
    const iconClass = ["fas fa-search", classes.Icon]
    return (
        <div className={classes.SearchBar}>
            <Icon className={iconClass.join(' ')} />
            <input type="text" className={classes.SearchInput}  placeholder="Search"/>
            
        </div>
    )
}

export default Search
