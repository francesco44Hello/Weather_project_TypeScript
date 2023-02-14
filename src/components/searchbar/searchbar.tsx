import React from 'react'
import Button from '../button/button'
import './searchbar.css'

type SearchBarProps =  {
    text?: string,
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    className: string,
    handleChange:  (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string
    handleKey:  (event: React.KeyboardEvent<HTMLInputElement>) => void,
    

    
}

const SearchBar = ({text, className, handleChange, handleClick, value, handleKey}: SearchBarProps) => {
    return (
        <div className='searchBar'>
            {/* <label>{text}</label> */}
        <input className={className} placeholder='Search for a City' onChange={handleChange} value={value} type='text' onKeyDown={handleKey} />
        <Button className='search-button' text='Search' handleClick={handleClick}/>
        </div>
    )
}

export default SearchBar
