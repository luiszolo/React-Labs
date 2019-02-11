import React from 'react';

export default class InputField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blank: undefined,
			input: '',
			passRegex: undefined,
			warningText: null
		};

		this.handleMessage = this.handleMessage.bind(this);
		this.handleRegex = this.handleRegex.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
	}

	componentWillMount() {
		this.setState({
			blank: this.props.canBlank
		});
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
					passRegex: false
				});
				return {
					message: 'Field can\'t be blank'
				};
			} else if (this.props.canBlank && this.state.input === '') {
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
		if (this.handleRegex().message){
			this.setState({
				warningText: this.handleRegex().message
			});
			if (this.props.validator ) this.props.validator();
		} else {
			if (this.props.validator ) this.props.validator();
			this.setState({
				warningText: ''
			});
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
			value,
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
				} name={ name } placeholder={ placeholder } required={ required } 
				value = { value } onChange={
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
