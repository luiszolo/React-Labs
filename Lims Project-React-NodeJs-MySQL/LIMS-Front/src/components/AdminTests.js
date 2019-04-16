import React from 'react';
import axios from 'axios';

import SelectableTable from './SelectableTable';
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
            messageName: '',
            validNameTest: undefined,
            sampleLenghtTest: 1,
            messageNumberSamples: '',
            validNumberSamples: true,
            activeTest: true,
            requiredStatus: [],
            selectedRequiredStatus: 'New Sample',
        }

        this.handleSelectStatus = this.handleSelectStatus.bind(this);
        this.handleSelectAttribute = this.handleSelectAttribute.bind(this);
        this.handleSelectTest = this.handleSelectTest.bind(this);
        this.handleSamplesLTest = this.handleSamplesLTest.bind(this);
        this.handleStatusTest = this.handleStatusTest.bind(this);
        this.handleStatusTest = this.handleStatusTest.bind(this);
        this.handleselectedRequiredStatus = this.handleselectedRequiredStatus.bind(this);
        this.handleSubmitTest = this.handleSubmitTest.bind(this);
        this.handleNameTest = this.handleNameTest.bind(this);
        this.renderTestForm = this.renderTestForm.bind(this);
        this.renderTestList = this.renderTestList.bind(this);
    }

    componentDidMount() {
        const testsURL= "http://localhost:4000/api/tests/by";
        const attributesURL= "http://localhost:4000/api/attributes/by";
        const statusURL= "http://localhost:4000/api/status/by";

        axios.get(testsURL)
        .then((res) => {
            console.log(res.data.tests)
            const tests = res.data.tests.actived.concat(res.data.tests.inactived)

            this.setState({tests: res.data.tests.inactived !== undefined ? tests : res.data.tests.actived})
        })
        
        axios.get(attributesURL)
        .then((res) => {
            console.log(res.data)
            this.setState({availableAttributes: res.data.attributes !== undefined ? res.data.attributes.map((attribute) => {return attribute}) : []})
        })

        axios.get(statusURL)
        .then((res) => {
            console.log(res.data)
            this.setState({
                availableStatus: res.data.status !== undefined ? res.data.status.map((status) => {return status}) : [],
                requiredStatus: res.data.status !== undefined ? res.data.status.map((status) => {return status}) : []
            })
        })
    }

    handleNameTest(e){
        const testName = e.target.value

        this.setState({
            nameTest: testName
        })
        if(testName.trim() !== '' && testName.length > 0){
            this.setState({
                validNameTest: true,
                messageName: ''
            })
        } else {
            this.setState({
                validNameTest: false,
                messageName: 'Name can\'t be blank'
            })
        }
        this.state.tests.forEach((value)=>{
            if(testName === value.name){
                this.setState({
                    validNameTest: false,
                    messageName: 'The test already exists'
                })
            }
        })
    }

    handleSamplesLTest(e){
        const sampleLenghtTest = parseInt(e.target.value)

        this.setState({
            sampleLenghtTest: sampleLenghtTest,
        })
        if(sampleLenghtTest >= 1){
            this.setState({
                validNumberSamples: true,
                messageNumberSamples: ''
            })
        } else {
            this.setState({
                validNumberSamples: false,
                messageNumberSamples: 'Can\'t be 0'
            })
        }
    }

    handleStatusTest(){
        this.setState({
            activeTest: !this.state.activeTest,
        })
    }

    handleselectedRequiredStatus(e){
        const selectedRequiredStatus = e.target.value

        this.setState({
            selectedRequiredStatus: selectedRequiredStatus,
        })
    }

    handleSubmitTest(event){
        event.preventDefault();
        
        if(this.state.selectedTest.id === '0') {
            axios.post(`http://localhost:4000/api/tests/add`, {
                test: {
                    name: this.state.nameTest,
                    samplesLength: this.state.sampleLenghtTest,
                    attributes: this.state.selectedAttributes.map((x) => x),
                    actived: this.state.activeTest,
                    requiredState: this.state.selectedRequiredStatus,
                    postStates: this.state.selectedStatus.map((x) => x)
                }
            })
            .then((res) => {
                console.log(res.data.message)
                if (res.data.message === 'Insertion completed') {
                    this.refs.submitButton.setState({
                        resultMessage: res.data.message,
                        pass: true
                    });
                    this.setState({
                        nameTest: '',
                        selectedTest: {
                            id: '0',
                            name: 'Add test'
                        },
                        validNameTest: undefined,
                        sampleLenghtTest: 1,
                        validNumberSamples: true,
                        activeTest: true,
                        validrequiredStatus: undefined,
                        selectedAttributes: [],
                        selectedStatus: [],
                    })
                    this.componentDidMount()
                }
            })
            .catch( () => {
                alert('Conection Timed Out');
            });
        } else {
            axios.put(`http://localhost:4000/api/tests/find/${this.state.selectedTest.id}`,{
                test: {
                    name: this.state.nameTest,
                    samplesLength: this.state.sampleLenghtTest,
                    attributes: this.state.selectedAttributes.map((x) => x),
                    actived: this.state.activeTest,
                    requiredState: this.state.selectedRequiredStatus,
                    postStates: this.state.selectedStatus.map((x) => x)
                }
            })
            .then((res) => {
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
                        sampleLenghtTest: 1,
                        validNumberSamples: true,
                        activeTest: true,
                        selectedAttributes: [],
                        selectedStatus: [],
                    })
                }
            })
            .catch( err => {
                alert(err.response.data.message);
            });
        }
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
                if(element === attribute){
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
        const test = {
            id: e.target.id,
            name: e.target.textContent
        }

        if (test.id === '0'){
            this.setState({
                selectedTest: test,
                nameTest: '',
                sampleLenghtTest: 1,
                activeTest: true,
                selectedAttributes: [],
                selectedStatus: [],
                validNameTest: undefined,
                validNumberSamples: true,
            })
        } else {
            this.state.tests.forEach((value) => {
                if(test.name === value.name){
                    this.setState({
                        selectedTest: test,
                        nameTest: value.name,
                        sampleLenghtTest: value.samplesLength,
                        activeTest: value.actived === 1 ? true : false,
                        selectedRequiredStatus: value.require_State,
                        selectedAttributes: value.attributes !== undefined ? value.attributes.map((att=>{return att.name}) ) : [],
                        selectedStatus: value.result_States !== undefined ? value.result_States.map((status) => {return status}) : [],
                        validNameTest: true,
                        validNumberSamples: true,
                    })
                }

            })
        }
    }

    renderTestList(){
        return(
            <SelectableTable
                cssCLassName={'col-lg-8 col-xl-8 col-md-12 col-sm-12'}
                selectDisabled={true}
                header={'Tests'}
                type={'test'}
                addNew={true}
                content={this.state.tests}
                multipleSelect={false}
                selected={this.state.selectedTest}
                handleSelectItem={this.handleSelectTest}
            />
        )
    }

    renderTestForm(){
        const {
            state: {
                requiredStatus,
                messageName,
                messageNumberSamples,
                validNameTest,
                validNumberSamples,
                activeTest,
            }
        } = this;

        const regularLabels = 'col-md-12 col-sm-12 col-lg-3 col-xl-3 d-block text-right'
        const inputs = 'col-md-12 col-sm-12 col-lg-5 col-xl-5 form-control'
        const warningLabels = 'col-md-12 col-sm-12 col-lg-10 col-xl-10 text-danger text-center'

        return(<div className='col-lg-12 col-xl-12 col-md-12 col-sm-12'>
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
                        <label className={warningLabels}>{messageName}</label>
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
                        value={this.state.sampleLenghtTest}
                        onChange={this.handleSamplesLTest}
                    />
                    <label className={warningLabels}>{messageNumberSamples}</label>
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
                            onChange={this.handleselectedRequiredStatus}
                            defaultValue={this.state.selectedRequiredStatus}
                            placeholder="availableStatus"
                        >
                        {requiredStatus.map((option) => {
                            if(option.actived === 1){
                                return <option key={option.name} value={option.name}>{option.name}</option>
                            } else {
                                return ''
                            }
                        })}
                        </select>
                </div>
                <div className='row'>
                    <SelectableTable
                        cssCLassName={'col-md-12 col-sm-12 col-lg-5 col-xl-5'}
                        selectDisabled={false}
                        header={'Post-status'}
                        type={'status'}
                        addNew={false}
                        multipleSelect={true}
                        content={this.state.availableStatus}
                        selected={this.state.selectedStatus}
                        handleSelectItem={this.handleSelectStatus}
                    />
                    <div className='col-md-12 col-sm-12 col-lg-2 col-xl-2'></div>
                    <SelectableTable
                        cssCLassName={'col-md-12 col-sm-12 col-lg-5 col-xl-5'}
                        selectDisabled={false}
                        header={'Attributes'}
                        type={'attribute'}
                        addNew={false}
                        multipleSelect={true}
                        content={this.state.availableAttributes}
                        selected={this.state.selectedAttributes}
                        handleSelectItem={this.handleSelectAttribute}
                    />
                </div>
                <SpinnerButton
                    ref='submitButton'
                    name='submitButton'
                    text={(this.state.selectedTest.id !== '0' ) ? 'Modify test' : 'Save test'}
                    titlePass='Form is ready'
                    titleNoPass='Form not ready'
                    type='submit'
                    disabled={!(validNameTest && validNumberSamples && (this.state.selectedStatus.length > 0))}
                    onClick={ this.handleSubmitStatus }
                />
                </form>
            </div>
        )
    }
    
    render(){
        return(<div className='row content justify-content-center m-0'>
            <div className='col-sm-12 mt-4 mb-4'>
            {(this.state.selectedTest !=='') ? <button className='btn btn-info float-left' onClick={()=>this.setState({selectedTest: ''})}>{'<-Back'}</button> : ''}
                <h1 className='text-center'>Tests</h1>
            </div>
            {(this.state.selectedTest !== '') ? this.renderTestForm() : this.renderTestList()}
        </div>)
    }
}