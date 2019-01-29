import React from 'react';
import Item from './../../components/CardsItems/CardListItem';

export default props => {
	return (
		<ul className={'list-group list-group-flush'.concat(' ', props.className)}>
			{
				props.list.map(element => <Item active={element.active}>{element.children}</Item>)
			}
		</ul>
	);
}
