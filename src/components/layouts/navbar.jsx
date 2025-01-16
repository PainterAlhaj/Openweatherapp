import React, { useContext } from 'react'
import { AppBar, Button, Toolbar } from '@mui/material'
import '../../assets/css/navbar.css'
import { FaCloud } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { CiLocationArrow1, CiSearch } from 'react-icons/ci';
import { Contextdata } from '../../view/CreateContext';
const Navbar = ({setdropdownopwn,dropdownopwn,dropdownelement,city,setCity,handleChange,allmatchedcities,
  state,country,
  setstate,setcountry,inputchange,setinputchange,liclick,setliclick,multiplecities }) => {

    const {location,error,getUserLocation}=useContext(Contextdata)
  return (
   <>
   <AppBar className='appbar' sx={{background:'black',boxShadow:'none',position:'relative'}} >
    <Toolbar className='toolbar'>
        
<div className="left">
<div className="logo">
<FaCloud  className='icon'/>
<p>Weather.io</p>
</div>
</div>
<div className="right">
<div className="right-content" style={{
  borderBottomLeftRadius:inputchange?0:'20px',
  borderBottomRightRadius:inputchange?0:'20px',
}}>

<div className="input-box">
<CiSearch className='icon'/>

    <input 
              type="text"
              placeholder="Search for places"
              value={city}
              onChange={handleChange}
            />
    
    </div>

{inputchange && dropdownopwn &&

    <div className="multipleresult" ref={dropdownelement}>
  
  <div className="allcity">
    <ul>
    {
    multiplecities.map((city,index)=>{
      if(multiplecities.length>0){
return(

  <li key={index}
  
  onClick={((event)=>{
    event.stopPropagation();
    setCity(`${city.city}, ${city.state}, ${city.country}`) 
    setstate(city.state)
    setcountry(city.country)
    setliclick(true)
    setdropdownopwn(false)
    setinputchange(false)
    
  })}>      <a href="#">{city.city + ", " + city.state + ", " + city.country}</a>
</li>

    )
  }
  })
  }
    </ul>
  </div>

</div>
}
</div>
    </div>
<div className="last">
{/* <SlLocationPin className='icon'/> */}
<Button disableFocusRipple disableRipple disableElevation variant='contained' className='btn' onClick={()=>{getUserLocation()}}><CiLocationArrow1 className='icon'/> Current Location</Button>
</div>

        </Toolbar>
        </AppBar>
        </>
  )
}

export default Navbar
