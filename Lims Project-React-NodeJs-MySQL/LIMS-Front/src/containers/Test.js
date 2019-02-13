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
			attributes: undefined,
			samples: undefined,
		}

		this.handleAppendSamplesArray = this.handleAppendSamplesArray.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleValidateAttribute = this.handleValidateAttribute.bind(this);
		this.handleValidateOperator = this.handleValidateOperator.bind(this);
		this.handleValidateSample = this.handleValidateSample.bind(this);
	}

	componentWillMount(){
		console.log(this.props.attributes)
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
		let samples = this.state.samples.map((s, i) => {
			if(pos === i) return s = sample;
			else return s;
		});
		this.setState({ samples: samples});
	}

	handleAppendAttributeArray(attr, value,  pos) {
		let attrs = this.state.attributes.map((s, i) => {
			if(pos === i) return s = {
				name: attr.name,
				value: value
			}
			else return s;
		});
		this.setState({ attributes: attrs});
	}

	handleValidateAttribute(ref) {
		let idx = ref.replace('attribute','') - 1;
		if(this.refs[ref].state.input === '') this.handleAppendAttributeArray('', idx);
		else this.handleAppendAttributeArray(this.refs[ref].props, this.refs[ref].state.input, idx);
		if (this.refs[ref].state.warningText === '') {
			this.setState({
				passedAttributes: true
			});
		} else {
			this.setState({
				passedAttributes: false
			});
		}
	}

	handleValidateOperator(){
		if (this.refs['operator'].state.passRegex) {
			Axios.get(`http://localhost:4000/api/operators/${this.refs.operator.state.input}`)
			.then( res => {
				if (res.data.message) {
					this.setState({
						passedOperator: false
					});
					this.refs['operator'].setState({
						warningText: res.data.message
					});
				} else {
					this.setState({
						passedOperator: true
					});
					this.refs['operator'].setState({
						warningText: ''
					});
				}
				
			}).catch( _ => {
				this.setState({
					passedOperator: false
				});
				this.refs['operator'].setState({
					warningText: 'Server connection time out'
				});
			});
		}
		if (this.refs['operator'].state.warningText === '') {
			this.setState({
				passedOperator: true
			});
		} else {
			this.setState({
				passedOperator: false
			});
		}

		console.log(this.state.passedOperator);
	}

	handleValidateSample(ref){
		let idx = ref.replace('sample', '') - 1;
		if (this.refs[ref].state.input === '') this.handleAppendSamplesArray('', idx);
		else this.handleAppendSamplesArray(this.refs[ref].state.input, idx);
		if (this.refs[ref].state.passRegex) {
			Axios.get(`http://localhost:4000/api/samples/${this.props.name}/${this.refs[ref].state.input}`)
			.then(res => {
				if (res.data.message) {
					this.refs[ref].setState({
						warningText: res.data.message
					});
				} else {
					this.refs[`sample${idx+2}`].setState({
						warningText: ''
					});
					this.state.samples.forEach((v, i) => {
						if (this.refs[ref].state.input === v && i !== idx) {
							this.refs[`sample${idx+1}`].setState({
								warningText: 'This sample is repeated'
							});
							this.setState({
								passedSamples: false
							});
						}
					});
				}
			}).catch( _ => {
				this.refs[ref].setState({
					warningText: 'Server connection time out'
				});
			});
		}

		if (this.refs[ref].state.warningText === '') {
			this.setState({
				passedSamples: true
			});
		} else {
			this.setState({
				passedSamples: false
			});
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		const operator = this.refs['operator'].state.input;

		this.refs.submitButton.setState({
			loading: true
		});
		if( this.state.passedAttributes && this.state.passedOperator 
			&& this.state.passedSamples) {
			
			console.log('Pass!');
			Axios.post(`http://localhost:4000/api/test-forms/add`, {
				operator: operator,
				samples: this.state.samples,
				test: this.props.name,
				attributes: this.state.attributes
			}).then(res => {
				console.log(res.data)
				this.refs.submitButton.setState({
					resultMessage: res.data.message
				});
				if(res.data.pass) { 
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
			})
		}

		this.refs.submitButton.setState({
			loading: false
		});
	}

	render(){
		const {
			name
		} = this.props;
		let attributeDisplay = undefined;
		if (this.props.attributes.length > 0 ){
			console.log(this.props.attributes)
			attributeDisplay = this.props.attributes.map((attr, idx )=> {
				return(
					<InputField 
						label={ attr.name + ` (${attr.unit})` }
						displayCssClassName='justify-content-center form-inline mb-3'
						inputCssClassName='col-md-12 col-sm-12 col-lg-5 col-xl-5'
						labelCssClassName='col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
						name={ attr.name } placeholder={ attr.type } required={true}
						regex={ attr.structure } validator={ _ => { this.handleValidateAttribute(`attribute${ idx + 1}`); } }
						ref = { `attribute${idx + 1}` }
					/>
				);
			});
		}
		
		return(
			<div className='content row justify-content-center'>
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
							regex={new RegExp('^[0-9]{1,5}$', 'i')}
							validator={this.handleValidateOperator}
							ref='operator'
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
										name={`sample${ idx + 1}`} placeholder='SA-##-#####' required={true}
										regex={/SA-[0-9][0-9]-[0-9][0-9][0-9][0-9][0-9]/}
										validator={_ => this.handleValidateSample(`sample${ idx + 1}`)}
										ref= {`sample${ idx + 1 }`}
									/>
								))
							}
						</div>
						<SpinnerButton name='submitButton'
							ref='submitButton'
							text='Save data'
							titlePass='Form is ready'
							titleNoPass='Form not ready'
							type='submit'disabled={
								!(this.state.passedAttributes && 
								this.state.passedOperator && 
								this.state.passedSamples)
							} onClick={ this.handleSubmit }
						/>
					</form>
				</div>
			</div>
		);
	}
}
