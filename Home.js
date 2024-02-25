import React, { useState } from 'react'
import './style.css'
import axios from 'axios'


function Home() {
    const [data,setData] = useState({
      celsius: 10,
      name:'London',
      humidity: 10,
      speed: 2,
      Image:'/Images/cloud.png'

    })
    const [name,setName] = useState('');
    const [error,setError]= useState('');

    const handleClick = () =>{
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=Metric&appid=4c0984c0594b13b15d8d3a750a7aad3f`;
        axios.get(apiUrl)
            .then(res => {
                console.log(res.data);

                let imagePath ='';
                if(res.data.weather[0].main ==="Clouds"){
                    imagePath = "/Images/cloud.png"
                }else if(res.data.weather[0].main === "Clear"){
                    imagePath ="/Images/clear.png"
                }else if(res.data.weather[0].main === "Rain"){
                    imagePath ="/Images/rain.png"
                }else if(res.data.weather[0].main === "Drizzle"){
                    imagePath ="/Images/drizzle.png"
                }else if(res.data.weather[0].main === "Mist"){
                    imagePath ="/Images/mist.png"
                }else{
                    imagePath ="/Images/cloud.png"
                }
                console.log(res.data);

                setData({
                    ...data,
                    celsius: res.data.main.temp,
                    name: res.data.name,
                    humidity: res.data.main.humidity,
                    speed: res.data.wind.speed,
                    Image: imagePath
                });
                setError('');
            })
            .catch(err => {
                if(err.response.status === 404){
                    setError("Invalid City name")
                }else {
                    setError('');
                }
                console.log(err)
                
            });
        }
    }

  return (
    <div className='container'>
     <div className='weather'>
        <div className='search'>
            <input type='text' placeholder='Enter City Name' onChange={ e => setName(e.target.value)}></input>
            <button><img src='/Images/search.png' onClick={handleClick} alt=''></img></button>
        </div>
        <div className='error'>
          <p>{error}</p>
        </div>


        <div className='winfo'>
           <img src={data.Image} alt=''></img>
           <h1>{Math.round(data.celsius)}°C</h1>
           <h2>{data.name}</h2>
           <div className='details'>
            <div className='col'>
                <img src='/Images/humidity.png' alt=''></img>
                <div className='humidity'>
                    <p>{Math.round(data.humidity)}%</p>
                    <p>Humidity</p>
                </div>
                </div>
                <div className='col'>
                <img src='/Images/wind.png' alt=''></img>
                <div className='wind'>
                    <p>{Math.round(data.speed)} km/h</p>
                    <p>wind</p>
                </div>
                </div> 
          </div>
        </div>
     </div>
    </div>
  )
}

export default Home