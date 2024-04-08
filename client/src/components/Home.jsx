import React, { useEffect } from 'react'
import '../css/Home.css'
import axios from 'axios';
const Home=({setRoleProp})=> {
  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:3001/auth/verfiy')
    .then(res=>{
      if(res.data.login)
      {
        setRoleProp(res.data.role)
      }
      else{
        setRoleProp('')
      }
    })
    .catch(err=> console.log(err))
  })
  return (
    <div className='Home'>
        <div className='Home-content'>
            <h1 className='Home-text'>Book Shop</h1>
            <p className='Home-description'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus deserunt quaerat repellendus laudantium porro iste modi incidunt temporibus quos rerum animi nesciunt eveniet mollitia sequi, sunt nam, in omnis maxime id libero!
            </p>
        </div>
        <div className="Home-image"></div>
    </div>
  )
}

export default Home