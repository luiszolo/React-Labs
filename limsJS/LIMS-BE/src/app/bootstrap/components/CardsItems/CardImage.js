import React from 'react';

export default props => {
	return (
		<img src={props.src} className={'card-img-top'.concat(' ', props.className)} alt={props.alt}/>
	);
};
