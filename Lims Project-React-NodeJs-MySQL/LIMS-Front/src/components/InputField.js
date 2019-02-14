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

	handleValidation(){
		if(this.state.passRegex) {
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
			}).catch( err => {
				this.setState({
					passValidation: false,
					warningText: 'Server connection timed out'
				});
			});
			return true;
		} else return false;
	}

	handleUserInput(e) {
		const value = e.target.value;
		this.setState({
			input: value
		});
	}

	handleMessage(e){
		this.handleUserInput(e);
		if(this.state.focused === undefined) {
			this.setState({
				focused: true
			})
		}
		else {
			this.setState({
				focused: !this.state.focused
			})
		}
		if (this.handleRegex().message && this.state.focused === true){
			this.setState({
				warningText: this.handleRegex().message
			});
		}
		if (this.props.validationURL) this.handleValidation();
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
				onChange={ event => this.handleUserInput(event) } 
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
