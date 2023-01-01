import React from 'react'
import './card.css'

type WeatherCardProps = {
    location: string;
    temperature?:string;
    feelsLike?:string;
    moreWeatherText:string;
    dateButtonText:string;
    handleClickDegrees:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    handleClickDate:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
    icon:string;
    main?: string;
    background?: string;
 }

const WeatherCard = ({location, temperature, feelsLike, handleClickDegrees, handleClickDate, moreWeatherText, dateButtonText, icon, main, background}: WeatherCardProps) => {
    
    
    return (
        <div className='weatherComponent' >
        <div className='WeatherCard'>
            <section className="main-weather-info" onClick={handleClickDegrees} role="button"><div className='contentHeader'><h1>{location}</h1><img width='20%' src={icon} alt=""/></div><h2>{temperature}</h2><br/>{feelsLike} <p>{moreWeatherText}</p></section> 
            
        </div>
        {/* <div className='WeatherCard'>
            <section className="main-weather-info" onClick={handleClickDegrees} role="button"><div className='contentHeader'><h1>{location}</h1><img width='20%' src={icon} alt=""/></div><h2>{temperature}</h2><br/>{feelsLike} <p>{moreWeatherText}</p></section> 
            
        </div> */}
        </div>
        
    )
}

export default WeatherCard