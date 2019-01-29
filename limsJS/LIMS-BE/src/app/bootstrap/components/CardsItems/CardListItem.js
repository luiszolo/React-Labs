import React from 'react';

export default props => {
	return (
		<li className={'list-group-item'.concat(' ', props.className)}>
			{props.children}
		</li>
	);
}
