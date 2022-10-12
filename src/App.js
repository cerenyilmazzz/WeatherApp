import './index.css';

import React, {useState} from 'react';

import axios from 'axios'
import clearWallpaper from "../src/assets/clear.jpg";
import cloudlyWallpaper from "../src/assets/cloudy.jpg";
import defaultWallpaper from "../src/assets/default.jpg";
import rainWallpaper from "../src/assets/rain.jpg";
import sunsetWallpaper from "../src/assets/sunset.jpg";

function App() {
  const [location, setLocation] = useState('')
  const [data,setData] = useState('');
  const [dataWeather, setDataWeather] = useState('')
  const [wallpaper, setWallpaper] = useState('')
 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=a38468f90414deaf5d8d9c742c7fb8d2`
 
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        switch(response.data.weather[0].main) {
          case 'Clouds':
            return setWallpaper(cloudlyWallpaper);
          case 'Clear':
            return setWallpaper(clearWallpaper);
          case 'Sunset':
            return setWallpaper(sunsetWallpaper);
          case 'Rain':
            return setWallpaper(rainWallpaper);
          default:
            return setWallpaper(defaultWallpaper);
        }
      })
      setLocation('')
      setDataWeather('')
    } 
    console.log(wallpaper)
}
  
return (
  <>
    {data === '' &&
      <div className="app">
        <div className="search">
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text" />
          </div>
      </div>
    }
    {data !== '' &&
      <div className="app" style={{backgroundImage: `url(${wallpaper})`}}>
        <div className="search">
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text" />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    }
  </>
  );
  
}

export default App;


