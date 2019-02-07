import React from 'react';

export default class InputField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			passRegex: undefined,
			warningText: null
		};

		this.handleMessage = this.handleMessage.bind(this);
		this.handleRegex = this.handleRegex.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
	}

	handleRegex() {
		let regex = this.props.regex;
		if (typeof(this.props.regex) == 'string') {
			regex = new RegExp(this.props.regex, 'i');
		}
		if (!regex.test(this.state.input)) {
			this.setState({
				passRegex: false
			});
			if (!this.props.canBlank && this.state.input === '') {
				this.setState({
					passRegex: undefined
				});
				return {
					message: 'Field can\'t be blank'
				};
			} else if (this.props.canBlank) {
				return true;
			} else {
				return {
					message: 'Incorrect syntax'
				};
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
		if (this.props.validator) this.props.validator();
		if (this.handleRegex().message){
			this.setState({
				warningText: this.handleRegex().message
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
			label,
			labelCssClassName,
			name,
			placeholder,
			required,
			warningCssClassName
		} = this.props;

		return (
			<div className={
					displayCssClassName ? 'row '.concat(displayCssClassName) : 'row'
				}
			>
				<label className={ labelCssClassName }> { label } </label>
				<input type='text' className={ 
					inputCssClassName ? 'form-control '.concat(inputCssClassName) : 'form-control' 
				} name={ name } placeholder={ placeholder } required={ required } onChange={
					event => this.handleUserInput(event)
				} 
				onBlur={ this.handleMessage } 
				ref = { name }
				/>
				<label className={ warningCssClassName ? 'text-danger '.concat(warningCssClassName) : 'text-danger'}>
				{ this.state.warningText  }
				</label>
			</div>
		);
	}
};
