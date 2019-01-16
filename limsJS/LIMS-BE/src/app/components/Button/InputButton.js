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
			cssClasses = cssClasses.concat(' ', 'btn-primary');
		break;

		case 'secondary':
			cssClasses = cssClasses.concat(' ', 'btn-secondary');
		break;

		case 'success':
			cssClasses = cssClasses.concat(' ', 'btn-success');
		break;
		
		case 'danger':
			cssClasses = cssClasses.concat(' ', 'btn-danger');
		break;

		case 'warning':
			cssClasses = cssClasses.concat(' ', 'btn-warning');
		break;

		case 'info':
			cssClasses = cssClasses.concat(' ', 'btn-info');
		break;

		case 'light':
			cssClasses = cssClasses.concat(' ', 'btn-light');
		break;

		case 'dark':
			cssClasses = cssClasses.concat(' ', 'btn-dark');
		break;

		case 'link':
			cssClasses = cssClasses.concat(' ', 'btn-link');
		break;

		default:
		break;
	}

	return ( 
		<input className={props.className ? cssClasses.concat(' ', props.className) : cssClasses}
			type={props.type}
			id={props.id}
			onClick={props.onClick}
			value={props.children}/>
	);
};
