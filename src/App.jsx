import React, { useContext, useEffect, useRef, useState } from 'react'
import './App.css'
import Design from './components/layouts/Design'
import Newdesign from './components/layouts/newdesign'
import Navbar from './components/layouts/navbar'
import Current from './view/Current'
import Highlights from './view/Highlights'
import Sunrise from './view/Sunrise'
import AdminPanel from './view/AdminPanel'
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
import CreateContext, { Contextdata } from './view/CreateContext'
const App = () => {
  // const [city, setCity] = useState("Mumbai, Maharashtra, IN");
  const [currentcity,setcurrentcity]=useState('')
  const [state, setstate] = useState("");
    const [country, setcountry] = useState("")
    
      const [inputchange,setinputchange]=useState(false)
      const [liclick,setliclick]=useState(false)
  

      const [temp, setTemp] = useState("");
      const [humidity, setHumidity] = useState("");
      const [speed, setSpeed] = useState("");
      const [visibility, setvisibility] = useState("");
      const [sunrise, setSunrise] = useState("");
      const [sunset, setSunset] = useState("");
      const [quality, setQuality] = useState("");
      const [pressure, setpressure] = useState("");
      const [feelslike, setfeelslike] = useState("");


      const [currentDate, setCurrentDate] = useState("");
      const [environment, setenvironment] = useState("");
      // const [envicon, setenvicon] = useState(null);
 const [aqi, setAqi] = useState("");
  const [pollution, setPollution] = useState({});

  const [multiplecities,setmultiplecities]=useState([])
const [dropdownopwn,setdropdownopwn]=useState(false)
const [allmatchedcities,setallmatchedcities]=useState([])
const [longitude,setlongitude]=useState(null)
const [latitude,setlatitude]=useState(null)
const [displaytodaydata,setdisplaytodaydata]=useState([])
const [displayseconddata,setdisplayseconddata]=useState([])
const [displaythirddata,setdisplaythirddata]=useState([])
const [displayfourthdata,setdisplayfourthdata]=useState([])
const [displayfifthdata,setdisplayfifthdata]=useState([])
const [weathercity,setweathercity]=useState('')
const [citynotfound,setcitynotfound]=useState('')

const API_KEY =  import.meta.env.VITE_WEATHER_API_KEY;
    const {location,error,getUserLocation,weatherData,getUserPollution,airPollution,envicon,setenvicon,usercurrentcity,
      city,setCity,  currentsetdisplaytodaydata,
      currentdisplaytodaydata,
      currentdisplayseconddata,
      currentdisplaythirddata,
      currentdisplayfourthdata,
      currentdisplayfifthdata,

    }=useContext(Contextdata)
    if(weatherData){
      console.log("weather data2",weatherData)}
const dropdownelement=useRef(null)

useEffect(()=>{
setTemp(weatherData.temp)
setHumidity(weatherData.humidity);
setSpeed(weatherData.speed);
setvisibility(weatherData.visibility/1000);
setpressure(weatherData.pressure)
setfeelslike(weatherData.feelslike)
setenvironment(weatherData.description);
setSunrise(weatherData.sunrise);
        setSunset(weatherData.sunset);
        if (currentdisplaytodaydata) {
          setdisplaytodaydata(currentdisplaytodaydata);
          setdisplayseconddata(currentdisplayseconddata)
          setdisplaythirddata(currentdisplaythirddata)
          setdisplayfourthdata(currentdisplayfourthdata)
          setdisplayfifthdata(currentdisplayfifthdata)
        }
},[weatherData])

useEffect(()=>{
  console.log("air pollution",airPollution)
  setPollution({
    co: airPollution.co, // Carbon Monoxide
    no2: airPollution.no2,
    so2: airPollution.so2,
    pm2_5: airPollution.pm2_5, // PM2.5
    pm10: airPollution.pm10, // PM10
  });
},[airPollution])



useEffect(() => {
  if (currentdisplaytodaydata) {
    setdisplaytodaydata(currentdisplaytodaydata);
    setdisplayseconddata(currentdisplayseconddata)
    setdisplaythirddata(currentdisplaythirddata)
    setdisplayfourthdata(currentdisplayfourthdata)
    setdisplayfifthdata(currentdisplayfifthdata)
  }
}, [currentdisplaytodaydata]);
const closedropdown = (event) => {
  if (dropdownelement.current && !dropdownelement.current.contains(event.target)) {
    setdropdownopwn(false); 
    console.log(event.target)
  }
};


useEffect(()=>{
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

  const formattedDate = `${date.getDate()} ${months[date.getMonth()]}, ${
    days[date.getDay()]
  }`;
  setCurrentDate(formattedDate);
  document.addEventListener("mousedown",closedropdown)
},[])



 const getWeather = async () => {
    try {

      const encodedCity = encodeURIComponent(city);
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=20&appid=${API_KEY}`
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
        // console.log("Multiple Cities:", cities);
        const lat = data[0].lat;
        const lon = data[0].lon;
setlatitude(data[0].lat)
setlongitude(data[0].lon)
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        // console.log("weather data :",weatherResponse);

        const weatherData = await weatherResponse.json();
        // console.log("weather data :",weatherData);
        setTemp(weatherData.main.temp);
        setHumidity(weatherData.main.humidity);
        setSpeed(weatherData.wind.speed);
        setvisibility(weatherData.visibility/1000);
setpressure(weatherData.main.pressure)
setfeelslike(weatherData.main.feels_like)
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
            setenvicon(<GiSmokeBomb className='icon'/>);
            break;
          case "smoke":
            setenvicon(<GiSmokeBomb className='icon' />);
            break;
          case "clear sky":
            setenvicon(<IoCloudDoneOutline className='icon'/>);
            break;
          case "hot":
            setenvicon(<TiWeatherSunny className='icon' />);
            break;
          case "light rain":
            setenvicon(<IoRainyOutline className='icon'/>);
            break;
          case "broken clouds":
            setenvicon(<FaCloud className='icon'/>);
            break;
          default:
            setenvicon(<IoIosCloudOutline className='icon'/>);
            break;
        }

        const airQualityResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const airQualityData = await airQualityResponse.json();
        const airData = airQualityData.list[0];
        console.log("airdata",airData);
        setAqi(airData.main.aqi); 
        setPollution({
          co: airData.components.co, 
          no2: airData.components.no2,
          so2: airData.components.so2,
          pm2_5: airData.components.pm2_5, 
          pm10: airData.components.pm10, 
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
        const nocities=[{
          
          city: "City",
          state: "Not",
          country: "Found",
          
        }]
        setmultiplecities(nocities)
        
      }
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };
 
const getforecast=async ()=>{



try{
const forecastdata=await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`

)
if(!forecastdata.ok){
  console.log("response is not ok :", forecastdata)
}
else{
  const forecastresult=await forecastdata.json()
console.log("forecast",forecastresult)
console.log(forecastresult.list[0].dt_txt)


// Current Day

const todaysdate = new Date().toISOString().split("T")[0];
console.log("toda",todaysdate)

const currentdayalldata=forecastresult.list.filter((item,index)=>{
  return item.dt_txt.startsWith(todaysdate)
})
const currentdaydata=currentdayalldata.map((item,index)=>{
  const rawTime = item.dt_txt.split(' ')[1]; // Get the time part (HH:mm:ss)
  const formattedTime = new Date(`1970-01-01T${rawTime}Z`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return {
    id: index,
    date: item.dt,
    dt_text: item.dt_txt,
    time: formattedTime,
    temp: item.main.temp,
    desc: item.weather[0].description,
  }
})
setdisplaytodaydata(currentdaydata)
// Next Day

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1); // Getting tomorrow's date

const tomorrowDate = tomorrow.toISOString().split('T')[0];
console.log(tomorrowDate)

const tomorrowData = forecastresult.list.filter(item => item.dt_txt.startsWith(tomorrowDate));

const seconddaydata=tomorrowData.map((item,index)=>{
  const rawTime = item.dt_txt.split(' ')[1]; // Get the time part (HH:mm:ss)
  const formattedTime = new Date(`1970-01-01T${rawTime}Z`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return {
    id: index,
    date: item.dt,
    dt_text: item.dt_txt,
    time: formattedTime,
    temp: item.main.temp,
    desc: item.weather[0].description,

  }
})
setdisplayseconddata(seconddaydata)
console.log("second data :",seconddaydata)

// Third day Data


const thirdDay = new Date();
thirdDay.setDate(thirdDay.getDate() + 3); // Getting third day's date

const thirdDayDate = thirdDay.toISOString().split('T')[0]; // Getting 'YYYY-MM-DD' format

const thirdDayData = forecastresult.list.filter(item => item.dt_txt.startsWith(thirdDayDate));

console.log(thirdDayData);
const thirddaydata=thirdDayData.map((item,index)=>{
  const rawTime = item.dt_txt.split(' ')[1]; // Get the time part (HH:mm:ss)
  const formattedTime = new Date(`1970-01-01T${rawTime}Z`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return {
    id: index,
    date: item.dt,
    dt_text: item.dt_txt,
    time: formattedTime,
    temp: item.main.temp,
    desc: item.weather[0].description,

  }
})
setdisplaythirddata(thirddaydata)
console.log("third data :",thirddaydata)


// four day data
const fourthDay = new Date();
fourthDay.setDate(fourthDay.getDate() + 4); // Getting fourth day's date

const fourthDayDate = fourthDay.toISOString().split('T')[0]; // Getting 'YYYY-MM-DD' format

const fourthDayData = forecastresult.list.filter(item => item.dt_txt.startsWith(fourthDayDate));

console.log(fourthDayData);
const fourthdaydata=fourthDayData.map((item,index)=>{
  const rawTime = item.dt_txt.split(' ')[1]; // Get the time part (HH:mm:ss)
  const formattedTime = new Date(`1970-01-01T${rawTime}Z`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return {
    id: index,
    date: item.dt,
    dt_text: item.dt_txt,
    time: formattedTime,
    temp: item.main.temp,
    desc: item.weather[0].description,

  }
})
setdisplayfourthdata(fourthdaydata)


// fifth day data
const fifthDay = new Date();
fifthDay.setDate(fifthDay.getDate() + 5); // Getting fifth day's date

const fifthDayDate = fifthDay.toISOString().split('T')[0]; // Getting 'YYYY-MM-DD' format

const fifthDayData = forecastresult.list.filter(item => item.dt_txt.startsWith(fifthDayDate));

console.log(fifthDayData);
const fifthdaydata=fifthDayData.map((item,index)=>{
  const rawTime = item.dt_txt.split(' ')[1]; // Get the time part (HH:mm:ss)
  const formattedTime = new Date(`1970-01-01T${rawTime}Z`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return {
    id: index,
    date: item.dt,
    dt_text: item.dt_txt,
    time: formattedTime,
    temp: item.main.temp,
    desc: item.weather[0].description,

  }
})
setdisplayfifthdata(fifthdaydata)




}


}
catch(forecasterror){
  console.log("5 days forecst :",forecasterror)
}
}

useEffect(()=>{
  if(city.length!==0){
    getWeather()
    getforecast()
  }
  
    },[])

  useEffect(()=>{
    if(city.length!==0){
      getWeather()
      getforecast()
    }

   },[city])

const handleChange = (event) => {
    setCity(event.target.value);
setinputchange(true)
setweathercity(event.target.value)


  };
  return (
   <>
<Navbar  setdropdownopwn={setdropdownopwn} dropdownopwn={dropdownopwn} dropdownelement={dropdownelement} city={city} setCity={setCity} handleChange={handleChange} allmatchedcities={allmatchedcities} multiplecities={multiplecities}
state={state}setstate={setstate} country={country} setcountry={setcountry}inputchange={inputchange} setinputchange={setinputchange} liclick={liclick}
setliclick={setliclick}/>
<AdminPanel  displaytodaydata={displaytodaydata} setdisplaytodaydata={setdisplaytodaydata} displayseconddata={displayseconddata} dropdownelement={dropdownelement} aqi={aqi} quality={quality} currentDate={currentDate} city={city} state={state} country={country} temp={temp} humidity={humidity} visibility={visibility} sunrise={sunrise} 
 displaythirddata={displaythirddata}  displayfourthdata={displayfourthdata} displayfifthdata={displayfifthdata} sunset={sunset} envicon={envicon} environment={environment} pressure={pressure} feelslike={feelslike} pollution={pollution} />
  
  
  <CreateContext/>
   </>
  )
}

export default App
