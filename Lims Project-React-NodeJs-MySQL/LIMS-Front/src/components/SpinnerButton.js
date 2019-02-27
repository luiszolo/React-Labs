import React from 'react';

export default class SpinnerButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			disabled: undefined,
			loading: undefined,
			resultMessage: undefined,
			pass: undefined
		};
	}

	componentWillMount(){
		this.setState({
			loading: false
		});
	}

	render(){
		let cssClasses = 'col-lg-3 col-sm-10 text-center col-md-6 mt-3'
		
		if (this.state.pass) {
			cssClasses = cssClasses.concat(cssClasses, ' text-success');
		} else {
			cssClasses = cssClasses.replace(' text-success', '');
		}


		return (
			<div>
				<div className='row justify-content-center'>
					<label className={cssClasses}>
						{ this.state.resultMessage !== undefined ? this.state.resultMessage : ''}
					</label>
				</div>
				<div className='row justify-content-center'>
					<button type={ this.props.type }
						name = { this.props.name }
						ref={ this.props.ref}
						disabled={ this.props.disabled ? true : false }
						title={ this.props.disabled ? this.props.titleNoPass : this.props.titlePass }
						className='btn btn-primary col-md-12 col-sm-6 col-lg-3' onClick={ this.props.onClick }>
						{ 
							this.state.loading ? (<div className="lds-spinner">
										<div></div><div></div>
										<div></div><div></div>
										<div></div><div></div>
										<div></div><div></div>
										<div></div><div></div>
										<div></div><div></div>
									</div>) : this.props.text
						}
					</button>
				</div>
			</div>
		);
	}
};
