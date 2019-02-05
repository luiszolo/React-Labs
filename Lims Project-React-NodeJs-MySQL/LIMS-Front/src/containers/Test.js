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
			attributes: [],
			samples: [],
		}

		this.handleValidateOperator = this.handleValidateOperator.bind(this);
	}

	handleValidateOperator(){
		if (this.operatorInput === undefined) return;
		if(this.operatorInput.state.passRegex) {
			Axios.get(`https://10.2.1.94:4000/api/operators/${this.operatorInput.state.input}`)
			.then( res => {
				if (res.data.message) {
					return {
						message: res.data.message
					}
				}
				return true;
			}).catch( _ => {
				return {
					message: 'Server connection error'
				}
			});
		}
	}

	handleValidateSample(){

	}

	render(){
		const { 
			attributes,
			name,
			sampleLength
		} = this.props;

		let stateAttributes = Array(attributes.length).fill('');
		let stateSamples = 	Array(sampleLength).fill('');
		let attributeDisplay = undefined
		if (attributes > 0 ){
			attributeDisplay = attributes.map((attr, idx )=> {
				return(
					<InputField 
						displayCssClassName='justify-content-center form-inline mb-3'
						type='text' inputCssClassName='col-md-12 col-sm-12 col-lg-5 col-xl-5'
						labelCssClassName='col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
						name={ attr.name } placeholder={ attr.placeholder } required={true}
						regex={'[0-' + attr.length + ']'}
						ref = { el => stateAttributes.push(el)}
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
							displayCssClassName='justify-content-center form-inline mb-3'
							type='text' inputCssClassName='col-md-12 col-sm-12 col-lg-5 col-xl-5'
							labelCssClassName='col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
							name='operator' placeholder='#####' required={true}
							regex={/[0-99999]/}
							validation={this.handleValidateOperator}
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
										displayCssClassName='justify-content-center form-inline mb-3'
										type='text' inputCssClassName='col-md-12 col-sm-12 col-lg-5 col-xl-5'
										labelCssClassName='col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
										name={'sample'+idx} placeholder='#####' required={true}
										regex={/SA-[0-9][0-9]-[0-9][0-9][0-9][0-9][0-9]/}
										// validation={this.handleValidateOperator()} 
										validation={this.handleValidateSample}
									/>
								))
							}
						</div>
					</form>
				</div>
			</div>
		);
	}
}
