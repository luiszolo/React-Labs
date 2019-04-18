import React from 'react';

export default props => {

	let cssClasses = 'btn';
	switch(props.size) {
		case 'large':
			cssClasses = cssClasses.concat(' ', 'btn-lg');
		break;

		case 'small':
			cssClasses = cssClasses.concat(' ', 'btn-sm');
		break;
	}
	
	// if (props.colorSchema == 'primary') cssClasses = cssClasses + ' btn-primary';

	switch (props.colorSchema) {
		case 'primary': 
			cssClasses = cssClasses.concat(' ', 'btn-outline-primary');
		break;

		case 'secondary':
			cssClasses = cssClasses.concat(' ', 'btn-outline-secondary');
		break;

		case 'success':
			cssClasses = cssClasses.concat(' ', 'btn-outline-success');
		break;
		
		case 'danger':
			cssClasses = cssClasses.concat(' ', 'btn-outline-danger');
		break;

		case 'warning':
			cssClasses = cssClasses.concat(' ', 'btn-outline-warning');
		break;

		case 'info':
			cssClasses = cssClasses.concat(' ', 'btn-outline-info');
		break;

		case 'light':
			cssClasses = cssClasses.concat(' ', 'btn-outline-light');
		break;

		case 'dark':
			cssClasses = cssClasses.concat(' ', 'btn-outline-dark');
		break;

		case 'link':
			cssClasses = cssClasses.concat(' ', 'btn-outline-link');
		break;

		default:
		break;
	}

	return ( 
		<button className={props.className ? cssClasses.concat(' ', props.className) : cssClasses}
			type={props.type}
			id={props.id}
			onClick={props.onClick}>
			{props.children}
		</button>
	);
};
