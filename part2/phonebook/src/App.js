import React, { useState } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Person from './components/Person';

const App = () => {
	const [persons, setPersons] = useState([
		{ id: 0, name: 'Arto Hellas', number: '040-123456' },
		{ id: 1, name: 'Ada Lovelace', number: '39-44-5323523' },
		{ id: 2, name: 'Dan Abramov', number: '12-43-234345' },
		{ id: 3, name: 'Mary Poppendieck', number: '39-23-6423122' }
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newSearch, setNewSearch] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		if (persons.map((p) => p.name).includes(newName)) {
			alert(`${newName} is already added to phonebook`);
		} else {
			const nameObject = {
				name: newName,
				number: newNumber,
				id: persons.length + 1
			};
			setPersons([...persons, nameObject]);
		}
		setNewName('');
		setNewNumber('');
	};
	const handleNameInputChange = ({ target }) => {
		setNewName(target.value);
	};
	const handleNumberInputChange = ({ target }) => {
		setNewNumber(target.value);
	};
	const handleSearchInputChange = ({ target }) => {
		setNewSearch(target.value);
	};
	const personsToShow = persons.filter((person) =>
		person.name.toLowerCase().includes(newSearch.toLowerCase())
	);
	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={newSearch} eventHandler={handleSearchInputChange} />
			<h2>add a new</h2>
			<Form
				handleSubmit={handleSubmit}
				handleNameInputChange={handleNameInputChange}
				handleNumberInputChange={handleNumberInputChange}
				newName={newName}
				newNumber={newNumber}
			/>
			<h2>Numbers</h2>
			{personsToShow.map((person) => (
				<Person key={person.id} name={person.name} number={person.number} />
			))}
		</div>
	);
};

export default App;
