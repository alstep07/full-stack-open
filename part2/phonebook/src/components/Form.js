import React from 'react';

const Form = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				name: <input type='text' value={props.newName} onChange={props.handleNameInputChange} required />
			</div>
			<div>
				number: <input type='tel' value={props.newNumber} onChange={props.handleNumberInputChange} required />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

export default Form;
