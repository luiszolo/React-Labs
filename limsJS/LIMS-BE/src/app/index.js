import React from 'react';
import ReactDOM from 'react-dom';

import ButtonGroup from './bootstrap/containers/ButtonGroup';

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
				children: <p>Holiwis</p>
			},
			{
				id: 'btn3',
				type:'button',
				onClick: (e) => console.log('Hola btn3'),
				children: <h1>Hello there</h1>
			}
		]}
	/>, 
	document.getElementById('app')
);
