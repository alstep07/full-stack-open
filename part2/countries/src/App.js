import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './components/Weather';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [findCountries, setFindCountries] = useState('');
	const filteredCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(findCountries.toLowerCase())
	);

	const handleInputChange = ({ target }) => {
		setFindCountries(target.value);
	};

	const showCountryInfo = ({ target }) => {
		setFindCountries(target.id);
	};

	const countriesComponents = filteredCountries.map((country) => {
		return filteredCountries.length > 1 ? (
			<div key={country.name}>
				<span>{country.name}</span>
				<button id={country.name} onClick={showCountryInfo}>
					show
				</button>
			</div>
		) : (
			<div>
				<h2>{country.name}</h2>
				<p>capital {country.capital}</p>
				<p>population {country.population}</p>
				<h3>languages</h3>
				<ul>
					{country.languages.map((lang) => (
						<li key={lang.name}>{lang.name}</li>
					))}
				</ul>
				<img width='200px' src={country.flag} alt='flag' />
				<Weather capital={country.capital} />
			</div>
		);
	});

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then((response) => setCountries(response.data));
	}, []);






	return filteredCountries.length > 10 ? (
		<div>
			find countries: <input value={findCountries} onChange={handleInputChange} />
			<p>Too many matches, specify another filter</p>
		</div>
	) : (
		<div>
			find countries: <input value={findCountries} onChange={handleInputChange} />
			{countriesComponents}
		</div>
	);
};

export default App;
