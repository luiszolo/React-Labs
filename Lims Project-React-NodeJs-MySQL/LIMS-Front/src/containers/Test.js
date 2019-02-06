import Axios from 'axios';
import React from 'react';

import InputField from './../components/InputField';


export default class Test extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			passedOperator: undefined,
			passedAttributes: undefined,
			passedSamples: undefined,
			attributes: Array(this.props.attributes.length).fill(''),
			samples: Array(this.props.samplesLength).fill(''),
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleValidateOperator = this.handleValidateOperator.bind(this);
		this.handleValidateSample = this.handleValidateSample.bind(this);
	}

	handleValidateOperator(){
		if (this.refs.operator.state.input === '') return;
		if(this.refs.operator.state.passRegex) {
			Axios.get(`http://localhost:4000/api/operators/${this.refs.operator.state.input}`)
			.then( res => {
				if (res.data.message) {
					this.refs.operator.setState({
						warningText: res.data.message
					});
				} else {
					this.refs.operator.setState({
						warningText: ''
					});
				}
				
			}).catch( _ => {
				this.refs.operator.setState({
					warningText: 'Server connection time out'
				});
			});
		}

		if (this.refs.operator.state.warningText === '') {
			this.setState({
				passedOperator: true
			});
		} else {
			this.setState({
				passedOperator: false
			});
		}
	}

	handleValidateSample(e){
		const sample = e.target.name
	}

	handleSubmit(e) {

	}

	render(){
		const { 
			attributes,
			name,
			samplesLength
		} = this.props;

		let stateAttributes = Array(attributes.length).fill('');
		let stateSamples = 	Array(samplesLength).fill('');
		let attributeDisplay = undefined
		if (attributes.length > 0 ){
			attributeDisplay = attributes.map((attr, idx )=> {
				
				return(
					<InputField 
						label={ attr.name }
						displayCssClassName='justify-content-center form-inline mb-3'
						type='text' inputCssClassName='col-md-12 col-sm-12 col-lg-5 col-xl-5'
						labelCssClassName='col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
						name={ attr.name } placeholder={ attr.placeholder } required={true}
						regex={'[0-' + attr.length + ']'}
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
							name='operator' placeholder='#####' required={true}
							regex={/[0-99999]/}
							validator={this.handleValidateOperator}
							ref='operator'
						/>
						<div>
							{/* Attributes Fields */}
							{/* /SA-[0-9][0-9]-[0-9][0-9][0-9][0-9][0-9]/ */}
							{ attributeDisplay }
						</div>
						<div>
							<h5 className='text-center m-4'>
								Sample Barcodes
							</h5>
							{
								stateSamples.map((sample, idx) => (
									<InputField
										label={`Sample ${idx+1}:`}
										displayCssClassName='justify-content-center form-inline mb-3'
										type='text' inputCssClassName='col-md-12 col-sm-12 col-lg-5 col-xl-5'
										labelCssClassName='col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
										name={`sample${idx}`} placeholder='#####' required={true}
										regex={/SA-[0-9][0-9]-[0-9][0-9][0-9][0-9][0-9]/}
										// validation={this.handleValidateOperator()} 
										validation={this.handleValidateSample}
									/>
								))
							}
						</div>
						<div className='row justify-content-center'>
							<button type='submit'
								className='btn btn-primary col-md-6 col-sm-10 col-lg-3'
								// disabled={(this.validSamples() && this.validOp() && this.validAttr()) ? false: true}
							/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
