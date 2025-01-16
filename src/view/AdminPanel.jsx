import React, { useEffect, useState } from 'react'
import '../assets/css/AdminPanel.css'
import Current from './Current'
import Highlights from './Highlights'
import Forecast from './Forecast'
import SecondDay from './SecondDay'
import ThirdDay from './ThirdDay'
import FourthDay from './FourthDay'
import FifhtDay from './FifthDay'


const AdminPanel = ({ displayfourthdata,displayfifthdata,displaythirddata,displayseconddata, displaytodaydata,setdisplaytodaydata,dropdownelement,quality,aqi,pollution,currentDate,city,state,country,temp,humidity,visibility,sunrise,sunset,envicon,environment,pressure,feelslike}) => {

 

  return (
    <>
    <div className="admin">
    <Current currentDate={currentDate}  city={city} state={state} country={country} temp={temp} humidity={humidity} visibility={visibility} sunrise={sunrise} sunset={sunset} envicon={envicon} environment={environment}/>
    <Highlights dropdownelement={dropdownelement} aqi={aqi} quality={quality} pollution={pollution}  humidity={humidity} visibility={visibility} sunrise={sunrise} sunset={sunset}  pressure={pressure} feelslike={feelslike}/>
    </div>

<div className="forecast-container">
  <Forecast  displaytodaydata={displaytodaydata} setdisplaytodaydata={setdisplaytodaydata} />
  <SecondDay displayseconddata={displayseconddata}  />
  <ThirdDay displaythirddata={displaythirddata} />
  <FourthDay displayfourthdata={displayfourthdata}/>
  <FifhtDay displayfifthdata={displayfifthdata}/>
</div>

    </>
  )
}

export default AdminPanel










