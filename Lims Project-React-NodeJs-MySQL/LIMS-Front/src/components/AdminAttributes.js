import React from 'react';
import Axios from 'axios';

import SpinnerButton from './../components/SpinnerButton';

export default class AdminAtrributes extends React.Component{
    constructor(props){
        super(props);
        this.state={
            availableAttributes:[],
            selectedAttribute: '',
            name:'',
            validName: undefined,
            unit:'',
            validUnit: undefined,
            type:'',
            validType: undefined,
            regex:'',
            validRegex: undefined,
            active: true,
        }

        this.handleSelectAttribute = this.handleSelectAttribute.bind(this);
    }

    componentDidMount(){
        Axios.get('http://localhost:4000/api/attributes/by/?option=name').then(res => {
            console.log(res.data)
            if (res.data === undefined | null) return;
            else this.setState({
                availableAttributes: res.data.attributes
            })
        });
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
        this.state.availableAttributes.forEach((value) => {
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

		Axios.post(`http://localhost:4000/api/attributes/add`,{
            attribute: {
                name: this.state.name,
                unit: this.state.unit,
                placeholder: this.state.type,
                regex: this.state.regex,
                actived: this.state.active
            }
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

    handleActive = () => {
        this.setState({
            active: !this.state.active,
        })
        console.log(!this.state.active)
    }

    handleSelectAttribute(e){
        const attribute = parseInt(e.target.id)

        if (this.state.selectedAttribute === e.target.textContent){
            this.setState({
                selectedAttribute: '',
                name:'',
                validName: undefined,
                unit:'',
                validUnit: undefined,
                type:'',
                validType: undefined,
                regex:'',
                validRegex: undefined,
                
            })
        } else {
            this.state.availableAttributes.forEach((value) => {
                if (value.id === attribute) {
                    this.setState({
                        selectedAttribute: value.name,
                        name: value.name,
                        validName: true,
                        unit: value.unit,
                        validUnit: true,
                        type: value.type,
                        validType: true,
                        regex: value.structure,
                        validRegex: true,
                    })
                }
            })
        }


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
                active
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
                <div className='col-lg-4 col-xl-4 col-md-12 col-sm-12 attributes rounded-right'>
                    <h3 className='header'>Attributes</h3>
                    <ul>
                    {(this.state.availableAttributes.length > 0) ? this.state.availableAttributes.map((attribute) => {
                        
                        if(this.state.selectedAttribute !== attribute.name){
                            return <li id={attribute.id} className='selectable mt-1 p-1 rounded' name={attribute.name} key={attribute.id} onClick={this.handleSelectAttribute} label={attribute.name}>{attribute.name}</li>
                        } else {
                            return <li id={attribute.id} className='selected mt-1 p-1 rounded' name={attribute.name} key={attribute.id} onClick={this.handleSelectAttribute} label={attribute.name}>{attribute.name}</li>
                        }
                    }) : <li className='selectable mt-1 p-1 rounded'>No available attributes</li>}
                    </ul>
                </div>
                <div className='col-lg-8 col-xl-8 col-md-12 col-sm-12'>
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
                                name='attributeName' 
                                placeholder='e.g. Time elapse'
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
                            name='attributeUnit' 
                            placeholder='e.g. C, s'
                            onChange={handleUnitAttribute}
                            value={unit}
                        />
                        <label className={warningLabels}>{messageOp}</label>
                    </div>
                    <div className='row justify-content-center form-inline mb-3'>
                        <label className={regularLabels}>Placeholder:</label>
                        <input
                            type='text'
                            className={
                                validType === undefined ? (inputs) : (
                                    validType === true ? inputs.concat(inputs, " ", "border border-success") : 
                                    inputs.concat(inputs, " ", "border border-danger")
                                )
                            }
                            name='attributeType' 
                            placeholder='e.g. SA-##-#####'
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
                            name='attributeRegex' 
                            placeholder='#####'
                            onChange={handleRegexAttribute}
                            value={regex}
                        />
                        <label className={warningLabels}>{messageOp}</label>
                    </div>
                    <div className='row justify-content-center form-inline mb-3'>
                        <label className='mr-3'>Status:</label>
                        <input
                            type='checkbox'
                            className='form-check-input'
                            name='attributeStatus'
                            checked={active}
                            onChange={this.handleActive}
                        />
                        <label className='form-check-label'>Active</label>
                    </div>
                    <SpinnerButton
                        ref='submitButton'
                        name='submitButton'
                        text={(this.state.selectedAttribute !== '' ) ? 'Modify attribute' : 'Save attribute'}
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

            </div>)
    }
}
