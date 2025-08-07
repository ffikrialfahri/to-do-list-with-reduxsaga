import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialData } from './redux/actions/dataActions';
import TodoList from './components/TodoList';
import FilterControls from './components/FilterControls';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { loading, locationData, weatherData, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  const renderGreeting = () => {
    if (!locationData || !locationData.city) return '';

    const currentHour = new Date().getHours();
    let greeting = '';

    if (currentHour >= 5 && currentHour < 12) {
      greeting = 'Pagi';
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = 'Siang';
    } else if (currentHour >= 18 && currentHour < 24) {
      greeting = 'Malam';
    } else {
      greeting = 'Dini Hari';
    }

    return `Selamat ${greeting}, ${locationData.city}`;
  };

  const renderWeather = () => {
    if (!weatherData || !weatherData.current_weather) return '';

    const { temperature, weathercode } = weatherData.current_weather;
    let weatherDescription = '';
    // Simplified weather code mapping for demonstration
    if (weathercode === 0) weatherDescription = 'Cerah';
    else if (weathercode > 0 && weathercode < 3) weatherDescription = 'Sebagian Berawan';
    else if (weathercode >= 3 && weathercode < 50) weatherDescription = 'Berawan';
    else if (weathercode >= 50 && weathercode < 60) weatherDescription = 'Gerimis';
    else if (weathercode >= 60 && weathercode < 70) weatherDescription = 'Hujan';
    else if (weathercode >= 70 && weathercode < 80) weatherDescription = 'Salju';
    else if (weathercode >= 80 && weathercode < 90) weatherDescription = 'Badai';
    else weatherDescription = 'Tidak Diketahui';

    return `${weatherDescription}, ${temperature}°C`;
  };

  return (
    <div className="App">
      <header className="App-header">
        {loading && <p>Memuat data...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && locationData && weatherData && (
          <div className="header-info">
            <h1>{renderGreeting()}</h1>
            <p>{renderWeather()}</p>
          </div>
        )}
      </header>
      <main>
        <h2>Daftar Tugas</h2>
        <FilterControls />
        <TodoList />
      </main>
    </div>
  );
}

export default App;