import React from "react";
import '../assets/css/Highlights.css'
import { FaAirbnb } from "react-icons/fa";
import Sunrise from "./Sunrise";
import SmallDetails from "./SmallDetails";
import { MdAir } from "react-icons/md";

const Highlights = ({dropdownelement,aqi,quality,pollution,temp,humidity,visibility,sunrise,sunset,envicon,environment, pressure,feelslike}) => {
  return (
    <>
      <div className="highlight-container">
        <div className="highlight-data">
          <h3>Today's Highlights</h3>
          <div className="top">
            <div className="air">
                <div className="quality">
                <p>Air Quality Index</p>
                <p>{quality}</p>

                </div>
                <div className="alldata">
              <div className="air-icon">
                <MdAir className="icon" />
              </div>
              <div className="air-data">
                <div className="pm">
                  <p>CO</p>
                  <h2>{pollution.co}</h2>
                </div>
                <div className="so">
                  <p>SO2</p>
                  <h2>{pollution.so2}</h2>
                </div>
                <div className="no">
                  <p>NO</p>
                  <h2>{pollution.no2}</h2>
                </div>
                <div className="o">
                  <p>pm2_5</p>
                  <h2>{pollution.pm2_5}</h2>
                </div>
              </div>
              </div>
            </div>
            <Sunrise humidity={humidity} visibility={visibility} sunrise={sunrise} sunset={sunset}/>
          </div>
          <div className="bottom">
            <SmallDetails dropdownelement={dropdownelement} humidity={humidity} visibility={visibility} sunrise={sunrise} sunset={sunset}  pressure={pressure} feelslike={feelslike}/>
          </div>
        </div>
      </div>




    </>
  );
};

export default Highlights;
