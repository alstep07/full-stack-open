import React from 'react';
import Part from './Part';

const Content = ({parts}) => {
	const partsComponents = parts.map(part => {
		return <Part key={part.id} name={part.name} exersises={part.exercises}/>
	})

	return (
		<>{partsComponents}</>
	);
};

export default Content;
