import React from 'react';
import Item from '../../components/BreadcrumbItems/Item';

export default props => {
	return (
		<nav aria-label="breadcrumb">
			<ol className={"breadcrumb " + props.className}>
				{
					props.list.map(element => <Item active={element.active}>{element.children}</Item>)
				}
			</ol>
		</nav>
	);
};


