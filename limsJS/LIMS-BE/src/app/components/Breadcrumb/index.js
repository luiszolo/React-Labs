import React from 'react';
import Item from './Item';

const Breadcrumb = props => {
	return (
		<nav aria-label="breadcrumb">
			<ol className={"breadcrumb " + props.className}>
				{props.children}
			</ol>
		</nav>
	);
};

export default { 
	Breadcrumb: Breadcrumb,
	BreadcrumbItem: Item
};
