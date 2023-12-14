const API_KEY = 'bf7620d2411cddb28977d9e952f59f47';

const makeIconURL = (iconID) => `https://openweathermap.org/img/wn/
${iconID}@2x.png`


const getFormatedWeatherdata = async (city, units = 'metric') => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    const {
        weather, 
        main:{temp, feels_like, temp_min, temp_max, pressure, 
            humidity}, 
        wind: {speed},
        sys:{country},
        name,
    }=data;

    const {description, icon}=weather[0];
    return{
        description, iconURL: makeIconURL(icon), temp, feels_like,temp_min,
        temp_max, pressure, humidity, speed, country,
        name,
    };
    
  } catch (error) {
    console.error('Error:', error);
    return null; 
  }
};


  


export { getFormatedWeatherdata};

