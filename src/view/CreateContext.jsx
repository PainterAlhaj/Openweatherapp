import React, { createContext, useEffect, useState } from 'react'
import { RiCloseCircleLine } from "react-icons/ri";
import { CiCloudOn } from "react-icons/ci";
import { GiSmokeBomb } from "react-icons/gi";
import { IoRainyOutline } from "react-icons/io5";
import { WiHot } from "react-icons/wi";
import { TiWeatherSunny } from "react-icons/ti";
import { IoCloudDoneOutline } from "react-icons/io5";
import { IoIosCloudOutline } from "react-icons/io";

export const Contextdata=createContext()
export const CreateContext = ({children}) => {
    const API_KEY=import.meta.env.VITE_WEATHER_API_KEY
    const [location,setlocation]=useState(null)
    const [error,seterror]=useState(null)
    const [weatherData, setWeatherData] = useState('');
    const [airPollution,setairPollution]=useState('')
          const [envicon, setenvicon] = useState(null);
          const [forecastData, setForecastData] = useState(null);
          const [usercurrentcity,setusercurrentcity]=useState('')
          const [currentdisplaytodaydata, currentsetdisplaytodaydata] = useState([]);
          const [currentdisplayseconddata, currentsetdisplayseconddata] = useState([]);
          const [currentdisplaythirddata, currentsetdisplaythirddata] = useState([]);
          const [currentdisplayfourthdata, currentsetdisplayfourthdata] = useState([]);
          const [currentdisplayfifthdata, currentsetdisplayfifthdata] = useState([]);
          const [city, setCity] = useState("Mumbai, Maharashtra, IN");
    

    const getUserLocation = () => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log("position :-",position)
              const { latitude, longitude } = position.coords; 
              setlocation({ latitude, longitude });
              seterror(null); 
            },
            (error) => {
              seterror(error.message); 
            }
          );
        } else {
          seterror("Geolocation is not supported by this browser.");
        }
      };
      
const getUserCity=async()=>{
  try{

if(location){

const userResponse=await fetch(
  `https://api.openweathermap.org/geo/1.0/reverse?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}`
  
)
if(!userResponse.ok){
  console.log("City Response is not ok :-",userResponse)
}
else{
  const userCity=await userResponse.json()
console.log("User City :- ",userCity[0].state)
const currentCity=`${userCity[0].name} , ${userCity[0].state} , ${userCity[0].country}`
console.log("Current City :-",currentCity)

setusercurrentcity(currentCity)
setCity(`${userCity[0].name} , ${userCity[0].state} , ${userCity[0].country}`)
}


}


  }
  catch(error){
    console.log("User City Data Was Not Fetch :-",error)
  }
}

      const getUserWeather=async()=>{
        if(location){

try{

const userResponse= await fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=metric`)
console.log("User Response :- ",userResponse)

if(!userResponse.ok){
    console.log("Response is not ok :-",userResponse.ok)
}
else{

const UserData=await userResponse.json()
console.log("User Data :- ",UserData)
switch (UserData.weather[0].description) {
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
const userfullocation={
 temp: UserData.main.temp,
            humidity: UserData.main.humidity,
            speed: UserData.wind.speed,
            visibility: UserData.visibility,
            sunrise: new Date(UserData.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(UserData.sys.sunset * 1000).toLocaleTimeString(),
            description: UserData.weather[0].description,
            pressure: UserData.main.pressure,
            feelslike: UserData.main.feels_like,
            
            // aqi: UserData.air_quality?.aqi || 'N/A',
            // pollution: UserData.air_quality || {}
        
}
if(userfullocation!==null){
    setWeatherData(userfullocation)
    console.log("Weather Data:", userfullocation)

    }
  
}


}
catch(error){
    console.log("User Weather is not Fetched:-" ,error)
}
        }

      }

      const getUserPollution=async()=>{
        if(location){
        try{
const airResponse=await fetch( 
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}`
)
if(!airResponse.ok){
    console.log("Response is not ok :-",airResponse.ok)
}
else{

const airData=await airResponse.json()
console.log("current location air pollution :- ",airData.list[0].components.co)
const airfulldata={
    co: airData.list[0].components.co, // Carbon Monoxide
    no2: airData.list[0].components.no2,
    so2: airData.list[0].components.so2,
    pm2_5: airData.list[0].components.pm2_5, // PM2.5
    pm10: airData.list[0].components.pm10, 
}
if(airData!==null){
    setairPollution(airfulldata)

    }
}
        }
        catch(error){
            console.log("User Air Data is not Fetched:-" ,error)
        }
    }
      }
      const getUserForecast = async () => {
        if (location) {
          try {
            const forecastResponse = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=metric`
            );
            if (forecastResponse.ok) {
              const forecast = await forecastResponse.json();
              setForecastData(forecast.list);
    
              console.log(forecast.list);
    
              // Current Day
    
              const todaysdate = new Date().toISOString().split("T")[0];
              console.log("toda", todaysdate);
    
              const currentdayalldata = forecast.list.filter((item, index) => {
                return item.dt_txt.startsWith(todaysdate);
              });
              const currentdaydata = currentdayalldata.map((item, index) => {
                const rawTime = item.dt_txt.split(" ")[1]; // Get the time part (HH:mm:ss)
                const formattedTime = new Date(
                  `1970-01-01T${rawTime}Z`
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });
                return {
                  id: index,
                  date: item.dt,
                  dt_text: item.dt_txt,
                  time: formattedTime,
                  temp: item.main.temp,
                  desc: item.weather[0].description,
                };
              });
              currentsetdisplaytodaydata(currentdaydata);
              console.log("current -forecast", currentdaydata);
             // Next Day
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Getting tomorrow's date
    
    const tomorrowDate = tomorrow.toISOString().split('T')[0];
    console.log(tomorrowDate)
    
    const tomorrowData = forecast.list.filter(item => item.dt_txt.startsWith(tomorrowDate));
    
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
    currentsetdisplayseconddata(seconddaydata)
    console.log("second data :",seconddaydata)
    
    // Third day Data
    
    
    const thirdDay = new Date();
    thirdDay.setDate(thirdDay.getDate() + 3); // Getting third day's date
    
    const thirdDayDate = thirdDay.toISOString().split('T')[0]; // Getting 'YYYY-MM-DD' format
    
    const thirdDayData = forecast.list.filter(item => item.dt_txt.startsWith(thirdDayDate));
    
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
    currentsetdisplaythirddata(thirddaydata)
    console.log("third data :",thirddaydata)
    
    
    // four day data
    const fourthDay = new Date();
    fourthDay.setDate(fourthDay.getDate() + 4); // Getting fourth day's date
    
    const fourthDayDate = fourthDay.toISOString().split('T')[0]; // Getting 'YYYY-MM-DD' format
    
    const fourthDayData = forecast.list.filter(item => item.dt_txt.startsWith(fourthDayDate));
    
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
    currentsetdisplayfourthdata(fourthdaydata)
    
    
    // fifth day data
    const fifthDay = new Date();
    fifthDay.setDate(fifthDay.getDate() + 5); // Getting fifth day's date
    
    const fifthDayDate = fifthDay.toISOString().split('T')[0]; // Getting 'YYYY-MM-DD' format
    
    const fifthDayData = forecast.list.filter(item => item.dt_txt.startsWith(fifthDayDate));
    
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
    currentsetdisplayfifthdata(fifthdaydata)
    
    
    
    
            }
          } catch (error) {
            console.log("User current  Forecast is not Fetched:-", error);
          }
        }
      };
   useEffect(()=>{
    if (location) {
        getUserWeather();
        getUserPollution()
        getUserCity()
        getUserForecast()
    }
  
   },[location])
    return (
    <>
    <Contextdata.Provider value={{location,error,getUserLocation,weatherData,getUserPollution,airPollution,usercurrentcity,envicon,setenvicon,
       currentsetdisplaytodaydata,
       currentdisplaytodaydata,
       currentdisplayseconddata, currentsetdisplayseconddata,
       currentdisplaythirddata, currentsetdisplaythirddata,
       currentdisplayfourthdata, currentsetdisplayfourthdata,
       currentdisplayfifthdata, currentsetdisplayfifthdata,
       city,setCity
    }}>

{children}

    </Contextdata.Provider>
    
    
    </>
  )
}

export default CreateContext