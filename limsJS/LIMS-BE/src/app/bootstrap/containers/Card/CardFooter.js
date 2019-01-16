import React from 'react';

export default props => {
	return(
		<div className={'card-footer'.concat(' ', props.className)}>
			{props.children}
		</div>
	);
}
