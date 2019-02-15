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
			warningText: null
		};
		this.handleMessage = this.handleMessage.bind(this);
		this.handleRegex = this.handleRegex.bind(this);
		this.handleValidation = this.handleValidation.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
	}

	componentWillMount() {
		this.setState({
			blank: this.props.canBlank
		});
	}

	handleRegex() {
		console.log(this.state.input)
		let regex = this.props.regex;
		if (typeof(this.props.regex) == 'string') {
			regex = new RegExp(this.props.regex, 'i');
		}
		console.log('Regex test', regex.test(this.state.input))
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
			console.log('Regex state', this.state.passRegex)
			return true;
		}
	}

	handleValidation(regex){
		console.log('try to execute adding to form!')
		if(this.props.addToForm) this.props.addToForm();
		console.log(regex)
		if(regex) {
			console.log('Validate existing Operator or not')
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
			console.log('pass validation or not!', this.state.passValidation)
		} else return false;
	}

	handleUserInput(e) {
		const value = e.target.value;
		this.setState({
			input: value
		});
	}

	handleMessage(e){
		console.log(this.state.input)
		if(this.state.focused === undefined) {
			console.log('Convert undefined to True')
			this.setState({
				focused: true
			});
		}
		else {
			console.log('Convert negative Focused')
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
			console.log('Empty Text')
			this.setState({
				passRegex: regex,
				warningText: ''
			});
			if (this.props.validationURL) this.handleValidation(regex);
		}
		console.log('Go to validation handler')
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
				} name={ name } placeholder={ placeholder } required={ required } 
				onChange={ this.handleUserInput } 
				onBlur={ this.handleMessage } onFocus={ this.handleMessage }
				ref = { name }
				/>
				<label className={ warningCssClassName ? 'text-danger '.concat(warningCssClassName) : 'text-danger'}>
				{ this.state.warningText  }
				</label>
			</div>
		);
	}
};
