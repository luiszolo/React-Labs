import React from 'react';

export default props => {
	return(
		<div className={'card-header'.concat(' ', props.className)}>
			{props.children}
		</div>
	);
}
