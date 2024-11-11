import React, { useState } from 'react';
import './Weather.css';

const Weather = () => {
    const Api_url = "https://api.openweathermap.org/data/2.5/weather";
    const Api_id = "60bbd59ec7556e88c0f6b5a2080aebaa";

    const [city, setCity] = useState('');
    const [output, setOutput] = useState(null);
    const [error, setError] = useState('');

    const data_fetch = async (city) => {
        if (!city) {
            setError("Please enter a city name.");
            return;
        }

        try {
            const data = await fetch(`${Api_url}?q=${city}&appid=${Api_id}&units=metric`);

            if (!data.ok) {
                throw new Error("City not found");
            }

            const result = await data.json();
            setOutput(result);
            setError('');

        } catch (err) {
            setError(err.message);
            setOutput(null);
        }
    };

    const visible_data = output ? {
        city: output.name,
        country: output.sys.country,
        temp: output.main.temp,
        longitude: output.coord.lon,
        latitude: output.coord.lat,
        weather: output.weather[0].main
    } : null;

    return (
        <div className="container">
            <h1 className="heading">Weather</h1>
            <div className="input-container">
                <input 
                    type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="input"
                />
                <button 
                    onClick={() => data_fetch(city)} 
                    className="button"
                >
                    Click..
                </button>
            </div>
            <div>
                {error && <h1 className="error">{error}</h1>}
                {visible_data ? (
                    <div className="result">
                        <h1 className="location">{`City: ${visible_data.city}, ${visible_data.country}`}</h1>
                        <h1 className="temp">{`Temperature: ${visible_data.temp} °C`}</h1>
                        <h1>{`Longitude: ${visible_data.longitude}`}</h1>
                        <h1>{`Latitude: ${visible_data.latitude}`}</h1>
                        <h1>{`Weather: ${visible_data.weather}`}</h1>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Weather;
