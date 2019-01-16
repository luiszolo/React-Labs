import React from 'react';

export default props => {
	return(
		<div className={'card-body'.concat(' ', props.className)}>
			{props.children}
		</div>
	);
}
