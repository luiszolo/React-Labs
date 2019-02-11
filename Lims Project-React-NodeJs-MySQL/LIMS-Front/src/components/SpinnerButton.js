import React from 'react';

export default class SpinnerButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			disabled: undefined,
			hover: true,
			loading: undefined
		};

		this.handleHover = this.handleHover.bind(this);
	}

	componentWillMount(){
		this.setState({
			loading: false,
			disabled: this.props.disabled
		});
	}

	handleHover() {
		this.setState({
			hover: !this.state.hover,
			disabled: this.props.disabled
		});
		console.log(this.state.hover, this.state.disabled)
	}

	render(){
		return (
			<div className='row justify-content-center'>
				<button type={ this.props.type }
				name = { this.props.name }
				ref={ this.props.ref}
				disabled={ this.state.disabled ? true : false }
				title={ this.state.disabled ? this.props.titlePass : this.props.titleNoPass }
				className='btn btn-primary col-md-6 col-sm-10 col-lg-3'
				onClick={ this.props.onClick }
				onMouseEnter = { this.handleHover } onMouseLeave = { this.handleHover }>
				{ this.state.loading ? (<div className="lds-spinner">
								<div></div><div></div>
								<div></div><div></div>
								<div></div><div></div>
								<div></div><div></div>
								<div></div><div></div>
								<div></div><div></div>
							</div>) : this.props.text}
				</button>
			</div>
		);
	}
};
