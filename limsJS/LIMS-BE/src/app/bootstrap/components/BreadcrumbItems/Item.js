import React from 'react';

export default props => {
	return (
		<li className={"breadcrumb-item " + (props.active ? 'active' : '')}>
			{props.children}
		</li>
	);
}
