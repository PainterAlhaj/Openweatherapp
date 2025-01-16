import React from 'react'
import '../assets/css/Current.css'
import { CiCalendar, CiLocationOn } from 'react-icons/ci'
import { FaCloud } from 'react-icons/fa'

const Current = ({currentDate,city,state,country,temp,humidity,visibility,sunrise,sunset,envicon,environment}) => {
  return (
   <>
   
   <div className="current-container">
    <div className="current-data">
        <h3>Now</h3>
        <div className="current-temperature">
        <div className="temperature">
            <p>{temp}°C</p>
           {envicon}
        </div>
        <p className='type'>{environment}</p>
        <div className="time">
            <CiCalendar className='icon'/>
            <p>{currentDate}</p>
           
        </div>
        <div className="current-location">
                <CiLocationOn className='icon'/>
                <p>{city}</p>
            </div>
            </div>
    </div>
   </div>
   </>
  )
}

export default Current
