import React from 'react';

export default props => {

	return (
		<div className={'card'.concat(' ',props.className)}>
			{props.children}
		</div>
	);
};
