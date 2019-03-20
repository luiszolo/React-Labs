import Axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import InputField from './../components/InputField';
import SpinnerButton from './../components/SpinnerButton';


export default class Test extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			passedOperator: undefined,
			passedAttributes: undefined,
			passedSamples: undefined,
			passedRepeatedSample: undefined,
			attributes: undefined,
			samples: undefined,
			operator:  undefined
		}

		this.handleAppendAttributeArray = this.handleAppendAttributeArray.bind(this);
		this.handleAppendSamplesArray = this.handleAppendSamplesArray.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleValidateAttribute = this.handleValidateAttribute.bind(this);
		this.handleValidateOperator = this.handleValidateOperator.bind(this);
		this.handleValidateSample = this.handleValidateSample.bind(this);
		this.handleMoveFormData = this.handleMoveFormData.bind(this);
		this.handleMoveSamplesData = this.handleMoveSamplesData.bind(this);
	}

	componentWillMount(){
		if (this.props.attributes.length > 0) {
			this.setState({
				attributes: Array(this.props.attributes.length).fill({}),
				samples: Array(this.props.samplesLength).fill(''),
				passedAttributes: false
			});
		} else {
			this.setState({
				attributes: [],
				samples: Array(this.props.samplesLength).fill(''),
				passedAttributes: true
			});
		}
	}

	handleAppendSamplesArray(sample, pos){
		let samples = this.state.samples.slice();
		samples[pos] = sample
		this.setState({ samples: samples});
	}

	handleMoveSamplesData(idx){
		let firstSamples = this.state.samples.slice(0, idx);
		let lastSamples = this.state.samples.slice(idx + 1, this.state.samples.length);
		let samples = firstSamples.concat(lastSamples)
		samples.push('')
		this.setState({ samples: samples});
	}

	handleAppendAttributeArray(attr, value,  pos) {
		if (attr === '') return;
		let attrs = this.state.attributes.map((s, i) => {
			if(pos === i) {
				if (attr === '') return {};
				else {
					return s = {
						name: attr.name,
						value: value
					};
				}
			}
			else return s;
		});
		this.setState({ attributes: attrs});
	}

	handleMoveFormData(idx){
		if( idx < this.props.samplesLength) {
			if(this.refs[`sample${idx + 2}`] !== undefined && idx !== 0) {
				this.refs[`sample${idx + 1}`].setState({
					input: this.refs[`sample${idx + 2}`].state.input,
					warningText: this.refs[`sample${idx + 2}`].state.warningText,
					prevPassed: this.refs[`sample${idx + 2}`].state.prevPassed,
					passValidation: this.refs[`sample${idx + 2}`].state.passValidation,
					passRegex: this.refs[`sample${idx + 2}`].state.passRegex,
				});
				this.handleMoveFormData(idx + 1);
			} else if( idx === 0) {
				this.refs[`sample${idx + 1}`].setState({
					input: this.refs[`sample${idx + 2}`].state.input,
					warningText: this.refs[`sample${idx + 2}`].state.warningText,
					prevPassed: true,
					passValidation: this.refs[`sample${idx + 2}`].state.passValidation,
					passRegex: this.refs[`sample${idx + 2}`].state.passRegex,
				});
				this.handleMoveFormData(idx + 1);
			} else {
				this.refs[`sample${idx + 1}`].setState({
					input: '',
					warningText: undefined,
					prevPassed: undefined,
					passValidation: undefined,
					passRegex: undefined,
				});
			}
		}
	}

	handleValidateAttribute(attribute, idx) {
		if (this.refs[`attribute${idx + 2}`] === undefined ||  (this.refs[`attribute${idx + 2}`].state.input === '')) {
			this.handleAppendAttributeArray(attribute.props, attribute.state.input, idx);
			this.setState({
				passedAttributes: false
			});
			if (this.refs[`attribute${idx + 2}`] === undefined && 
				attribute.state.input !== '') {
				this.setState({
					passedAttributes: true
				});
			} else {
				this.setState({
					passedAttributes: false
				});
			}
		} else {
			this.handleAppendAttributeArray('', undefined, idx);
			this.setState({
				passedAttributes: false
			});
		}
	}

	handleValidateOperator(operator){
		if (operator.state.input === ''){
			this.setState({
				passedOperator: false,
				operator: operator.state.input
			});
			return;
		}
		this.setState({
			passedOperator: (operator.state.passRegex && operator.state.passValidation),
			operator: operator.state.input
		});
	}

	handleValidateSample(sample, idx){
		if(sample.input === '' && this.refs[`sample${idx + 1}`].state.focused === true) {
			console.log('here')
			this.handleMoveFormData(idx)
			this.handleMoveSamplesData(idx)
			if (idx !== 0) {
				this.setState({
					passedSamples: true,
					passedRepeatedSample: true
				});
			}
			return;
		} else {
			this.handleAppendSamplesArray(sample.input, idx);
			this.setState({
				passedRepeatedSample: true
			});
			// Repeated samples!
			this.state.samples.forEach((value, i)=>{
				if(sample.input === value && sample.input !== ''  && idx >= i && idx !== i){
					this.refs[`sample${idx + 1}`].setState({
						warningText: 'This sample is repeat',
						passValidation: false,
					});
					this.refs[`sample${idx + 2}`].setState({
						prevPassed: false
					})
				}
			});
			if(this.state.passedRepeatedSample === false) return;
			// Validate Regex samples
			this.setState({
				passedSamples: (sample.passRegex),
				passedRepeatedSample: true
			});
		}
		
		// Activate next sample
		if(this.state.passedSamples && this.refs[`sample${idx + 1}`].state.warningText === '') {
			if (this.refs[`sample${idx + 2}`]) {
				this.refs[`sample${idx + 2}`].setState({
					prevPassed: true
				});
			}
		} else {
			if (this.refs[`sample${idx + 2}`]) {
				this.refs[`sample${idx + 2}`].setState({
					prevPassed: false
				});
			}
		}

		this.setState({
			passedSamples: (this.state.passedSamples && sample.passValidation && (this.refs[`sample${idx + 1}`].state.warningText === ''))
		},()=>{console.log(this.state.passedSamples)});
	}

	handleSubmit(e) {
		e.preventDefault();
		
		this.refs.submitButton.setState({
			loading: true
		});
		if( this.state.passedAttributes && this.state.passedOperator && this.state.passedSamples) {
			Axios.post(`http://10.2.1.94:4000/api/test-forms/add`, {
				operator: this.state.operator,
				samples: this.state.samples,
				test: this.props.name,
				attributes: this.state.attributes
			}).then(res => {
				this.refs.submitButton.setState({
					resultMessage: res.data.message,
					pass: res.data.pass
				});
				if (res.data.pass) {
					this.setState({
						passedSamples: false,
						samples: Array(this.props.samplesLength).fill('')
					});
					this.handleMoveFormData(0);
				}
			}).catch( _ => {
				alert('Connection Timed Out');
			});
			ReactDOM.findDOMNode(this.refs[`sample${1}`]).focus();
		}

		this.refs.submitButton.setState({
			loading: false
		});
	}

	render(){
		const {
			name,
		} = this.props;
		let attributeDisplay = undefined;
		if (this.props.attributes.length > 0 ){
			attributeDisplay = this.props.attributes.map((attr, idx )=> {
				return(
					<InputField 
						label={ attr.name + ` (${attr.unit})` }
						displayCssClassName='justify-content-center form-inline mb-3'
						inputCssClassName='col-md-12 col-sm-12 col-lg-5 col-xl-5'
						labelCssClassName='col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
						name={ attr.name } placeholder={ attr.type } canBlank={false}
						regex={ attr.structure } ref = { `attribute${idx + 1}` }  prevPassed={ true }
						warningCssClassName='col-md-12 col-sm-12 col-lg-10 col-xl-10 text-center'
						addToForm = { event => this.handleValidateAttribute(this.refs[`attribute${idx + 1}`], idx)}
					/>
				);
			});
		}
		
		return(
			<div className='row justify-content-center test-component'>
				<div className='col-lg-4 col-sm-12 m-4'>
					<h2 className='text-center'>{ name }</h2>
				</div>
				<div className='col-sm-12 col-xl-10 mb-4'>
					<form>
						{/* Operator field */}
						<InputField
							label='Operator' 
							displayCssClassName='justify-content-center form-inline mb-3'
							type='text' inputCssClassName='col-md-12 col-sm-12 col-lg-5 col-xl-5'
							labelCssClassName='col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
							name='operator' placeholder='#####' canBlank={false}
							validationURL={`http://10.2.1.94:4000/api/operators/`}
							regex={new RegExp('^[0-9]{1,5}$', 'i')}
							ref='operator' addToForm={ event => this.handleValidateOperator(this.refs['operator']) }
							warningCssClassName='col-md-12 col-sm-12 col-lg-10 col-xl-10 text-center'
							prevPassed={ true }
						/>
						<div>
							{/* Attributes Fields */}
							{ attributeDisplay }
						</div>
						<div>
							<h5 className='text-center m-4'>
								Sample Barcodes
							</h5>
							{
								this.state.samples.map((sample, idx) => (
									<InputField
										label={`Sample ${ idx + 1 }:` } canBlank={true}
										displayCssClassName='justify-content-center form-inline mb-3'
										type='text' inputCssClassName='col-md-12 col-sm-12 col-lg-5 col-xl-5'
										labelCssClassName='col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
										name={`sample${ idx + 1}`} placeholder='SA-##-#####'
										regex={/SA-[0-9][0-9]-[0-9][0-9][0-9][0-9][0-9]/}
										validationURL={`http://10.2.1.94:4000/api/samples/${this.props.name}/`}
										ref= {`sample${ idx + 1 }`} warningCssClassName='col-md-12 col-sm-12 col-lg-10 col-xl-10 text-center'
										addToForm={ event => this.handleValidateSample(this.refs[`sample${idx + 1}`].state, idx) } 
										prevPassed={ (idx === 0 ? (_) => {
											this.refs[`sample${ idx + 1}`].setState({
												prevPassed: !this.refs[`sample${ idx + 1}`].state.prevPassed
											});
											return this.refs[`sample${ idx + 1}`].state.prevPassed;
										} : false) }
										
									/>
									
								))
							}
						</div>
						<SpinnerButton
						ref='submitButton'
							name='submitButton'
							text='Save data'
							titlePass='Form is ready'
							titleNoPass='Form not ready'
							type='submit'
							disabled={
								!(this.state.passedAttributes && 
								this.state.passedOperator && 
								this.state.passedSamples &&
								this.state.passedRepeatedSample)
							} 
							onClick={ this.handleSubmit }
						/>
					</form>
				</div>
			</div>
		);
	}
}
