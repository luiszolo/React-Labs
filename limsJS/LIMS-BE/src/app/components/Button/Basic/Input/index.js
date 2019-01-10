import React from 'react';

export default props => {
	return ( 
		<input className={'btn ' + props.className}
			type={props.type}
			id={props.id}
			value={props.value}
			onClick={props.onClick}>
			{props.children}
		</input>
	);
};
