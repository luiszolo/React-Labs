import React from 'react';

export default props => {
	return(
		<div className={'card-img-overlay'.concat(' ', props.className)}>
			{props.children}
		</div>
	);
}
