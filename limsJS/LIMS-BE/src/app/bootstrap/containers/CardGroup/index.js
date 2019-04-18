import React from 'react';

export default props => {
	let type = '';

	if (props.type=='columns') type = 'card-columns';
	else type = 'card-group';
	return (
		<div className={type.concat(' ',props.className)}>
			{props.children}
		</div>
	);
};
