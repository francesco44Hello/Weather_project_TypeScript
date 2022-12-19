import React from 'react'
import './Button.css'
type ButtonProps = {
    text: string,
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    className: string
}


const Button = ({text, handleClick, className}: ButtonProps) => {
    return (
            <button className={className} onClick={handleClick}>{text}</button>
    )
}

export default Button