import './App.css';
import { useState, useEffect } from 'react';
import { fetchData } from './api/service';
import background from 'src/assets/bg.jpg';
function App() {
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState('Rabat');

  const getData = async (city) => {
    try {
      const response = await fetchData(city);
      console.log(response);
      setWeather(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(query);
  }, [query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const getCurrentDayAndTime = () => {
    const date = new Date();
    const options = {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };

  const getNextHour = (index, increment, limit) => {
    const date = new Date();
    const currentHour = date.getHours();
    let nextHour = currentHour + index + increment;
    if (nextHour >= limit) {
      nextHour -= limit;
    }
    date.setHours(nextHour, 0); 
    return date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true });
  };
  
  
  const getNextDay = (daysToAdd) => {
    const date = new Date();
    date.setDate(date.getDate() + 1 + daysToAdd); 
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  };
  
  return (
    <>
      { weather && (
      <div className="flex flex-col items-center justify-center w-screen min-h-screen text-gray-700 p-10 bg-cover bg-center" style={{
        backgroundImage: `url(${background})`
      }}>
      
          {/* <input onChange={handleSearch} type="text" className='border-2 border-black'/> */}
          {/* search */}
      
    <div className="flex w-full mx-10 mt-16 rounded bg-white">
        <input className=" w-full border-none bg-transparent px-4 py-1 text-gray-400 outline-none focus:outline-none " type="search" name="search" placeholder="Search for a city" onChange={handleSearch}  />
        <button type="submit" className="m-2 rounded bg-blue-600 px-4 py-2 text-white">
            <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966"  xml:space="preserve" width="512px" height="512px">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
        </button>
    </div>

          {/* end_Search */}
          <div className="w-full max-w-screen-sm bg-white p-10 mt-16 rounded-xl ring-8 ring-white ring-opacity-40">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-6xl font-bold">{weather.current.temp_c && <p>{weather.current.temp_c}°c</p>}</span>
                <span className="font-semibold mt-1 text-gray-500">{weather.location.name}, {weather.location.country}</span>
                <span className="flex space-x-2 items-center"><svg height="20" width="20" viewBox="0 0 32 32" className="fill-current"><path d="M13,30a5.0057,5.0057,0,0,1-5-5h2a3,3,0,1,0,3-3H4V20h9a5,5,0,0,1,0,10Z"></path><path d="M25 25a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H2V15H25a5 5 0 010 10zM21 12H6V10H21a3 3 0 10-3-3H16a5 5 0 115 5z"></path></svg> <span>{weather.current.wind_mph}km/h</span></span>
                <span className="flex space-x-2 items-center"><svg height="20" width="20" viewBox="0 0 32 32" className="fill-current"><path d="M16,24V22a3.2965,3.2965,0,0,0,3-3h2A5.2668,5.2668,0,0,1,16,24Z"></path><path d="M16,28a9.0114,9.0114,0,0,1-9-9,9.9843,9.9843,0,0,1,1.4941-4.9554L15.1528,3.4367a1.04,1.04,0,0,1,1.6944,0l6.6289,10.5564A10.0633,10.0633,0,0,1,25,19,9.0114,9.0114,0,0,1,16,28ZM16,5.8483l-5.7817,9.2079A7.9771,7.9771,0,0,0,9,19a7,7,0,0,0,14,0,8.0615,8.0615,0,0,0-1.248-3.9953Z"></path></svg> <span>{weather.current.humidity}%</span></span>
              </div>
              <img className="w-32 h-32" src={weather.current.condition.icon} alt={weather.current.condition.text} />

            </div>
            
            {/* Display current day and time */}
            <p className="mt-4 text-lg">Current Time: {getCurrentDayAndTime()}</p>
            
            {/* Display hourly forecast */}
            <div className="flex justify-between mt-12">
            {weather.forecast.forecastday[0].hour.slice(0, 4).map((hourData, index) => {
            const nextHour = getNextHour(index, 1, 24); 
            return (
              <div key={index} className="flex flex-col items-center">
                <span className="font-semibold text-lg">{hourData.temp_c}°C</span>
                <img className="w-24 h-24" src={hourData.condition.icon} alt={hourData.condition.text}/>
                <span className="text-xs font-semibold text-gray-400">{hourData.condition.text}</span>
                <span className="font-semibold mt-1 text-sm">{nextHour}</span>
              </div>
            );
          })}
          </div>

          </div>
            {/* Display upcoming days for a week */}
            <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
            {[...Array(7)].map((_, index) => {
            const forecastDay = weather.forecast.forecastday[index];
            if (!forecastDay) return null; 
            return (
              <div key={index} className="flex justify-between items-center">
                <span className="font-semibold text-lg w-1/4">{getNextDay(index)}</span>
                <div className="flex items-center justify-end w-1/4 pr-10">
                <span className="font-semibold">{forecastDay.day.avghumidity}%</span>

              <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 16 20" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                <g transform="matrix(1,0,0,1,-4,-2)">
                  <path d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z" />
                </g>
              </svg>

                </div>
                <img className="w-16 h-16 " src={forecastDay.day.condition.icon} alt={forecastDay.day.condition.text}/>

                <span className="font-semibold text-lg w-1/4 text-right">{forecastDay.day.mintemp_c}° / {forecastDay.day.maxtemp_c}°</span>
              </div>
            );
          })}
           </div>
         
        </div>
      )}
    </>
  );
}

export default App;
