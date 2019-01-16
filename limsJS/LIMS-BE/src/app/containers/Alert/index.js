import React from 'react';

export default props => {
	return (
		<div className={"alert " + props.className} role="alert">
			{props.children}
		</div>
	);
};
