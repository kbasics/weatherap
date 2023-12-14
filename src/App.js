import sunny from './Assets/sunny.jpg'
import cloudy from './Assets/cloudy.jpg'
import Descriptions from './Components/Descriptions';
import { useEffect, useState } from 'react';
import { getFormatedWeatherdata } from './weatherService';


function App() {
const [city, setCity] = useState("London");
const [weather, setWeather] = useState(null);
const [units, setUnits] = useState("metric");
const[bg, setBg] = useState(sunny);

useEffect(()=>{
   const fetchWeatherData = async () =>{
   const data = await getFormatedWeatherdata(city, units);
   setWeather(data);


const thereshold = units === 'metric' ? 20 : 60;
  if(data.temp <= thereshold) setBg(cloudy);
  else setBg(sunny);
 };

fetchWeatherData();
}, [units, city]);

const handleUnitsClick = (e)=>{
const button =e.currentTarget;
const currentUnit = button.innerText.slice(1);

const isCelcius = currentUnit==='C';
button.innerText= isCelcius ? '°F' : '°C';
setUnits (isCelcius ? "metric" : "imperial");
  }

const enterKeyPressed = (e)=>{
  if(e.keyCode ===13){
    setCity(e.currentTarget.value);
    e.currentTarget.blur();
  }
};

return (
    <div className="app" style={{backgroundImage: `url(${bg})`}}>
      <div className='overlay'>
      {
          weather && (
            <div className='container'>
                <div className='section section__inputs'>
                <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder='Enter City'/>
                <button onClick={(e)=> handleUnitsClick(e)}>°F</button>
              </div>
              <div className='section section__temperature'>
                <div className='icon'>
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img src={weather.iconURL} alt=""/>
                  <h3>{weather.description}</h3>
                </div>
                <div className='temperature'>
                  <h1>{`${weather.temp.toFixed()}°${units === 'metric' ? "C" : "F"}`}</h1>
                </div>
              </div>
              <Descriptions weather={weather} units={units}/>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
