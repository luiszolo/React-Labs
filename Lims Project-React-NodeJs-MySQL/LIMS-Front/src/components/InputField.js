import React from 'react';
import Axios from 'axios';

export default class InputField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blank: undefined,
			input: '',
			focused: undefined,
			passRegex: undefined,
			passValidation: undefined,
			prevPassed: undefined,
			warningText: null
		};
		this.handleMessage = this.handleMessage.bind(this);
		this.handleRegex = this.handleRegex.bind(this);
		this.handleValidation = this.handleValidation.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
	}

	componentWillMount() {
		let aux = (this.props.prevPassed)
		this.setState({
			blank: this.props.canBlank,
			prevPassed: aux
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
			if (!this.props.canBlank && (this.state.input === '' || this.state.input === ' ')) {
				this.setState({
					passRegex: false
				});
				return {
					message: 'Field can\'t be blank'
				};
			} else if (this.props.canBlank && (this.state.input === '' || this.state.input === ' ')) {
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

	handleValidation(regex){
		if(this.props.addToForm) this.props.addToForm();
		if(regex) {
			Axios.get(this.props.validationURL.concat(`${this.state.input}`)).then( res => {
				if (res.data.message) {
					this.setState({
						passValidation: false,
						warningText: res.data.message
					});
				} else {
					this.setState({
						passValidation: true,
						warningText: ''
					});
				}
			}).catch( _ => {
				console.log(_);
				this.setState({
					passValidation: false,
					warningText: 'Server connection timed out'
				});
			});
		} else return false;
	}

	handleUserInput(e) {
		const value = e.target.value;
		this.setState({
			input: value
		});
	}

	handleMessage(e){
		if(this.state.focused === undefined) {
			this.setState({
				focused: true
			});
		}
		else {
			this.setState({
				focused: !this.state.focused
			});
		}
		let regex = this.handleRegex()
		if (regex.message && this.state.focused === true){
			this.setState({
				warningText: regex.message
			});
		} else if(regex) {
			this.setState({
				passRegex: regex,
				warningText: ''
			});
			if (this.props.validationURL && this.state.input !== '') this.handleValidation(regex);
		}

		if(this.state.warningText === '') {
			
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
				onChange={ this.handleUserInput } 
				onBlur={ this.handleMessage } onFocus={ this.handleMessage }
				ref = { name } value={ value } disabled={ !this.state.prevPassed }
				/>
				<label className={ warningCssClassName ? 'text-danger '.concat(warningCssClassName) : 'text-danger'}>
				{ this.state.warningText  }
				</label>
			</div>
		);
	}
};
