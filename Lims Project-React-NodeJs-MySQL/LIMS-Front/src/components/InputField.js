//     Source Name        	InputField.js
//     Author            	Josue Montaño    
//     Date            		04/17/19
//     Description        	Contains the labels and input field format and does the validation of the data in it.
// 
//     Execution        	
// 
// 	   Modifications
//     Date            Author           Description
//     =========       =============    ===========================================
//     04/17/19        Josue Montaño    Adding the header to the file

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
					message: 'Incorrect syntax. Must be: ' + this.props.placeholder
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
		if(regex) {
			if(this.props.addToForm && !this.props.validationURL) {
				this.setState({
					passValidation: true
				});
				this.props.addToForm();
			} else {
				Axios.get(this.props.validationURL.concat(`${this.state.input}`))
				.then( res => {
					const passedValidation = ()=> {
						if (this.props.testStatus !== undefined){
							const sampleStates = res.data.sample.state.filter((state) => {return state.State.toUpperCase() !== 'new sample'.toUpperCase()})
							const passedTest = sampleStates.filter((state) => {return state.State.toUpperCase() === this.props.testStatus.current.toUpperCase()})
							const requiredTest = sampleStates.filter((state) => {return state.State.toUpperCase() === this.props.testStatus.required.toUpperCase()})

							return !(passedTest.length > 0) && requiredTest.length > 0 ? true : false
						} else {
							return true
						}
					}

					if (res.status === 200 && passedValidation()) {
						this.setState({
							passValidation: true,
							warningText: ''
						});
						if(this.props.addToForm) this.props.addToForm();
					} else {
						this.setState({
							passValidation: false,
							warningText: 'Sample not ready for this test'
						});
					}
					if(this.props.addToForm) this.props.addToForm();
				})
				.catch( err => {
					if (err.response.data.message) {
						this.setState({
							passValidation: false,
							warningText: err.response.data.message
						});
						if(this.props.addToForm) this.props.addToForm();
					}
					else if(err.response.data.sample.state !== undefined){
						if (err.response.data.sample.state.toUpperCase() === this.props.testStatus.required.toUpperCase()) {
							this.setState({
								passValidation: true,
								warningText: ''
							});
							if(this.props.addToForm) this.props.addToForm();
						} else {
							this.setState({
								passValidation: false,
								warningText: 'Sample not ready for this test'
							});
							if(this.props.addToForm) this.props.addToForm();
						}
					} else {
						console.log(err)
					}
				});
			}
		} else return false
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
		} else {
			this.setState({
				focused: !this.state.focused
			});
		}
		
		let regex = this.handleRegex();
		
		if (regex.message && this.state.focused === true){
			this.setState({
				warningText: regex.message
			});
			if(this.props.addToForm) this.props.addToForm();
			return;
		} else if(regex && this.state.focused === true) {
			this.setState({
				passRegex: regex,
				warningText: ''
			});
			if (this.state.input !== '') this.handleValidation(regex);
		} 
		if(this.state.input === '' && this.props.canBlank === true && this.state.focused === true) {
			this.setState({
				passRegex: undefined,
				passValidation:undefined,
				warningText: ''
			});
			if(this.props.addToForm) this.props.addToForm();
			return;
		}
		if(this.props.addToForm) this.props.addToForm();
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
			warningCssClassName,
		} = this.props;

		let validationIcon = <div></div>
		if(this.state.passRegex && this.state.passValidation) {
			validationIcon = <img src='images/correct.jpg' className='correctIcon' alt='correct'/>
		} else if(this.state.passRegex === undefined && this.state.passValidation === undefined){
			validationIcon = <div></div>
		} else {
			validationIcon = <img src='images/wrong.png' className='correctIcon' alt='correct'/>
		}

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
				ref = { name } value={ this.state.input } disabled={ !this.state.prevPassed }
				/>
				{ validationIcon }
				<label className={ warningCssClassName ? 'text-danger '.concat(warningCssClassName) : 'text-danger'}>
				{ this.state.warningText }
				</label>
			</div>
		);
	}
};
