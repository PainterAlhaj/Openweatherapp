import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/Newdesign.css";
import sun from "../../assets/img/image/sun2.png";
import { IoIosSearch } from "react-icons/io";
import { RiCloseCircleLine } from "react-icons/ri";
import { CiCloudOn } from "react-icons/ci";
import { GiSmokeBomb } from "react-icons/gi";
import { IoRainyOutline } from "react-icons/io5";
import { WiHot } from "react-icons/wi";
import { TiWeatherSunny } from "react-icons/ti";
import { IoCloudDoneOutline } from "react-icons/io5";
import { IoIosCloudOutline } from "react-icons/io";

import { FaCloud } from "react-icons/fa";
import { AppBar, Toolbar, Typography } from "@mui/material";
const Newdesign = () => {
  const [city, setCity] = useState("Surat, Gujarat, IN");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");

  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [speed, setSpeed] = useState("");
  const [visibility, setvisibility] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [quality, setQuality] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [environment, setenvironment] = useState("");
  const [envicon, setenvicon] = useState(null);
  const [inputchange,setinputchange]=useState(false)

  const [aqi, setAqi] = useState("");
  const [pollution, setPollution] = useState({});

  const [multiplecities,setmultiplecities]=useState([])
const [dropdownopwn,setdropdownopwn]=useState(false)
const dropdownelement=useRef(null)
  const API_KEY = "e8fea9cc41b9f46bb3a02ef767ac499c";

  const handleChange = (event) => {
setinputchange(true)
    setCity(event.target.value);
getallcities()

  };
 
  const closedropdown = (event) => {
    if (dropdownelement.current && !dropdownelement.current.contains(event.target)) {
      setdropdownopwn(false); 
      console.log(event.target)
    }
  };
  useEffect(()=>{
getWeather()
  },[city])
console.log(country)

const getallcities=async()=>{
  try{
    const allcitiesresponse=await fetch( `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=20&appid=${API_KEY}` )
    const allcitiesdata=await allcitiesresponse.json()
    console.log("allcities",allcitiesdata)

    const allcities=allcitiesdata.map((item,index)=>{
       
    })
  }catch(error){
    console.log("Allcities Error:",error)
  }
}
  const getWeather = async () => {
    try {
    console.log(city)

      const encodedCity = encodeURIComponent(city);
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=20&appid=${API_KEY}`
      );
      const data = await response.json();
      console.log("Geocoding Data:", data);
     



      if (data.length > 0) {
        const cities = data.map((item, index) => ({
          id: index + 1,
          city: item.name,
          state: item.state,
          country: item.country,
        }));
        setdropdownopwn(true)
        setmultiplecities(cities); 
        console.log("Multiple Cities:", cities);
        const lat = data[0].lat;
        const lon = data[0].lon;

        const weatherResponse = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const weatherData = await weatherResponse.json();
        // console.log(weatherData);
        setTemp(weatherData.main.temp);
        setHumidity(weatherData.main.humidity);
        setSpeed(weatherData.wind.speed);
        setvisibility(weatherData.visibility);

        setenvironment(weatherData.weather[0].description);
        const sunriseTime = new Date(
          weatherData.sys.sunrise * 1000
        ).toLocaleTimeString();
        const sunsetTime = new Date(
          weatherData.sys.sunset * 1000
        ).toLocaleTimeString();

        setSunrise(sunriseTime);
        setSunset(sunsetTime);

        switch (weatherData.weather[0].description) {
          case "overcast cloud":
            setenvicon(<GiSmokeBomb />);
            break;
          case "smoke":
            setenvicon(<GiSmokeBomb />);
            break;
          case "clear sky":
            setenvicon(<IoCloudDoneOutline />);
            break;
          case "hot":
            setenvicon(<TiWeatherSunny />);
            break;
          case "light rain":
            setenvicon(<IoRainyOutline />);
            break;
          case "broken clouds":
            setenvicon(<FaCloud />);
            break;
          default:
            setenvicon(<IoIosCloudOutline />);
            break;
        }

        const airQualityResponse = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const airQualityData = await airQualityResponse.json();
        const airData = airQualityData.list[0];
        console.log("airdata",airData);
        setAqi(airData.main.aqi); // Set AQI (Air Quality Index)
        setPollution({
          co: airData.components.co, // Carbon Monoxide
          no2: airData.components.no2, // Nitrogen Dioxide
          pm25: airData.components.pm2_5, // PM2.5
          pm10: airData.components.pm10, // PM10
        });

        switch (airData.main.aqi) {
          case 1:
            setQuality("Good");
            break;
          case 2:
            setQuality("Fair");
            break;
          case 3:
            setQuality("Moderate");
            break;
          case 4:
            setQuality("Poor");
            break;
          case 5:
            setQuality("Unhealthy");
            break;
          default:
            setQuality("Unknown");
        }
      } else {
        console.log("City not found");
      }
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    getWeather();
getallcities()
    const date = new Date();

   
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${
      days[date.getDay()]
    }`;
    setCurrentDate(formattedDate);
    document.addEventListener("mousedown",closedropdown)
   
  }, []);

  const alldata = [
    {
      id: 1,
      title: "humidity",
      result: `${humidity}%`,
      type: "",
    },
    {
      id: 2,
      title: "Wind Status",
      result: `${speed}km/h`,
      type: "",
    },
    {
      id: 3,
      title: "Sunrise",
      result: sunrise,
      // type:'Normal',
    },
    ,
    {
      id: 4,
      title: "Visibility",
      result: visibility,
      // type:'Average',
    },
    {
      id: 5,
      title: "Air Quality",
      result: pollution.co,
      type: quality,
    },
    {
      id: 6,
      title: "Sunset",
      result: sunset,
      // type:'Normal',
    },
  ];
 
   
  return (
    <div className="design-container">
      <div className="design">
        <div className="left">
        <div className="both-input">
       
</div>
          <div className="img-box">
            <img src={sun} alt="" />
          </div>
          <div className="temperature">
            <p>{temp}°C</p>
          </div>
          <div className="time">
            <p>{currentDate}</p>
          </div>
          <div className="cloud">
            {envicon}
            {/* <CiCloudOn className='icon'/> */}
            <p>{environment}</p>
          </div>
        </div>
        <div className="right">
          <div className="result">
            {/* <AppBar position='relative'><Toolbar></Toolbar></AppBar> */}
            <div className="highlight">
              <p>Today's Higlights</p>
              <div className="input-container">
              <div className="input-box">
            <input 
              type="text"
              placeholder="Search for places"
              value={city}
              onChange={handleChange}
            />
            <IoIosSearch className="icon" onClick={getWeather} />
            

            {/* <RiCloseCircleLine className='icon'/> */}
          </div>
{city.length!==0 && inputchange && dropdownopwn && 

          <div className="multipleresult" ref={dropdownelement}>
  
      <div className="allcity">
        <ul>
        {multiplecities.map((city,index)=>{
          if(multiplecities.length>0){
    return(
    
      <li key={index}
      
      onClick={((event)=>{
        event.stopPropagation();
        setCity(`${city.city}, ${city.state}, ${city.country}`) 
        setstate(city.state)
        setcountry(city.country)
        setdropdownopwn(false)
        
      })}>      <a href="#">{city.city + ", " + city.state + ", " + city.country}</a>
    </li>

        )
      }
      })}
        </ul>
      </div>
   
</div>}
</div>
            </div>
            <div className="data">
              {alldata.map((data, index) => {
                return (
                  <div key={index} className="">
                    <p className="title">{data.title}</p>
                    <p className="result">{data.result}</p>
                    <p className="type">{data.type}</p>
                  </div>
                );
              })}
              {/* <div className="wind">
<p>Wind Status</p>
    <p>7.70km/h</p>
    <p>Normal</p>
</div>
<div className='humidity'>
    <p>Humidity</p>
    <p>12%</p>
    <p>Normal</p>
</div>
<div className="environments">
<p>Humidity</p>
    <p>12%</p>
    <p>Normal</p>
</div>
<div className="visibility">
<p>Visibility</p>
    <p>5.3km</p>
    <p>Average</p>
</div>
<div className="air">
<p>Air Quality</p>
    <p>105</p>
    <p>Unhealthy</p>
</div>
<div className="pressure">
<p>Air Quality</p>
    <p>105</p>
    <p>Unhealthy</p>
</div> */}
            </div>
          </div>



        </div>
      </div>
    </div>
  );
};

export default Newdesign;

