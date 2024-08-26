// import './App.css';
// import Inputs from "./Components/Inputs";
// import { useEffect, useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1) // uppercase the first letter of the query (city).
// }
// const App=()=>{
//   const [query, setQuery] = useState({q: "Hyderabad"});
//   const [units, setUnits] = useState('imperial');
//   const [weather, setWeather] = useState(null);
//   const getWeather = async()=> {
//     const  cityName =query.q? query.q :'current location'
//     toast.info(`fetching weather of' ${capitalizeFirstLetter(cityName)}`);
//   }
//   return (
//     <Inputs setQuery={setQuery} setUnits={setUnits} query={query} />
//   );
// }
// export default App;



import TopButtons from "./Components/TopButtons";
import Inputs from "./Components/Inputs";
import TimeAndLocation from "./Components/TimeAndLocation";
import TempAndDetails from "./Components/TempAndDetails";
import Forecast from "./Components/Forecast";
import getFormattedWeatherData from "./Services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}


const App = () => {
  const [query, setQuery] = useState({q: "Kolkata"});
  const [units, setUnits] = useState('imperial');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const cityName = query.q ? query.q : 'current location'
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`);
    await getFormattedWeatherData({...query, units}).then(data => {
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`)
      setWeather(data)
    });
  }

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return 'from-cyan-500 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60;
    if (weather.temp <= threshold) return 'from-cyan-500 to-blue-700'
    return 'from-blue-800 to-green-600'
  }

  return (
    <div className={`mx-auto md:my-10 md:rounded-lg md:w-10/12 pt-5 pb-12 px-14 lg:px-56 shadow-2xl bg-gradient-to-br relative ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} query={query} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <Forecast title='3 hour step forecast' data={weather.hourly} />
          <Forecast title='daily forecast' data={weather.daily} />
        </>
      )}
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" position={"bottom-center"} />
    </div>
  )
}

export default App