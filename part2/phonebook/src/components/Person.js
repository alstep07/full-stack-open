import React from 'react';

const Person = ({ person, handleButtonClick }) => {
	return (
		<div>
			<p>
				{person.name}: {person.number}
			</p>
			<button onClick={() => handleButtonClick(person.id)}>delete</button>
		</div>
	);
};

export default Person;
