import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { TbSearch } from "react-icons/tb";
import { FaWind, FaWater } from "react-icons/fa";

const Home = () => {
    
    const [city, setCity] = useState("Kolkata");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    
    const API_KEY = '7ed33b5bee702881adfa5f364f0028fe';

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeather(response.data);
            setError(null);
        }
        catch (err) {
            setError('Not Found')
            setWeather(null);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    const inputChange = (e) => {
        setCity(e.target.value);
    };

    const searchClick = () => {
        if (city) {
            fetchWeather();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchClick();
        }
    };

  return (
    <>
        <div className="container">
            <div className="search-box">
                <input 
                    type="text" 
                    placeholder='Enter Your Location' 
                    value={city} 
                    onChange={inputChange}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={searchClick}><TbSearch /></button>
            </div>

            {error && <p>{error}</p>}

            {weather && (
                <>
                    <div className="weather-box">
                        <div className="box">
                            <div className="info-weather">
                                <div className="weather">
                                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather" />
                                    <p className="temperature">{weather.main.temp}<span>°C</span></p>
                                    <p className="description">{weather.weather[0].description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="weather-details">
                        <div className="humidity">
                            <i><FaWater /></i>
                            <div className="text">
                                <div className="info-humidity">
                                    <span>{weather.main.humidity}%</span>
                                </div>
                                <p>Humidity</p>
                            </div>
                        </div>
                        
                        <div className='wind'>
                            <i><FaWind/></i>
                            <div className="text">
                                <div className="info-wind">
                                    <span>{weather.wind.speed}Km/h</span>
                                </div>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </>
            )}     
        </div>
    </>
  )
}

export default Home