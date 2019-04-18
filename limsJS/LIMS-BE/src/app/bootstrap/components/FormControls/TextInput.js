import React from 'react';

export default props => {
	if ('textHelpe')

	return (
		<input className={'form-control'.concat(' ', props.className)}
		id={props.id}
		type={props.type}
		placeholder={props.placeholder}
		onChange={props.onChange}
		aria-describedby={props.descriptionId ? props.descriptionId : ''}
		/>
	);
};
