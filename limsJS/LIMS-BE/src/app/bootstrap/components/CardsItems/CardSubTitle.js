import React from 'react';

export default props => {
	if (!props.headingSize) props.headingSize = '4';
	switch(props.headingSize) {
		case '1':
		return(
			<h1 className={'card-subtitle'.concat(' ', props.className)}>
				{props.text}
			</h1>
		);
		break;

		case '2':
		return(
			<h2 className={'card-subtitle'.concat(' ', props.className)}>
				{props.text}
			</h2>
		);
		break;

		case '3':
		return(
			<h3 className={'card-subtitle'.concat(' ', props.className)}>
				{props.text}
			</h3>
		);
		break;

		case '4':
		return(
			<h4 className={'card-subtitle'.concat(' ', props.className)}>
				{props.text}
			</h4>
		);
		break;

		case '5':
		return(
			<h5 className={'card-subtitle'.concat(' ', props.className)}>
				{props.text}
			</h5>
		);
		break;

		case '6':
		return(
			<h6 className={'card-subtitle'.concat(' ', props.className)}>
				{props.text}
			</h6>
		);
		break;

		default:
		return(
			<h5 className={'card-subtitle'.concat(' ', props.className)}>
				{props.text}
			</h5>
		);
		break;
	}
};
