import React, { useState, useEffect } from 'react';
import personsService from './services/phonebook';
import Filter from './components/Filter';
import Form from './components/Form';
import Person from './components/Person';
import Notification from './components/Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newSearch, setNewSearch] = useState('');
	const [notification, setNotification] = useState(null);
	const [notificationType, setNotificationType] = useState(null);

	const removePerson = (id) => {
		const personToRemove = persons.find((person) => person.id === id);
		const confirmDelition = window.confirm(`Delete ${personToRemove.name}?`);
		if (confirmDelition) {
			personsService.remove(id);
			setPersons(persons.filter((person) => person.id !== id));
			setNotificationType('note');
			setNotification(`Deleted ${personToRemove.name}`);
			setTimeout(() => {
				setNotification(null);
			}, 3000);
		}
	};

	const updatePersonNumber = () => {
		const confirmUpdate = window.confirm(
			`${newName} is already added to phonebook, replace the old number with new one?`
		);
		if (confirmUpdate) {
			const personToUpdate = persons.find((person) => person.name === newName);
			const newPersonObject = { ...personToUpdate, number: newNumber };
			personsService
				.update(personToUpdate.id, newPersonObject)
				.then((updatedPerson) => {
					setPersons(
						persons.map((person) => (person.id === personToUpdate.id ? updatedPerson : person))
					);
					setNotificationType('note');
					setNotification(`${updatedPerson.name} number updated`);
					setTimeout(() => setNotification(null), 3000);
				})
				.catch(() => {
					setNotification(`${personToUpdate.name} is already deleted`);
					setNotificationType('error');
					setPersons(persons.filter((person) => person.id !== personToUpdate.id));
					setTimeout(() => {
						setNotification(null);
					}, 3000);
				});
		}
	};

	const createNewPerson = () => {
		const nameObject = {
			name: newName,
			number: newNumber
		};
		personsService.create(nameObject).then((response) => {
			setPersons([...persons, response]);
			setNotificationType('note');
			setNotification(`Added ${response.name}`);
			setTimeout(() => {
				setNotification(null);
			}, 3000);
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isPersonExist = persons.map((p) => p.name).includes(newName);
		if (isPersonExist) {
			updatePersonNumber();
		} else {
			createNewPerson();
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

	useEffect(() => {
		personsService.getAll().then((result) => setPersons(result));
	}, []);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification type={notificationType} message={notification} />
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
				<Person handleButtonClick={removePerson} key={person.id} person={person} />
			))}
		</div>
	);
};

export default App;
