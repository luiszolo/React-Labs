import React from 'react';

export default props => {
	return (
		<a className={'btn ' + props.className} 
		href={!props.href ? '#' : props.href} role="button" 
		id={props.id} onClick={props.onClick}>
			{props.children}
		</a>
	);
};
