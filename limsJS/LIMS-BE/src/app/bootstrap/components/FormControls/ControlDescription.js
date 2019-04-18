import React from 'react';

export default props => {
	return (
		<small id={props.id} className={'form-text'.concat(' ', props.className)}>{props.description}</small>
	);
};
