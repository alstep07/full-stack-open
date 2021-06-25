import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({message}) => {
  return <Alert variant="success">{message}</Alert>
} 

export default Notification;