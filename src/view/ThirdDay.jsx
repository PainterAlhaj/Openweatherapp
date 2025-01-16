import React, { useState } from 'react';
import '../assets/css/Forecast.css'
import { IoIosSearch } from "react-icons/io";
import { RiCloseCircleLine } from "react-icons/ri";
import { CiCloudOn } from "react-icons/ci";
import { GiSmokeBomb } from "react-icons/gi";
import { IoRainyOutline } from "react-icons/io5";
import { WiHot } from "react-icons/wi";
import { TiWeatherSunny } from "react-icons/ti";
import { IoCloudDoneOutline } from "react-icons/io5";
import { IoIosCloudOutline } from "react-icons/io";
import { FaCloud } from 'react-icons/fa';

const  ThirdDay = ({ displaythirddata}) => {
    const [weathericon,setweathericon]=useState(null)
  const getWeatherIcon = (description) => {
    switch (description) {
     case "overcast cloud":
               return  <GiSmokeBomb className='icon'/>;
             case "smoke":
               return  <GiSmokeBomb className='icon' />;
             case "clear sky":
              return   <IoCloudDoneOutline className='icon'/>;
             case "hot":
               return  <TiWeatherSunny className='icon' />;
             case "light rain":
              return   <IoRainyOutline className='icon'/>;
             case "broken clouds":
               <FaCloud className='icon'/>;
             default:
              return   <IoIosCloudOutline className='icon'/>;
           }}

  return (
    <div 
      className="todays-forecast-container" 
      
    >
      <div className="forecast-data">
        <h3>Day 3 Forecast</h3>
        <div className="todaysresult">
          {displaythirddata && displaythirddata.length > 0 ? (
           displaythirddata.map((item) => (
              <div key={item.id} >
                <p>{item.time}</p>
                <h2>{item.temp}°C</h2>
                <p>{item.desc}</p>

<p className='icon'>{getWeatherIcon(item.desc)}</p>
              </div>
            ))
          ) : (
            <p>No data available for today.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThirdDay;
