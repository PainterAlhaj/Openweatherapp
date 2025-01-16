import React from 'react'
import '../assets/css/SmallDetails.css'
import { FaEdgeLegacy, FaEye } from 'react-icons/fa'
import { GiPressureCooker } from 'react-icons/gi'
import { TbActivityHeartbeat, TbStairs, TbStairsUp } from "react-icons/tb";

import { WiHumidity } from 'react-icons/wi'

const SmallDetails = ({temp,humidity,visibility,sunrise,sunset,envicon,environment, pressure,feelslike}) => {
  return (
   <>
   <div className="small-details-container">
   <div className="humidity flex">
    <p>Humidity</p>
    <div className="humidity-data div">
        <div className="humidity-icon">
            <WiHumidity className='icon'/>
            </div>
            <p>{humidity}%</p>
        </div>
        </div>
        <div className="pressure flex">
            <p>Pressure</p>
        <div className="pressure-data div">
        <div className="pressure-icon">
            <TbStairs className='icon'/>
            {/* import { TbStairsUp } from "react-icons/tb"; */}
            </div>
            <p>{pressure}mb</p>
        </div>
        </div>
        <div className="visibility flex">
        <p>Visibility</p>

        <div className="visibility-data div">
        <div className="visibility-icon">
            <FaEye className='icon'/>
            </div>
            <p>{visibility}km</p>
        </div> 
        </div>
        
        <div className="feeslike flex">
        <p>Feels Like</p>
        
        
        <div className="feelslike-data div">
        <div className="feelslike-icon">
            <TbActivityHeartbeat className='icon'/>
            </div>
            <p>{feelslike}°C</p>
        </div>
    </div>

    </div>  
     </>
  )
}

export default SmallDetails
