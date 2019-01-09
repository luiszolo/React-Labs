import React from 'react';

const Badge = props => {
	if (props.href) return <a href={props.href}  className={"badge " + props.className}>{props.children}</a>
	else return <span className={"badge " + props.className}>{props.children}</span>
}

export default {
	Badge: Badge
}
