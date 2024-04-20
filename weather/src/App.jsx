import './App.css';
import { useState, useEffect } from 'react';
import { fetchData } from './api/service';
import background from '../src/assets/bg.jpg';
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

  function getNextHour(currentHour, increment, maxHour) {
    let nextHour = currentHour + increment;
    if (nextHour > maxHour) {
      nextHour -= maxHour;
    }
    return nextHour + ' ' + (nextHour >= 12 ? 'PM' : 'AM');
  }
  
  
  
  const getNextDay = (daysToAdd) => {
    const date = new Date();
    date.setDate(date.getDate() + 1 + daysToAdd); 
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  };
  
  return (
    <>
      { weather && (
        <div className="flex flex-col items-center justify-center w-screen min-h-screen text-white p-10 bg-cover bg-center" style={{
            backgroundImage: `url(${background})`
          }}>
      
          {/* <input onChange={handleSearch} type="text" className='border-2 border-black'/> */}
          {/* search */}
      
    <div className="flex w-[40%] mx-10 mt-16 rounded bg-white">
        <input className=" w-full border-none bg-transparent px-4 py-1 text-black outline-none focus:outline-none " type="search" name="search" placeholder="Search for a city" onChange={handleSearch}  />
        <button type="submit" className="m-2 rounded bg-[#f7b801] px-4 py-2 text-white">
            <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966"  xmlSpace="preserve" width="512px" height="512px">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
        </button>
    </div>
          
          {/* end_Search */}
          <div className="w-full max-w-screen-sm bg-purple p-10 mt-16 rounded-lg ring-8 ring-white ring-opacity-40">
                   {/* Display current day and time */}
                   <p className="flex mt-4 text-4xl items-center justify-center font-extrabold">{getCurrentDayAndTime()}</p>
            
            <div className="flex justify-between">
        
              <div className="flex flex-col mt-2">
                <span className="text-6xl font-bold text-white">{weather.current.temp_c && <p>{weather.current.temp_c}°c</p>}</span>
                <span className="font-semibold mt-1 text-white">{weather.location.name}, {weather.location.country}</span>
                <div className='mt-8 flex items-center justify-center gap-8'>
                <span className="flex space-x-2 items-center text-white font-semibold text-xl">
                  <svg className='w-6 h-6' fill="#fff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>wind</title> <path d="M13 11.261c0.038 0 0.070-0.018 0.107-0.021 2.849-0.061 5.136-2.386 5.136-5.244 0-2.897-2.348-5.245-5.245-5.245-2.404 0-4.43 1.617-5.050 3.823l-0.009 0.037-0.012 0.025c-0.115 0.411-0.181 0.883-0.182 1.371v0c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0c0-0.254 0.035-0.499 0.099-0.732l-0.005 0.019 0.006-0.012c0.327-1.18 1.391-2.032 2.655-2.032 1.519 0 2.75 1.231 2.75 2.75s-1.231 2.75-2.75 2.75h-0c-0.019 0-0.034 0.010-0.053 0.011l-10.932-0.011c-0 0-0 0-0 0-0.69 0-1.25 0.56-1.25 1.25s0.559 1.25 1.249 1.25l10.985 0.011zM24.469 4.869c-3.106 0.004-5.723 2.093-6.527 4.942l-0.012 0.048-0.013 0.026c-0.149 0.53-0.235 1.139-0.235 1.768 0 0.002 0 0.003 0 0.005v-0c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0c0-0.002 0-0.005 0-0.007 0-0.393 0.054-0.774 0.155-1.135l-0.007 0.030 0.007-0.013c0.509-1.837 2.166-3.163 4.133-3.163 2.364 0 4.281 1.917 4.281 4.281s-1.917 4.281-4.281 4.281v0c-0.026 0-0.047 0.013-0.072 0.015l-20.34-0.020c-0.689 0.003-1.246 0.561-1.246 1.25s0.557 1.247 1.245 1.25l20.413 0.020c0.053-0.008 0.099-0.017 0.144-0.029l-0.008 0.002c3.685-0.073 6.644-3.078 6.644-6.774 0-3.742-3.033-6.775-6.775-6.775-0.002 0-0.004 0-0.006 0h0zM22.718 19.309c-0.031-0.008-0.070-0.017-0.11-0.023l-0.006-0.001-18.546 0.018c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25c0 0 0 0 0.001 0l18.487-0.018c0.020 0.001 0.037 0.012 0.058 0.012 1.902 0 3.443 1.542 3.443 3.443s-1.542 3.443-3.443 3.443c-1.582 0-2.915-1.067-3.318-2.521l-0.006-0.024-0.007-0.015c-0.074-0.267-0.117-0.573-0.118-0.89v-0c0-0.002 0-0.003 0-0.005 0-0.69-0.559-1.25-1.25-1.25s-1.25 0.559-1.25 1.25c0 0.002 0 0.003 0 0.005v-0c0 0.002 0 0.005 0 0.007 0 0.55 0.075 1.082 0.214 1.587l-0.010-0.042c0.005 0.017 0.016 0.029 0.021 0.045 0.717 2.533 3.009 4.357 5.726 4.357 3.281 0 5.941-2.66 5.941-5.941 0-3.241-2.595-5.876-5.821-5.94l-0.006-0z"></path> </g></svg>
                   <span>{weather.current.wind_mph}<span className=' font-extrabold text-xl'> km/h</span> </span></span>
                <span className="flex space-x-2 items-center text-white font-semibold text-xl">
                <svg  className='w-6 h-6 font-weight-bold' fill="#fff" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 328.611 328.611" xmlSpace="preserve" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="8"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M209.306,50.798c-2.452-3.337-7.147-4.055-10.485-1.602c-3.338,2.453-4.055,7.147-1.603,10.485 c54.576,74.266,66.032,123.541,66.032,151.8c0,27.691-8.272,52.794-23.293,70.685c-17.519,20.866-42.972,31.446-75.651,31.446 c-73.031,0-98.944-55.018-98.944-102.131c0-52.227,28.103-103.234,51.679-136.829c25.858-36.847,52.11-61.415,52.37-61.657 c3.035-2.819,3.209-7.565,0.39-10.6c-2.819-3.034-7.565-3.209-10.599-0.39c-1.11,1.031-27.497,25.698-54.254,63.765 c-24.901,35.428-54.586,89.465-54.586,145.71c0,31.062,9.673,59.599,27.236,80.353c20.361,24.061,50.345,36.779,86.708,36.779 c36.794,0,66.926-12.726,87.139-36.801c17.286-20.588,26.806-49.117,26.806-80.33C278.25,156.216,240.758,93.597,209.306,50.798z"></path> <path d="M198.43,148.146l-95.162,95.162c-2.929,2.929-2.929,7.678,0,10.606c1.465,1.464,3.385,2.197,5.304,2.197 s3.839-0.732,5.304-2.197l95.162-95.162c2.929-2.929,2.929-7.678,0-10.606C206.107,145.217,201.359,145.217,198.43,148.146z"></path> <path d="M191.965,207.899c-13.292,0-24.106,10.814-24.106,24.106s10.814,24.106,24.106,24.106s24.106-10.814,24.106-24.106 S205.257,207.899,191.965,207.899z M191.965,241.111c-5.021,0-9.106-4.085-9.106-9.106s4.085-9.106,9.106-9.106 s9.106,4.085,9.106,9.106S196.986,241.111,191.965,241.111z"></path> <path d="M125.178,194.162c13.292,0,24.106-10.814,24.106-24.106s-10.814-24.106-24.106-24.106s-24.106,10.814-24.106,24.106 S111.886,194.162,125.178,194.162z M125.178,160.949c5.021,0,9.106,4.085,9.106,9.106s-4.085,9.106-9.106,9.106 c-5.021,0-9.106-4.085-9.106-9.106S120.156,160.949,125.178,160.949z"></path> </g> </g></svg>
                 <span>{weather.current.humidity} <span className=' font-extrabold text-xl'>%</span></span></span>
                 </div>
              </div>
              <img className="w-32 h-32" src={weather.current.condition.icon} alt={weather.current.condition.text} />

            </div>
            
           
            {/* Display hourly forecast */}
            <div className="flex justify-between mt-12">
  {weather.forecast.forecastday[0].hour.slice(0, 4).map((hourData, index) => {
    const nextHour = (new Date()).getHours() + index + 1; 
    const formattedHour = nextHour < 10 ? `0${nextHour}` : nextHour; 
    const timeFormat = `${formattedHour} h`;
    const iconUrl = hourData.condition.icon.replace('/night/', '/day/');

    return (
      <div key={index} className="flex flex-col items-center">
        <span className="font-bold mt-1 text-sm">{timeFormat}</span>
        <img className="w-24 h-24" src={iconUrl} alt={hourData.condition.text} />
        <span className="font-bold text-lg">{hourData.temp_c}°C</span>
      </div>
    );
  })}
</div>




          </div>
            {/* Display upcoming days for a week */}
            <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-purple p-10 mt-10 rounded-lg ring-8 ring-white ring-opacity-40">
              <p className='font-extrabold uppercase font-robirto text-2xl'>7 day forecast</p>
            {[...Array(7)].map((_, index) => {
            const forecastDay = weather.forecast.forecastday[index];
            if (!forecastDay) return null; 
            return (
              <div key={index} className="flex justify-between items-center">
              
                <span className="font-bold text-lg w-1/4">{getNextDay(index)}</span>
                <div className="flex items-center justify-end w-1/4 pr-10">
                <span className="font-bold">{forecastDay.day.avghumidity} %</span>

              <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 16 20" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                <g transform="matrix(1,0,0,1,-4,-2)">
                  <path d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z" />
                </g>
              </svg>

                </div>
                <img className="w-16 h-16 " src={forecastDay.day.condition.icon} alt={forecastDay.day.condition.text}/>

                <span className="font-bold text-lg w-1/4 text-right">{forecastDay.day.mintemp_c}° / {forecastDay.day.maxtemp_c}°</span>
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
