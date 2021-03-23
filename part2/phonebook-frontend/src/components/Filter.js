import React from 'react';

const Filter = ({ value, eventHandler }) => {
	return (
		<div>
			filter shown with: <input type='text' value={value} onChange={eventHandler} />
		</div>
	);
};

export default Filter;
