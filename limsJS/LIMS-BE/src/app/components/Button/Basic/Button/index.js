import React from 'react';

export default props => {

	if (props.size == 'large') props.className.concat('btn-lg');
	if (props.size == 'small') props.className.concat('btn-sm');

	return ( 
		<button className={'btn ' + props.className}
			type={props.type}
			id={props.id}
			onClick={props.onClick}>
			{props.children}
		</button>
	);
};
