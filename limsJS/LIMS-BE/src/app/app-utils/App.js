import axios from 'axios';
import Ip from './../../config/ip';
import React from 'react';


import Navbar from './containers/Navbar';



export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tests: []
		};
	}

	componentWillMount() {
		axios.get(`http://${Ip}/api/tests/?actived=true`)
			.then(res => {
				console.log(res.data.Tests)
				this.setState({
					tests: res.data.Tests
				});
			});
	}

	render() {
		return (
			<div>
				<header className='container-fluid position-fixed text-center bg-info text-white'>
					<h1>LIMS</h1>
				</header>
				<div className='sidebar col-md-2 col-sm-12'>
					<Navbar items={this.state.tests}/>
				</div>
				<div id='content' className='cold-md-10 col-sm-12'>

				</div>
			</div>
		);
	}
} 
