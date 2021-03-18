import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
	const [weather, setWeather] = useState({});
	const [icon, setIcon] = useState('');
	const api_key = process.env.REACT_APP_API_KEY;

	useEffect(() => {
		axios
			.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
			.then((response) => {
				setWeather(response.data.current);
				setIcon((response.data.current.weather_icons || [])[0]);
			});
	});

	return (
		<div>
			<h2>Weather in {capital}</h2>
			<p>
				<b>Temperature:</b> {weather.temperature} Celcius
			</p>
			<img src={icon} alt='weather' />
			<p>
				<b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
			</p>
		</div>
	);
};

export default Weather;
