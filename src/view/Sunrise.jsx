import React from 'react'
import '../assets/css/Sunrise.css'
import { CiSun } from 'react-icons/ci'
import { FaMoon } from 'react-icons/fa'

const Sunrise = ({temp,humidity,visibility,sunrise,sunset,envicon,environment}) => {
  return (
    <>
    
    <div className="sun-container">
        <div className="sun-data">
                <div className="sun-rise-set">
                            <div className="quality">
                            <p>Sunrise ansd Sunset</p>
            
                            </div>
                            <div className="alldata">

                          
                          <div className="sun-result">
                            <div className="sunrise">
                            <div className="sun-icon">
                            <CiSun className="icon" />
                          </div>
                          <div className="sun-time">
                              <p>Sunrise</p>
                              <h2>{sunrise}</h2>
                              </div>
                            </div>
                            <div className="sunset">
                            <div className="sun-icon">
                            <FaMoon className="icon" />
                          </div>
                          <div className="sun-time">

                              <p>Sunset</p>
                              <h2>{sunset}</h2>
                              </div>

                            </div>
                          
                          </div>
                          </div>
                        </div>
        </div>
    </div>
    </>
  )
}

export default Sunrise
