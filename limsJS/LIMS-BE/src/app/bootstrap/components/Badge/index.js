import React from 'react';

export default props => {
	if (props.href) return <a href={props.href}  className={"badge " + props.className}>{props.children}</a>
	else return <span className={"badge " + props.className}>{props.children}</span>
}

