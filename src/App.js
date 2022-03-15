import React, { useState } from 'react';

const api=
{
  key: "2cd096ae17a5551434eaf52e74deeb56",
  base: "https://api.openweathermap.org/data/2.5/"
}
const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}

function App() 
{

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null); 
  const [error, setError] = useState(null); 
  const search=(e) =>
  {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => 
        {
         if(res.status!==200) 
         {
           throw new Error();
         }
         return res.json();
        }        
        )
        .then((result) => {
          setWeather(result);          
          setQuery('');
          setError(null);
          console.log(result);
        })
        .catch((err)=> 
        {
          setQuery('');
          setError("No Such City");
          setWeather(null);
        })
    }
  }
  return (
    <div className={ (weather && (weather.main.temp>17)) ? 'app summer' : 'app'}>
      <main>
        <div className="search-box">
          <input 
          type="text" placeholder="Search City"
          onChange= {(e)=> setQuery(e.target.value)}
          value= {query}
          onKeyPress= {search}
          />
        </div>

        {
          error && 
          <div className="location">
            No such City exist
          </div>
        }

        {
        weather && 
        (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        )         
        }

      </main>
    </div>
  );
}

export default App;
