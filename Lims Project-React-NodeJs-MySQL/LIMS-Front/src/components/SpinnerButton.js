import React from 'react';

export default class SpinnerButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			disabled: undefined,
			loading: undefined
		};
	}

	componentWillMount(){
		this.setState({
			loading: false,
			disabled: this.props.disabled
		});
	}

	render(){
		return (
			<div className='row justify-content-center'>
				<button type={ this.props.type }
				disabled={ this.state.disabled ? false : true }
				title={ this.state.disabled ? this.props.titlePass : this.props.titleNoPass }
				className='btn btn-primary col-md-6 col-sm-10 col-lg-3'
				onClick={ this.props.onClick }>
					{ this.state.loading ? (<div class="lds-spinner">
						<div></div><div></div>
						<div></div><div></div>
						<div></div><div></div>
						<div></div><div></div>
						<div></div><div></div>
						<div></div><div></div>
					</div>) :  this.props.text }
				</button>
			</div>
		);
	}
};
