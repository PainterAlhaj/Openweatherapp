import React, { useState } from 'react';
import '../../assets/css/Design.css'
// Albert Font Install
import '@fontsource/albert-sans'; // Default weight
import '@fontsource/albert-sans/700.css'; // Bold weight

// MUI Components import
import { Button, TextField } from '@mui/material';





const Design = () => {
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [speed, setSpeed] = useState('');
  const API_KEY = "e8fea9cc41b9f46bb3a02ef767ac499c";

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const getWeather = async () => {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=1&appid=${API_KEY}`);
      const data = await response.json();

      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;

        const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const weatherData = await weatherResponse.json();
console.log(weatherData)
        setTemp(weatherData.main.temp);
        setHumidity(weatherData.main.humidity);
        setSpeed(weatherData.wind.speed);
      } else {
        console.log('City not found');
      }
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="design-box">
          <div className="input-box">
            <TextField
              className='input'
              fullWidth autoComplete='off'
              id="standard-basic"
              placeholder="Enter Your City Here"
              variant="standard"
              value={city}
              onChange={handleChange}
            />
            <Button fullWidth className='btn' onClick={getWeather}>
              Get Weather
            </Button>
          </div>
          <div className="result-box">
            <div className="temperature-box">
              {temp  &&
              <>
              <div className="city-name"> {city}</div></>}
              <div className="temperature">{temp}°C</div>
            </div>

            <div className="clouds">
              <div className="humidity">
                <p>Humidity</p>
                <p>{humidity}%</p>
              </div>
              <div className="speed">
                <p>Wind Speed</p>
                <p>{speed} mph</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Design;
