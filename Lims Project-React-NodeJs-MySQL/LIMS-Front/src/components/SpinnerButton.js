import React from 'react';

export default class SpinnerButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			disabled: undefined,
			hover: true,
			loading: undefined,
			resultMessage: undefined
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
			hover: !this.state.hover
		});
	}

	render(){

		let cssClasses = 'btn btn-primary col-md-6 col-sm-10 col-lg-3'
		return (
			<div className='row justify-content-center'>
				<button type={ this.props.type }
				name = { this.props.name }
				ref={ this.props.ref}
				disabled={ this.state.disabled ? true : false }
				title={ this.state.disabled ? this.props.titleNoPass : this.props.titlePass }
				className={ cssClasses } onClick={ this.props.onClick }
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
				<label className='col-lg-3 col-sm-10 text-center col-md-6  mt-3'>
					{ this.state.resultMessage !== undefined ? this.state.resultMessage : ''}
				</label>
			</div>
		);
	}
};
