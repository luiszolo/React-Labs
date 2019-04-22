//     Source Name        	ResponsiveTable.js
//     Author            	Josue Montaño    
//     Date            		04/17/19
//     Description        	Render the data of a sample in a table in the report component.
// 
//     Execution        	
// 
// 	   Modifications
//     Date            Author           Description
//     =========       =============    ===========================================
//     04/17/19        Josue Montaño    Adding the header to the file

import React from 'react';

import './../responsive-table.css';

export default class extends React.Component {
	constructor(props){
		super(props);

		this.fecthHeaders = this.fecthHeaders.bind(this);
		this.fecthRows = this.fecthRows.bind(this);
	}


	fecthHeaders() {
		const {
			cols
		} = this.props;
		if(cols === undefined) return '';
		return (
			<tr>
				{
					Object.values(cols).map(function(col) {
						return (<th>{col}</th>)
					})
				}
			</tr>
		);
	}

	fecthRows() {
		const {
			rows
		} = this.props;
		return ( 
			rows.map(function(row) {
				console.log(row)
				return (<tr>
					{
						Object.values(row).map( function(value, idx){
							return <td data-label={Object.keys(row)[idx]}>{value}</td>
						})
					}

				</tr>)
			})
		);
	}
	
	render(){
		return (<div>
				<h5 className='text-center mt-4'>{this.props.title}</h5>
				<table className={'responsive-table mt-0' + (this.props.className===undefined ? ' ': this.props.className)}>
					<thead>
						{
							this.fecthHeaders()
						}
					</thead>
					<tbody>
						{
							this.fecthRows()
						}
					</tbody>
				</table>
			</div>
		);
	}
};
