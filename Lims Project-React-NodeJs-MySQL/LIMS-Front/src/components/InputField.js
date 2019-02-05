import React from 'react';

export default class InputField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			passRegex: undefined,
			passValidation: undefined,
			warningText: null
		};

		this.handleMessage = this.handleMessage.bind(this);
		this.handleRegex = this.handleRegex.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
	}

	handleRegex() {
		if (typeof(this.props.regex) == 'string') {
			this.props.regex = new RegExp(this.props.regex, 'i');
		}
		if (!this.props.regex.test(this.state.input)) {
			this.setState({
				passRegex: false
			});
			return {
				message: 'Incorrect syntax'
			}
		} else {
			this.setState({
				passRegex: true
			});
			return true;
		}
	}

	handleUserInput(e) {
		const value = e.target.value;
		this.setState({
			input: value
		});
	}

	handleMessage(){
		if (this.handleRegex().message){
			this.setState({
				warningText: this.handleRegex().message
			})
		} else if (this.props.validation().message) {
			this.setState({
				warningText: this.handleValidation().message
			})
		} else {
			this.setState({
				warningText: ''
			})
		}
	}

	render() {
		const {
			displayCssClassName,
			inputCssClassName,
			labelCssClassName,
			name,
			placeholder,
			required,
			type,
			warningCssClassName
		} = this.props;

		return (
			<div className={
					displayCssClassName ? 'row '.concat(displayCssClassName) : 'row'
				}
			>
				<label className={ labelCssClassName }> { name } </label>
				<input type={ type } className={ 
					inputCssClassName ? 'form-control '.concat(inputCssClassName) : 'form-control' 
				} name={ name } placeholder={ placeholder } required={ required } onChange={
					event => this.handleUserInput(event)
				} onBlur={ this.handleMessage } ref = { this.props.ref }
				/>
				<label className={ warningCssClassName ? 'text-danger '.concat(warningCssClassName) : 'text-danger'}>
				{ this.state.warningText || this.props.warningText }
				</label>
			</div>
		);
	}
};
