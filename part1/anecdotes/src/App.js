import React, { useState } from 'react';

const Anecdote = ({ text }) => <p>{text}</p>;
const Title = ({ text }) => <h2>{text}</h2>;
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
	];
	const [selected, setSelected] = useState(0);
	const [anecdotesRatings, setRating] = useState([...anecdotes].fill(0));
	const showNextAnecdote = () => {
		let randomAnecdoteNumber = Math.floor(Math.random() * anecdotes.length);
		setSelected(randomAnecdoteNumber);
	};
	const addVoteToAnecdote = () => {
		let rating = [...anecdotesRatings];
		rating[selected]++;
		setRating(rating);
	};
	const getBestRate = () => anecdotesRatings.indexOf(Math.max(...anecdotesRatings));

	return (
		<>
			<Title text='Anecdote of the day' />
			<Anecdote text={anecdotes[selected]} />
			<Button text='next' handleClick={showNextAnecdote} />
			<Button text='vote' handleClick={addVoteToAnecdote} />
			<Title text='Anecdote with most votes' />
			<Anecdote text={anecdotes[getBestRate()]} />
		</>
	);
};

export default App;
