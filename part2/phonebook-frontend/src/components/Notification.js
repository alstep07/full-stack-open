import React from 'react';

const Notification = ({ message, type }) => {
    const colors = {note: '#22cc44', error: '#cc2244'};
	const notificationStyle = {
		color: colors[type],
		background: '#ddd',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	};

	if (message === null) {
		return null;
	}

	return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
