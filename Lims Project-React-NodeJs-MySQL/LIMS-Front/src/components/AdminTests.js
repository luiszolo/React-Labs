import React from 'react';
import axios from 'axios';

import SpinnerButton from './../components/SpinnerButton';

export default class AdminTests extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tests: [],
            availableAttributes: [],
            selectedAttributes: [],
            availableStatus: [],
            selectedStatus: [],
            selectedTest: '',
            nameTest: '',
            samplelenghtTest: '',
            activeTest: true,
            requiredStatus: [],
            validNameTest: undefined,
            validNumberSamples: undefined,
            validrequiredStatus: undefined,
            selectedRequiredStatus: '',
            postStatus: '',
        }

        this.handleSelectStatus = this.handleSelectStatus.bind(this);
        this.handleSelectAttribute = this.handleSelectAttribute.bind(this);
        this.handleSelectTest = this.handleSelectTest.bind(this);
        this.renderFormTest = this.renderFormTest.bind(this);
        this.renderSelectTest = this.renderSelectTest.bind(this);
    }

    componentDidMount() {
        const testsURL= "http://localhost:4000/api/tests/by";
        const attributesURL= "http://localhost:4000/api/attributes/by";
        const statusURL= "http://localhost:4000/api/status/by";

        axios.get(testsURL)
        .then(res => {
            console.log(res.data.tests)
            const tests = res.data.tests.actived.concat(res.data.tests.inactived)
            this.setState({tests: tests})
        })
        
        axios.get(attributesURL)
        .then(res => {
            console.log(res.data)
            this.setState({availableAttributes: res.data.attributes})
        })

        axios.get(statusURL)
        .then(res => {
            console.log(res.data)
            this.setState({
                availableStatus: res.data.status,
                requiredStatus: res.data.status
            })
        })
    }

    handleNameTest = (e) => {
        const nameTest = e.target.value

        this.setState({
            nameTest: nameTest
        })
        if(nameTest.length >= 1) {
            this.setState({
                validNameTest: true, 
            })
        } else {
            this.setState({
                validNameTest: false
            })
        }
        this.state.tests.forEach((value) => {
            if(value.name === nameTest) {
                this.setState({
                    validNameTest: false
                })
            }
        })
    }

    handleSamplesLTest = (e) => {
        const samplelenghtTest = e.target.value

        this.setState({
            samplelenghtTest:samplelenghtTest,
        })
        if(samplelenghtTest.length >= 1){
            this.setState({
                validNumberSamples: true,
            })
        } else {
            this.setState({
                validNumberSamples: false,
            })
        }
    }

    handleStatusTest = () => {
        this.setState({
            activeTest: !this.state.activeTest,
        })
    }

    handleselectedRequiredStatus = (e) => {
        const selectedRequiredStatus = e.target.value

        if(selectedRequiredStatus.length >= 1) {
            this.setState({
                selectedRequiredStatus: selectedRequiredStatus,
                validrequiredStatus: true,
            })
        } else if(selectedRequiredStatus === '') {
            this.setState({
                validrequiredStatus: false,
            })
        }
    }

    handleSubmitTest = event => {
        event.preventDefault();
        
		axios.post(`http://localhost:4000/api/tests/add`,{
            name: this.state.nameTest,
            samplesLength: this.state.samplelenghtTest,
            attributes: this.state.selectedAttributes.map((x) => x),
            actived: this.state.activeTest,
            requeredState: this.state.selectedRequiredStatus,
            postState: this.state.selectedStatus.map((x) => x)
		})
		.then(res => {
            console.log(res.data.message)
			if (res.data.message === 'Insertion completed') {
                this.componentDidMount()
                this.refs.submitButton.setState({
                    resultMessage: res.data.message,
                    pass: true
				});
				this.setState({
                    nameTest: '',
                    selectedTest: '',
                    validNameTest: undefined,
                    samplelenghtTest: '',
                    validNumberSamples: undefined,
                    activeTest: false,
                    validrequiredStatus: undefined,
                    selectedAttributes: [],
                    selectedStatus: [],
				})
			}
		})
		.catch( () => {
			alert('Conection Timed Out');
		});
    }

    handleSelectStatus(e){
        const status = e.target.textContent

        let selectedStatus = this.state.selectedStatus

        const exists = selectedStatus.filter((item)=> {return item === status})
        
        if(exists.length !== 1){
            selectedStatus.push(status)
            this.setState({
                selectedStatus: selectedStatus,
            })
        } else {
            selectedStatus.forEach((element, position) =>{
                if(element === status){
                    const prevSelected = selectedStatus.slice(0, position)
                    const postSelected = selectedStatus.slice(position + 1, selectedStatus.length)
                    const newSelectedStatus =prevSelected.concat(postSelected)
                    this.setState({
                        selectedStatus: newSelectedStatus
                    })
                }
            })
        }
    }

    handleSelectAttribute(e){
        const attribute = e.target.textContent

        let selectedAttributes = this.state.selectedAttributes

        const exists = selectedAttributes.filter((item)=> {return item === attribute})
        if(exists.length !== 1){
            selectedAttributes.push(attribute)
            this.setState({
                selectedAttributes: selectedAttributes
            })
        } else {
            selectedAttributes.forEach((element, position) =>{
                if(element===attribute){
                    const prevSelected = selectedAttributes.slice(0, position)
                    const postSelected = selectedAttributes.slice(position + 1, selectedAttributes.length)
                    const newSelectedAttributes =prevSelected.concat(postSelected)
                    this.setState({
                        selectedAttributes: newSelectedAttributes
                    })
                }
            })
        }
    }

    handleSelectTest(e){
        const test = e.target.textContent

        if (test === 'Add test'){
            this.setState({
                selectedTest: 'Add test',
                nameTest: '',
                samplelenghtTest: '',
                activeTest: true,
                selectedAttributes: [],
                selectedStatus: [],
                validNameTest: undefined,
                validNumberSamples: undefined,
                validrequiredStatus: undefined,
            })
        } else {
            this.state.tests.forEach((value)=>{
                if(test === value.name){
                    this.setState({
                        selectedTest: test,
                        nameTest: value.name,
                        samplelenghtTest: value.samplesLength,
                        activeTest: value.actived === 1 ? true : false,
                        selectedAttributes: value.attributes !== undefined ? value.attributes.map((att=>{return att.name}) ) : [],
                        selectedStatus: [],
                        validNameTest: true,
                        validNumberSamples: true,
                        validrequiredStatus: true,
                    })
                }

            })
        }

    }

    renderSelectTest(){
        return(<div className='col-lg-8 col-xl-8 col-md-12 col-sm-12 status rounded p-1'>
            <h3 className='header'>Tests</h3>
            <ul>
            <li className='selectable mt-1 p-1 rounded' onClick={this.handleSelectTest}>Add test</li>
            {(this.state.tests.length > 0) ? this.state.tests.map((test) => {
                if(this.state.selectedTest !== test.name){
                    return <li id={test.id} className='selectable mt-1 p-1 rounded' name={test.name} key={test.id} onClick={this.handleSelectTest} label={test.name}>{test.name}</li>
                } else {
                    return <li id={test.id} className='selected mt-1 p-1 rounded' name={test.name} key={test.id} onClick={this.handleSelectTest} label={test.name}>{test.name}</li>
                }
            }) : ''}
            </ul>
            </div>
        )
    }

    renderFormTest(){
        const {
            state: {
                requiredStatus,
                messageOp,
                validNameTest,
                validNumberSamples,
                activeTest,
                validrequiredStatus,
            }
        } = this;

        const regularLabels = 'col-md-12 col-sm-12 col-lg-3 col-xl-3 d-block text-right'
        const inputs = 'col-md-12 col-sm-12 col-lg-5 col-xl-5 form-control'
        const warningLabels = 'col-md-12 col-sm-12 col-lg-10 col-xl-10 text-danger text-center'

        return(<div className='col-lg-8 col-xl-8 col-md-12 col-sm-12'>
                <form onSubmit={this.handleSubmitTest}>
                    <div className='row justify-content-center form-inline mb-3'>
                        <label className={regularLabels}>Name:</label>
                        <input
                            type='text'
                            className={
                                validNameTest === undefined ? (inputs) : (
                                    validNameTest === true ? inputs.concat(inputs, " ", "border border-success") : 
                                    inputs.concat(inputs, " ", "border border-danger")
                                )
                            }
                            name='testName'
                            placeholder='e.g. Taste Test'
                            value={this.state.nameTest}
                            onChange={this.handleNameTest}
                        />
                        <label className={warningLabels}>{messageOp}</label>
                    </div>
                    <div className='row justify-content-center form-inline mb-3'>
                    <label className={regularLabels}>Number of samples:</label>
                    <input
                        type='number'
                        className={
                            validNumberSamples === undefined ? (inputs) : (
                                validNumberSamples === true ? inputs.concat(inputs, " ", "border border-success") : 
                                inputs.concat(inputs, " ", "border border-danger")
                            )
                        }
                        name='numberSamples' 
                        placeholder='##'
                        value={this.state.samplelenghtTest}
                        onChange={this.handleSamplesLTest}
                    />
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                <div className='row justify-content-center form-inline mb-3'>
                    <label className='mr-3'>Status:</label>
                    <input
                        type='checkbox'
                        className='form-check-input'
                        name='testStatus'
                        checked={activeTest}
                        onChange={this.handleStatusTest}
                    />
                    <label htmlFor='status'className='form-check-label'>{ activeTest ? 'Active' : 'Inactive' }</label>
                </div>
                <div className='row justify-content-center form-inline mb-3'>
                    <label className={regularLabels}>Requiered status:</label>
                        <select
                            className={inputs} 
                            id="Status" 
                            onBlur={this.handleselectedRequiredStatus} 
                            defaultValue={this.state.selectedRequiredStatus}
                            placeholder="availableStatus"
                        >
                        {requiredStatus.map((option) => {
                            return <option key={option.name} value={option.name}>{option.name}</option>
                        })}
                        </select>
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                <div className='row'>
                    <div className='col-md-12 col-sm-12 col-lg-6 col-xl-6 status rounded-left p-1'>
                        <h3 className='header'>Post-status</h3>
                        <ul>
                        {(this.state.availableStatus.length > 0) ? this.state.availableStatus.map((status) => {
                            const exists = this.state.selectedStatus.filter((item)=> {return item === status.name})
                            if(exists.length !== 1){
                                return <li className='selectable mt-1 p-1 rounded' name={status.name} key={status.id} onClick={this.handleSelectStatus} label={status.name}>{status.name}</li>
                            } else {
                                return <li className='selected mt-1 p-1 rounded' name={status.name} key={status.id} onClick={this.handleSelectStatus} label={status.name}>{status.name}</li>
                            }
                        }) : <li className='selectable mt-1 p-1 rounded'>No available status</li>}
                        </ul>
                    </div>
                    <div className='col-md-12 col-sm-12 col-lg-6 col-xl-6 attributes rounded-right p-1'>
                        <h3 className='header'>Attributes</h3>
                        <ul>
                        {(this.state.availableAttributes.length > 0) ? this.state.availableAttributes.map((attribute) => {
                            const exists = this.state.selectedAttributes.filter((item)=> {return item === attribute.name})
                            if(exists.length !== 1){
                                return <li className='selectable mt-1 p-1 rounded' name={attribute.name} key={attribute.id} onClick={this.handleSelectAttribute} label={attribute.name}>{attribute.name}</li>
                            } else {
                                return <li className='selected mt-1 p-1 rounded' name={attribute.name} key={attribute.id} onClick={this.handleSelectAttribute} label={attribute.name}>{attribute.name}</li>
                            }
                        }) : <li className='selectable mt-1 p-1 rounded'>No available attributes</li>}
                        </ul>
                    </div>
                </div>
                <SpinnerButton
                    ref='submitButton'
                    name='submitButton'
                    text={(this.state.selectedTest !== 'Add test' ) ? 'Modify test' : 'Save test'}
                    titlePass='Form is ready'
                    titleNoPass='Form not ready'
                    type='submit'
                    disabled={!(validNameTest && validNumberSamples && validrequiredStatus && (this.state.selectedStatus.length > 0))}
                    onClick={ this.handleSubmitStatus }
                />
                </form>
            </div>
        )
    }
    
    render(){
        return(<div className='content row justify-content-center m-0'>
            {(this.state.selectedTest !=='') ? <div className='col-sm-1 mt-4'><button className='btn btn-info' onClick={()=>this.setState({selectedTest: ''})}>{'<-Back'}</button></div> : <div className='col-sm-1'></div>}
            
            <div className='col-sm-11 mt-4 mb-4'>
                <h1 className='text-center'>Tests</h1>
            </div>
            {(this.state.selectedTest !== '') ? this.renderFormTest() : this.renderSelectTest()}
        </div>)
    }
}