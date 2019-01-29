import React from 'react';

import BaseButton from '../../components/Button/BaseButton';

export default props => {

	let cssClasses = '';
	if (props.type='toolbar') cssClasses = 'btn-toolbar';
	else if (props.vertical='vertical') cssClasses = 'btn-group-vertical';
	else cssClasses = 'btn-group';


	let cssButtonClasses = '';
	switch (props.colorSchema) {
		case 'primary': 
			cssButtonClasses = cssButtonClasses.concat(' ', 'btn-primary');
		break;

		case 'secondary':
			cssButtonClasses = cssButtonClasses.concat(' ', 'btn-secondary');
		break;

		case 'success':
			cssButtonClasses = cssButtonClasses.concat(' ', 'btn-success');
		break;
		
		case 'danger':
			cssButtonClasses = cssButtonClasses.concat(' ', 'btn-danger');
		break;

		case 'warning':
			cssButtonClasses = cssButtonClasses.concat(' ', 'btn-warning');
		break;

		case 'info':
			cssButtonClasses = cssButtonClasses.concat(' ', 'btn-info');
		break;

		case 'light':
			cssButtonClasses = cssButtonClasses.concat(' ', 'btn-light');
		break;

		case 'dark':
			cssButtonClasses = cssButtonClasses.concat(' ', 'btn-dark');
		break;

		case 'link':
			cssButtonClasses = cssButtonClasses.concat(' ', 'btn-link');
		break;

		default:
		break;
	}

	switch(props.size) {
		case 'large':
			cssButtonClasses = cssButtonClasses.concat(' ', 'btn-lg');
		break;

		case 'small':
			cssButtonClasses = cssButtonClasses.concat(' ', 'btn-sm');
		break;
	}

	return (
		<div className={props.className ? cssClasses.concat(' ', props.className) : cssClasses}>
			{
				props.buttons.map( button => <BaseButton className={button.className}
					colorSchema={props.colorSchema}
					type={button.type}
					id={button.id}
					onClick={button.onClick}>
						{button.children}
					</BaseButton>)
			}
		</div>
	);
};
