import Axios from 'axios';
import React from 'react';

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
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleValidateOperator = this.handleValidateOperator.bind(this);
		this.handleValidateSample = this.handleValidateSample.bind(this);
	}

	componentWillMount(){
		if (this.props.attributes.length > 0) {
			this.setState({
				attributes: this.props.attributes,
				samples: Array(this.props.samplesLength).fill(undefined)
			});
		} else {
			this.setState({
				attributes: [],
				samples: Array(this.props.samplesLength).fill(undefined),
				passedAttributes: true
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
		// let idx = ref.replace('sample', '') - 1;
		if (this.refs[ref].state.input === '') return;
		if (this.refs[ref].state.passRegex) {
			Axios.get(`http://localhost:4000/api/samples/${this.props.name}/${this.refs[ref].state.input}`)
			.then(res => {
				if (res.data.message) {
					this.refs[ref].setState({
						warningText: res.data.message
					});
				} else {
					this.refs.operator.setState({
						warningText: ''
					});
				}
			}).catch( _ => {
				this.refs[ref].setState({
					warningText: 'Server connection time out'
				});
			});
		}
		// if(this.refs[ref] !== this.refs['sample1']) {
		// 	console.log('pass here')
		// 	if (this.refs[`sample${idx}`].state.input === this.refs[ref].state.input) {
		// 		console.log('please')
		// 		this.refs[ref].setState({
		// 			warningText: 'Something here'
		// 		});
		// 		console.log(this.refs[ref])
		// 		this.setState({
		// 			passedSamples: false
		// 		});
		// 	}
		// }
		// else

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

		this.handleBuildSampleArray();
		console.log(this.state.samples)

		this.refs.submitButton.setState({
			loading: true
		});

		if(this.state.passedAttributes 
			&& this.state.passedOperator 
			&& this.state.passedSamples) {
				console.log('Pass!')
		}
	}

	render(){
		const {
			name
		} = this.props;
		let attributeDisplay = undefined;
		if (this.state.attributes.length > 0 ){
			attributeDisplay = this.state.attributes.map((attr, idx )=> {
				
				return(
					<InputField 
						label={ attr.name.concat(` (${attr.unit})`) }
						displayCssClassName='justify-content-center form-inline mb-3'
						inputCssClassName='col-md-12 col-sm-12 col-lg-5 col-xl-5'
						labelCssClassName='col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
						name={ attr.name } placeholder={ attr.type } required={true}
						regex={ attr.structure }
						ref = { attr.name }
					/>
				);
			});
		}
		
		return(
			<div className='content row justify-content-center'>
				<div className='col-lg-4 col-sm-12 m-4'>
					<h2 className='text-center'>{ name }</h2>
				</div>
				<div className='col-sm-12 col-xl-10'>
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
										regex={/SA-[0-9][0-9]-[0-9][0-9][0-9][0-9][0-9]/} value = { sample }
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
								this.state.passedAttributes && 
								this.state.passedOperator && 
								this.state.passedSamples
							} onClick={ this.handleSubmit }
						/>
					</form>
				</div>
			</div>
		);
	}
}
