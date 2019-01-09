import React from 'react';
import Header from './Header';
import CloseButton from './CloseButton';

const Alert = (props) => {
	return (
		<div className={"alert " + props.className} role="alert">
			{props.children}
		</div>
	);
};

export default {
	Alert: Alert,
	AlertHeader: Header,
	AlertCloseButton: CloseButton
};
