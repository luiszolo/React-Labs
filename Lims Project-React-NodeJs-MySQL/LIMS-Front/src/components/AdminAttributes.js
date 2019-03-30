import React from 'react';
import axios from 'axios';

import SpinnerButton from './../components/SpinnerButton';

export default class AdminAtrributes extends React.Component{
    constructor(props){
        super(props);

        this.state={
            availableAttributes:[],
            selectedAttribute: '',
            name:'',
            warningMessage: '',
            validName: undefined,
            unit:'',
            placeholder:'',
            regex:'',
            active: true,
        }

        this.handleSelectAttribute = this.handleSelectAttribute.bind(this);
        this.handleNameAttribute = this.handleNameAttribute.bind(this);
        this.handleUnitAttribute = this.handleUnitAttribute.bind(this);
        this.handleRegexAttribute = this.handleRegexAttribute.bind(this);
        this.handlePlaceholderAttribute = this.handlePlaceholderAttribute.bind(this);
        this.handleSubmitAttribute = this.handleSubmitAttribute.bind(this);
        this.handleActive = this.handleActive.bind(this);

    }

    componentDidMount(){
        const url= "http://10.2.1.94:4000/api/attributes/by";

        axios.get(url).then((res) =>{
            console.log(res.data)
            this.setState({availableAttributes: res.data.attributes})
        })
    }

    handleNameAttribute(e){
        const attributeName = e.target.value

        this.setState({
            name: attributeName
        })
        if(attributeName.trim() !== '' && attributeName.length > 0){
            this.setState({
                validName: true,
                warningMessage: ''
            })
        } else {
            this.setState({
                validName: false,
                warningMessage: 'Name can\'t be blank'
            })
        }
        this.state.availableAttributes.forEach((value)=>{
            if(value.name === attributeName){
                this.setState({
                    validName: false,
                    warningMessage: 'The attribute already exists'
                })
            }
        })
    }

    handleUnitAttribute(e){
        const unit = e.target.value

        this.setState({
            unit: unit,
        })
    }

    handlePlaceholderAttribute(e){
        const placeholder = e.target.value

        this.setState({
            placeholder: placeholder,
        })
    }

    handleRegexAttribute(e){
        const regex = e.target.value

        this.setState({
            regex: regex,
        })
    }

    handleActive(){
        this.setState({
            active: !this.state.active,
        })
    }

    handleSelectAttribute(e){
        const attribute = parseInt(e.target.id)

        if (this.state.selectedAttribute.name === e.target.textContent){
            this.setState({
                selectedAttribute: '',
                name:'',
                validName: undefined,
                unit:'',
                placeholder:'',
                regex:'',
            })
        } else {
            this.state.availableAttributes.forEach((value) => {
                if (value.id === attribute) {
                    this.setState({
                        selectedAttribute: {id:value.id, name: value.name},
                        name: value.name,
                        validName: true,
                        unit: value.unit,
                        placeholder: value.placeholder,
                        regex: value.regex,
                        active: value.actived === 1 ? true : false
                    })
                }
            })
        }
    }

    handleSubmitAttribute(event){
        event.preventDefault();
        
        if(this.state.selectedAttribute === ''){
            axios.post(`http://10.2.1.94:4000/api/Attributes/add`, {
                attribute: {
                    name: this.state.name,
                    unit: this.state.unit,
                    placeholder: this.state.placeholder,
                    regex: this.state.regex,
                    actived: this.state.active
                }
            })
            .then( res => {
                console.log(res)
                if (res.data.message === 'Insertion completed') {
                    this.refs.submitButton.setState({
                        resultMessage: res.data.message,
                        pass: true
                    });
                    this.setState({
                        name:'',
                        validName: undefined,
                        unit:'',
                        placeholder:'',
                        regex:'',
                    })
                    this.componentDidMount()
                }
            })
            .catch( () => {
                alert('Conection Timed Out');
            });
        } else {
            axios.put(`http://10.2.1.94:4000/api/Attributes/find/${this.state.selectedAttribute.id}`, {
                attribute: {
                    name: this.state.name,
                    unit: this.state.unit,
                    placeholder: this.state.placeholder,
                    regex: this.state.regex,
                    actived: this.state.active
                }
            })
            .then( res => {
                console.log(res)
                if (res.data.message === 'Insertion completed') {
                    this.refs.submitButton.setState({
                        resultMessage: res.data.message,
                        pass: true
                    });
                    this.setState({
                        name:'',
                        validName: undefined,
                        unit:'',
                        placeholder:'',
                        regex:'',
                    })
                    this.componentDidMount()
                }
            })
            .catch( () => {
                alert('Conection Timed Out');
            });
        }
    }

    render(){
        const {
            state: {
                selectedAttribute,
                name,
                warningMessage,
                validName,
                unit,
                placeholder,
                regex,
                active
            }
        } = this;
    
        const regularLabels = 'col-md-12 col-sm-12 col-lg-3 col-xl-3 d-block text-right'
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
                        
                        if(this.state.selectedAttribute.name !== attribute.name){
                            return <li id={attribute.id} className='selectable mt-1 p-1 rounded' name={attribute.name} key={attribute.id} onClick={this.handleSelectAttribute} label={attribute.name}>{attribute.name}</li>
                        } else {
                            return <li id={attribute.id} className='selected mt-1 p-1 rounded' name={attribute.name} key={attribute.id} onClick={this.handleSelectAttribute} label={attribute.name}>{attribute.name}</li>
                        }
                    }) : <li className='selectable mt-1 p-1 rounded'>No available attributes</li>}
                    </ul>
                </div>
                <div className='col-lg-8 col-xl-8 col-md-12 col-sm-12'>
                    <form onSubmit={this.handleSubmitAttribute}>
                        <div className='row justify-content-center form-inline mb-3'>
                        <label className={regularLabels}>{ selectedAttribute === '' ? 'Name:' : 'Change name:' }</label>
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
                                onChange={this.handleNameAttribute}
                                value={name}
                            />
                            <label className={warningLabels}>{warningMessage}</label>
                        </div>
                        <div className='row justify-content-center form-inline mb-3'>
                        <label className={regularLabels}>Unit:</label>
                        <input
                            type='text'
                            className={inputs}
                            name='attributeUnit' 
                            placeholder='e.g. C, s'
                            onChange={this.handleUnitAttribute}
                            value={unit}
                        />
                        <label className={warningLabels}></label>
                    </div>
                    <div className='row justify-content-center form-inline mb-3'>
                        <label className={regularLabels}>Placeholder:</label>
                        <input
                            type='text'
                            className={inputs}
                            name='attributeType' 
                            placeholder='e.g. SA-##-#####'
                            onChange={this.handleTypeAttribute}
                            value={placeholder}
                        />
                        <label className={warningLabels}></label>
                    </div>
                    <div className='row justify-content-center form-inline mb-3'>
                        <label className={regularLabels}>Regex:</label>
                        <input
                            type='text'
                            className={inputs}
                            name='attributeRegex' 
                            placeholder='#####'
                            onChange={this.handleRegexAttribute}
                            value={regex}
                        />
                        <label className={warningLabels}></label>
                    </div>
                    <div className='row justify-content-center form-inline mb-3'>
                        <label>Status:</label>
                        <input
                            type='checkbox'
                            className='form-check-input ml-3'
                            name='attributeStatus'
                            checked={active}
                            onChange={this.handleActive}
                        />
                        <label htmlFor='status'className='form-check-label'>{ active ? 'Active' : 'Inactive' }</label>
                    </div>
                    <SpinnerButton
                        ref='submitButton'
                        name='submitButton'
                        text={(this.state.selectedAttribute !== '' ) ? 'Modify attribute' : 'Save attribute'}
                        titlePass='Form is ready'
                        titleNoPass='Form not ready'
                        type='submit'
                        disabled={
                            !(validName)
                        }
                        onClick={ this.handleSubmitAttribute }
                        />
                    </form>
                </div>

            </div>)
    }
}
