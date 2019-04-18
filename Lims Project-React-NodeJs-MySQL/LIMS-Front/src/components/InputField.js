import React from 'react';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			passRegex: undefined,
			passValidation: undefined
		};

		this.handleRegex = this.handleRegex.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
		this.handleValidation = this.handleValidation.bind(this);
	}

	handleUserInput(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			input: value
		}, _ => this.handleRegex(e));
	}

	handleRegex(e) {
		const {
			name, 
			value
		} = e.target;

		if (this.props.regex.test(this.state.input)) {
			
		}
	}

	handleValidation(e) {
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
			warningCssClassName,
			warningText
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
				} onBlur={
					''
				}
				/>
				<label className={ warningCssClassName ? 'text-danger '.concat(warningCssClassName) : 'text-danger'}>
				{ warningText }
				</label>
			</div>
		);
	}
}
