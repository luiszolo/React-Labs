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
		this.handleClearFormData = this.handleClearFormData.bind(this);
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

	handleClearFormData(sample, idx){
		if( idx < this.props.samplesLength) {
			sample.setState({
				input: undefined,
				warningText: undefined,
				prevPassed: false,
				passValidation: undefined,
				passRegex: undefined,
			});
			this.handleClearFormData(this.refs[`sample${idx + 1}`], idx + 1);
			if( idx === 1) {
				this.setState({
					passedSamples: false,
					passedRepeatedSample: true
				});
			}
		}
	}

	handleAppendSamplesArray(sample, pos){
		let samples = this.state.samples.map((s, i) => {
			if(pos === i) return s = sample;
			else return s;
		});
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

	handleValidateAttribute(attribute, idx) {
		if(attribute.state.input === '') {
			this.handleAppendAttributeArray('',undefined, idx);
			this.setState({
				passedAttributes: false
			});
		}
		else {
			this.handleAppendAttributeArray(attribute.props, attribute.state.input, idx);
			this.setState({
				passedAttributes: true
			});
		}
	}

	handleValidateOperator(){
		const operator = this.refs['operator'].state;
		this.setState({
			passedOperator: (operator.passRegex && operator.passValidation),
			operator: operator.input
		});
	}

	handleValidateSample(sample, idx){
		if(sample.input === '') {
			this.handleAppendSamplesArray('', idx);
			this.handleClearFormData()
			return;
		}
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

		// Set samples in json body
		if(sample.input === '') this.handleAppendSamplesArray('', idx);
		else this.handleAppendSamplesArray(sample.input, idx);

		// Activate next sample
		if(this.state.passedSamples && this.refs[`sample${idx + 1}`].state.warningText === '') {
			this.refs[`sample${idx + 2}`].setState({
				prevPassed: true
			});
		} else {
			this.refs[`sample${idx + 2}`].setState({
				prevPassed: false
			});
		}

		this.setState({
			passedSamples: (this.state.passedSamples && sample.passValidation && (this.refs[`sample${idx + 1}`].state.warningText === ''))
		});
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
					resultMessage: res.data.message
				});
				if (res.data.pass) {
					this.setState({
						passedSamples: false,
						passedAttributes: false,
						attributes: this.props.attributes,
						samples: Array(this.props.samplesLength).fill('')
					});

					ReactDOM.findDOMNode(this.refs['sample1']).focus();
				}
			}).catch( _ => {
				alert('Connection Timed Out');
			});
		}

		this.refs.submitButton.setState({
			loading: false
		});
	}

	render(){
		const {
			name,
			ErrorM,
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
			<div className='content row justify-content-center test-component'>
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
							ref='operator' addToForm={ this.handleValidateOperator }
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
						<SpinnerButton name='submitButton'
							ref='submitButton'
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
