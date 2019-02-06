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
		if (typeof(this.props.regex) == 'string') {
			this.props.regex = new RegExp(this.props.regex, 'i');
		}
		if (!this.props.regex.test(this.state.input)) {
			this.setState({
				passRegex: false
			});
			if (this.state.input === '') {
				this.setState({
					passRegex: undefined
				});
				return {
					message: 'Field can\'t be blank'
				};
			}
			return {
				message: 'Incorrect syntax'
			};
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
		this.props.validator();
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
			type,
			warningCssClassName
		} = this.props;

		return (
			<div className={
					displayCssClassName ? 'row '.concat(displayCssClassName) : 'row'
				}
			>
				<label className={ labelCssClassName }> { label } </label>
				<input type={ type } className={ 
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
