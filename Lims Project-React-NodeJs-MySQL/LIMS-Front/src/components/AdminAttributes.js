import React from 'react';
import axios from 'axios';

import SpinnerButton from './../components/SpinnerButton';

export default class AdminAtrributes extends React.Component{
    constructor(props){
        super(props);
        this.state={
            status:[],
            name:'',
            validName: undefined,
            unit:'',
            validUnit: undefined,
            type:'',
            validType: undefined,
            regex:'',
            validRegex: undefined,
        }
    }

    componentDidMount(){
        const url= "http://10.2.1.94:4000/api/attributes";
        fetch(url,{
            method : "GET"
        }).then(Response => Response.json()).then(res =>{
            this.setState({status:res.Attributes})
        } 
            )
    }

    handleNameAttribute = (e) => {
        const name = e.target.value
        this.setState({
            name: name,
            messageAPI:""
        })
        if(name.length >= 1) {
            this.setState({
                validName: true
            })
        } else {
            this.setState({
                validName: false
            })
        }
        this.state.status.forEach((value) => {
            if(value.name === name) {
                this.setState({
                    validName: false
                })
            }
        })

    }

    handleUnitAttribute = (e) => {
        const unit = e.target.value

        this.setState({
            unit: unit,
            messageAPI:""
        })
        if(unit.length >= 1) {
            this.setState({
                validUnit: true,
            })
        } else if(unit === '') {
            this.setState({
                validUnit: false,
            })
        }
    }

    handleRegexAttribute = (e) => {
        const regex = e.target.value

        this.setState({
            regex: regex,
            messageAPI:""
        })
        if(regex.length >= 1) {
            this.setState({
                validRegex: true,
            })
        } else if(regex === '') {
            this.setState({
                validRegex: false,
            })
        }
    }

    handleTypeAttribute = (e) => {
        const type = e.target.value

        this.setState({
            type: type,
            messageAPI:""
        })
        if(type.length >= 1) {
            this.setState({
                validType: true,
            })
        } else if(type === '') {
            this.setState({
                validType: false,
            })
        }
    }

    handleSubmitAttribute = event => {
        event.preventDefault();

		axios.post(`http://10.2.1.94:4000/api/Attributes/add`,{
            name: this.state.name,
            unit: this.state.unit,
            type: this.state.type,
            regex: this.state.regex
		})
		.then( res => {
			if (res.data.message === 'Insertion successful') {
                this.refs.submitButton.setState({
                    resultMessage: res.data.message,
                    pass: res.data.pass
				});
				this.setState({
                    name:'',
                    validName: undefined,
                    unit:'',
                    validUnit: undefined,
                    type:'',
                    validType: undefined,
                    regex:'',
                    validRegex: undefined,
                })
                this.componentDidMount()
			}
			})
		.catch( () => {
			alert('Conection Timed Out');
		});
    }

    render(){
        const {
            handleNameAttribute,
            handleSubmitAttribute,
            handleUnitAttribute,
            handleRegexAttribute,
            handleTypeAttribute,
            state: {
                messageOp,
                name,
                validName,
                unit,
                validUnit,
                type,
                validType,
                regex,
                validRegex,
            }
        } = this;
    
        const regularLabels = 'col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
        const inputs = 'col-md-12 col-sm-12 col-lg-5 col-xl-5 form-control'
        const warningLabels = 'col-md-12 col-sm-12 col-lg-10 col-xl-10 text-danger text-center'

        return(
            <div className='content row justify-content-center'>
                <div className='col-sm-12 m-4'>
                    <h1 className='text-center'>Add attributes</h1>
                </div>
                <div className='col-lg-6 col-xl-6 col-md-12 col-sm-12'>
                    <form onSubmit={handleSubmitAttribute}>
                        <div className='row justify-content-center form-inline mb-3'>
                            <label className={regularLabels}>Name:</label>
                            <input
                                type='text'
                                className={
                                    validName === undefined ? (inputs) : (
                                        validName === true ? inputs.concat(inputs, " ", "border border-success") : 
                                        inputs.concat(inputs, " ", "border border-danger")
                                    )
                                }
                                name='Status' 
                                placeholder='#####'
                                onChange={handleNameAttribute}
                                value={name}
                            />
                            <label className={warningLabels}>{messageOp}</label>
                        </div>
                        <div className='row justify-content-center form-inline mb-3'>
                        <label className={regularLabels}>Unit:</label>
                        <input
                            type='text'
                            className={
                                validUnit === undefined ? (inputs) : (
                                    validUnit === true ? inputs.concat(inputs, " ", "border border-success") : 
                                    inputs.concat(inputs, " ", "border border-danger")
                                )
                            }
                            name='Status' 
                            placeholder='#####'
                            onChange={handleUnitAttribute}
                            value={unit}
                        />
                        <label className={warningLabels}>{messageOp}</label>
                    </div>
                    <div className='row justify-content-center form-inline mb-3'>
                        <label className={regularLabels}>Type:</label>
                        <input
                            type='text'
                            className={
                                validType === undefined ? (inputs) : (
                                    validType === true ? inputs.concat(inputs, " ", "border border-success") : 
                                    inputs.concat(inputs, " ", "border border-danger")
                                )
                            }
                            name='Status' 
                            placeholder='#####'
                            onChange={handleTypeAttribute}
                            value={type}
                        />
                        <label className={warningLabels}>{messageOp}</label>
                    </div>
                    <div className='row justify-content-center form-inline mb-3'>
                        <label className={regularLabels}>Regex:</label>
                        <input
                            type='text'
                            className={
                                validRegex === undefined ? (inputs) : (
                                    validRegex === true ? inputs.concat(inputs, " ", "border border-success") : 
                                    inputs.concat(inputs, " ", "border border-danger")
                                )
                            }
                            name='Status' 
                            placeholder='#####'
                            onChange={handleRegexAttribute}
                            value={regex}
                        />
                        <label className={warningLabels}>{messageOp}</label>
                    </div>
                        <SpinnerButton
                            ref='submitButton'
                            name='submitButton'
                            text='Save attribute'
                            titlePass='Form is ready'
                            titleNoPass='Form not ready'
                            type='submit'
                            disabled={
                                !(validName && validUnit && validType && validRegex)
                            } 
                            onClick={ this.handleSubmitAttribute }
                            />
                    </form>
                </div>
                <div className='col-lg-6 col-xl-6 col-md-12 col-sm-12 status rounded-right'>
                    <h3 className='header'>Available attributes</h3>
                    <ul>
                        {this.state.status.map((value, idx)=>{
                                return (<li key={idx} className='selectable mt-1 p-1 rounded'>{value.name}</li>)
                            })
                        }
                    </ul>
                </div>
            </div>)
    }
}
