import React, { useState } from 'react';

const Title = ({ text }) => <h2>{text}</h2>;
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;
const Statistic = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);
const Statistics = ({ feedBacks, statistics }) => {
	if (!statistics.allFeeds) {
		return <p>No feedback given</p>;
	} else {
		return (
			<table>
				<Statistic text='good' value={feedBacks.good} />
				<Statistic text='neutral' value={feedBacks.neutral} />
				<Statistic text='bad' value={feedBacks.bad} />
				<Statistic text='all' value={statistics.allFeeds} />
				<Statistic text='average' value={statistics.averageFeeds} />
				<Statistic text='positive' value={statistics.positiveFeeds} />
			</table>
		);
	}
};

const App = () => {
	const [feedBacks, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

	const addFeed = (type) => () => {
		setFeedback({
			...feedBacks,
			[type]: feedBacks[type] + 1,
		});
	};

	const allFeeds = Object.values(feedBacks).reduce((a, b) => a + b, 0);
	const averageFeeds = ((feedBacks.good - feedBacks.bad) / allFeeds || 0).toFixed(2);
	const positiveFeeds = `${((feedBacks.good / allFeeds) * 100 || 0).toFixed(2)} %`;

	return (
		<div>
			<Title text='give feedback' />
			<Button text='good' handleClick={addFeed('good')} />
			<Button text='neutral' handleClick={addFeed('neutral')} />
			<Button text='bad' handleClick={addFeed('bad')} />
			<Title text='statistics' />
			<Statistics feedBacks={feedBacks} statistics={{ allFeeds, averageFeeds, positiveFeeds }} />
		</div>
	);
};

export default App;
