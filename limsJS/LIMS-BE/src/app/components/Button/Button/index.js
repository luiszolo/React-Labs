import React from 'react';

export default props => {

	let cssClasses = 'btn';
	if (props.size == 'large') cssClasses.concat('btn-lg');
	if (props.size == 'small') cssClasses.concat('btn-sm');
	
	switch (props.colorSchema) {
		case 'primary': 
			cssClasses.concat('btn-primary');
		break;

		case 'secondary':
			cssClasses.concat('btn-secondary');
		break;

		case 'success':
			cssClasses.concat('btn-success');
		break;
		
		case 'danger':
			cssClasses.concat('btn-danger');
		break;

		case 'warning':
			cssClasses.concat('btn-warning');
		break;

		case 'info':
			cssClasses.concat('btn-info');
		break;

		case 'light':
			cssClasses.concat('btn-light');
		break;

		case 'dark':
			cssClasses.concat('btn-dark');
		break;

		case 'link':
			cssClasses.concat('btn-link');
		break;
	}

	return ( 
		<button className={cssClasses.concat(props.className)}
			type={props.type}
			id={props.id}
			onClick={props.onClick}>
			{props.children}
		</button>
	);
};
