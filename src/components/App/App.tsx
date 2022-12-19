import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import WeatherCard from "../Card/Card";
import {
  clear,
  cloudy,
  rain,
  snow,
  storm
} from '../images/images'
import { on } from "events";

const Api_key = process.env.REACT_APP_WEATHER_API_KEY;

type MainWeather = {
  temp: number;
  feels_like: number;
  main: string;
}

type Weather = {
  description: string;
  main: string;
  background: string;
}

type WeatherDataType = {
  main: MainWeather;
  weather: Weather[];
}

function App() {
  const [value, setValue] = useState("");
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("")
  const [weatherIcon, setWeatherIcon] = useState("")
  const [mainCase, setMainCase] = useState("")
  const [dateButtonText, setDateButtonText] = useState("Today" || "Five Days");
  const [lat, setLat] = useState(0);
  const [lon, setLong] = useState(0);
  const [locationName, setLocationName] = useState("")

  const [weatherData, setWeatherData] = useState<WeatherDataType>()


  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    setLocation(event.target.value)
  }

  function handleClick(): void {
    setValue("");
    setLocationName(location.charAt(0).toUpperCase() + location.slice(1))
    fetchWeatherData()
    console.log(weatherData)
  }

  function handleClickDegrees(): void {
    console.log("degrees changed")
  }

  function handleClickDate(date: string): void {
    console.log("5 days weather or today's shows");
    setDateButtonText(date === "Today" ? "5 Days" : "Today")
  }
  function onKeyDown(): void  {
    setValue("");
    setLocationName(location)
    fetchWeatherData()
  }


  useEffect(() => {
    const fetchLocationData = async (): Promise<[]> => {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${Api_key}`
      )
      const data = await res.json()
      //setLocationData(data);
      setLat(data[0].lat); //not working! lat stays at 0
      setLong(data[0].lon); //not working! long stays at 0
      // console.log(`latitude${lat}`)
      // console.log(`longitude ${lon}`)
      return data;

    };
    fetchLocationData()
    // fetchWeatherData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])


  let background = '';
  async function fetchWeatherData() {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=${Api_key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeatherData(result);
        let temp = Math.round(result.main.temp) + '°C'
        let feelsLike = `Feels like: ${Math.round(result.main.feels_like)}°C`
        let iconUrl = `http://openweathermap.org/img/w/${result.weather[0].icon}.png`
        let mainCase = result.weather[0].main

        //console.log(mainCase)
        setTemperature(temp)
        setFeelsLike(feelsLike)
        setWeatherDescription(result.weather[0].description)
        setWeatherIcon(iconUrl)
        setMainCase(mainCase)
      });

  }
  switch (mainCase) {

    case 'Clouds':
      background = cloudy
      break
    case 'Snow':
      background = snow;
      break;
    case "Rain":
    case "Drizzle":
    case "Mist":
      background = rain;
      break;
    case "Thunderstorm":
      background = storm;
      break;
    case "Clear":
      background = clear;

      break;
    default:
      background = '';
      break
  }

  return (
    <div className="App" style={{ backgroundImage: background, backgroundRepeat: "no-repeat", backgroundSize: 'cover' }} >
      <SearchBar
        text="Label"
        className="SearchBar"
        handleChange={handleChange}
        handleClick={handleClick}
        value={value}
      />
      <WeatherCard
        icon={weatherIcon}
        location={locationName}
        temperature={temperature}
        feelsLike={feelsLike}
        moreWeatherText={weatherDescription}
        handleClickDegrees={handleClickDegrees}
        handleClickDate={() => handleClickDate(dateButtonText)}
        onKeyDown={() => onKeyDown()}
        dateButtonText={dateButtonText}
        main={mainCase}
        background={background}

      />
    </div>
  );
}

export default App;

