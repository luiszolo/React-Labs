import React from 'react';
import ReactDOM from 'react-dom';

import ButtonGroup from './containers/ButtonGroup';

ReactDOM.render(
	<ButtonGroup colorSchema='success'
		buttons={[
			{
				id: 'btn1',
				type:'button',
				onClick: (e) => console.log('Hola btn1'),
				children: 'Holis'
			},
			{
				id: 'btn2',
				type:'button',
				onClick: (e) => console.log('Hola btn2'),
				children: 'Holis'
			},
			{
				id: 'btn3',
				type:'button',
				onClick: (e) => console.log('Hola btn3'),
				children: 'Holis'
			}
		]}
	/>, 
	document.getElementById('app')
);
