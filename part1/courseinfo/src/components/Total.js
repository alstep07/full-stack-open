import React from 'react';

const Total = ({parts}) => {
	const totalExercises = parts.reduce((a, b) => a + b.exercises, 0)
	return (
		<>
			<p><b>Total of exercises {totalExercises}</b></p>
		</>
	);
};

export default Total;
