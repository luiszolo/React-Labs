import React from 'react';
import axios from 'axios';

import "react-table/react-table.css";

import SpinnerButton from './../components/SpinnerButton';

export default class AdminTests extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tests: [],
            nameTest: '',
            nameAtt: '',
            samplelenghtTest: '',
            activeTest: undefined,
            preStatus: [],
            availableAttributes: [],
            selectedAttributes: [],
            availableStatus: [],
            selectedStatus: [],
            validNameTest: undefined, //using
            validNumberSamples: undefined,
            validTest2: undefined,
            messageOp: '',                      //Message for the operator field
            messageAPI: '',                     //Message of the API
            statusTest: '',
            preStatusTest: '',
            requiredTest: '',
            postStatusTest: '',
            attributeTest: '',
        }

        this.handleSelectStatus = this.handleSelectStatus.bind(this);
        this.handleSelectAttribute = this.handleSelectAttribute.bind(this);
    }

    componentDidMount() {
        const url1= "http://10.2.1.94:4000/api/attributes";
        fetch(url1,{
            method : "GET"
        })
        .then(Response => Response.json())
        .then(res => {
        this.setState({availableAttributes: res.Attributes})
        })

        const url2= "http://10.2.1.94:4000/api/status";

        fetch(url2,
            {
                method : "GET"
            })
        .then(Response => Response.json())
        .then(res => {
            this.setState({availableStatus: res.Statuss})
        })

        const url4= "http://10.2.1.94:4000/api/status";

        fetch(url4,
            {
            method : "GET"
        })
        .then(Response => Response.json())
        .then(res => {
            this.setState({preStatus: res.Statuss, postStatus: res.Statuss[0].name})  
        })

        const url= "http://10.2.1.94:4000/api/tests";

        fetch(url,{
            method : "GET"
        })
        .then(Response => Response.json())
        .then(res => {
            this.setState({tests: res.Tests})
        })
    }

    handleAttributesTest = (e) => {
        const attributeTest = e.target.value

        if(attributeTest.length >= 1) {
            this.setState({
                attributeTest: attributeTest
            })
        } else if(attributeTest === '') {
        }
    }

    handleSamplesLTest = (e) => {
        const samplelenghtTest = e.target.value

        if(samplelenghtTest.length >= 1){
            this.setState({
                samplelenghtTest:samplelenghtTest,
                validNumberSamples: true,
            })
        } else if(samplelenghtTest === '') {
            this.setState({
                validNumberSamples: false,
            })
        }
    }

    handleNameTest = (e) => {
        const nameTest = e.target.value

        if(nameTest.length >= 1) {
            this.setState({
                validNameTest: true,
                nameTest: nameTest
            })
        } else {
            this.setState({
                validNameTest: false
            })
        }
        this.state.tests.forEach((value, index) => {
            if(value.name === nameTest) {
                this.setState({
                    validNameTest: false
                })
            }
        })
    }

    handleStatusTest = () => {
        this.setState({
            activeTest: !this.state.activeTest,
        })
    }

    handlePreStatusTest = (e) => {
        const preStatusTest = e.target.value

        console.log("preStatusTes")
        console.log(preStatusTest)

        if(preStatusTest.length>=1) {
            this.setState({
                preStatusTest: preStatusTest,
                validTest2: true,
            })
        } else if(preStatusTest === '') {
            this.setState({
                validTest2: false,
            })
        }
    }

    handleSubmitTest = event => {
        event.preventDefault();
        
		axios.post(`http://10.2.1.94:4000/api/tests/add`,{
            name:this.state.nameTest,
            samplesLength:this.state.samplelenghtTest,
            attributes:this.state.selectedAttributes.map((x, i) => x),
            status: this.state.validTest2,
            prevStatus: this.state.preStatusTest,
            postStatus:this.state.selectedStatus.map((x, i) => x)
		})
		.then( res=> {
            console.log(res.data.message)
			if (res.data.message==='Insertion successful') {
                this.componentDidMount()
				this.setState({
					messageAPI: res.data.message,
					validNameTest: false,
                    nameTest: '',
                    selectedAttributes: [],
                    availableAttributes: [],
				})
			}
		})
		.catch( () => {
			alert('Conection Timed Out');
		});
    }

    handleSelectStatus(e){
        const status = e.target.textContent

        //console.log(this.state.selectedStatus)

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

        // console.log(attribute)

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
                    // console.log(newSelectedAttributes)
                }
            })
        }
    }

    renderOption(){
        return this.state.preStatus.map((name) => {
            return <option key={name.name} value={name.name}>{name.name}</option>
        })
    }

    render(){
        const {
            state: {
                messageOp,
                validNameTest,
                validNumberSamples,
                activeTest,
                validTest2,
                messageAPI,
            }
        } = this;

        const regularLabels = 'col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
        const inputs = 'col-md-12 col-sm-12 col-lg-5 col-xl-5 form-control'
        const warningLabels = 'col-md-12 col-sm-12 col-lg-10 col-xl-10 text-danger text-center'

        return(<div className='content justify-content-center m-0'>
            <div className='m-4'>
                <h1 className='text-center'>Add test</h1>
            </div>
            <div className='container-fluid'>
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
                            placeholder='#####'
                            onBlur={this.handleNameTest}
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
                        placeholder='#####'
                        onBlur={this.handleSamplesLTest}
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
                    <label className='form-check-label'>Active</label>
                </div>
                <div className='row justify-content-center form-inline mb-3'>
                    <label className={regularLabels}>Pre-Status:</label>
                        <select
                            className={inputs} 
                            id="Status" 
                            onChange={this.handlePreStatusTest} 
                            defaultValue={this.state.preStatusTest}
                            placeholder="availableStatus"
                        >
                        {this.renderOption()}
                        </select>
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                <div className='row'>
                    <div className='col-md-12 col-sm-12 col-lg-6 col-xl-6 status rounded-left p-1'>
                        <h3 className='header'>Select one or more status</h3>
                        <ul>
                        {(this.state.availableStatus) ? this.state.availableStatus.map((status) => {
                            const exists = this.state.selectedStatus.filter((item)=> {return item === status.name})
                            if(exists.length !== 1){
                                return <li className='selectable mt-1 p-1 rounded' name={status.name} key={status.id} onClick={this.handleSelectStatus} label={status.name}>{status.name}</li>
                            } else {
                                return <li className='selected mt-1 p-1 rounded' name={status.name} key={status.id} onClick={this.handleSelectStatus} label={status.name}>{status.name}</li>
                            }
                        }) : <li className='selectable'>Nothing</li>}
                        </ul>
                    </div>
                    <div className='col-md-12 col-sm-12 col-lg-6 col-xl-6 attributes rounded-right border-left-0 p-1'>
                        <h3 className='header'>Select one or more attribute</h3>
                        <ul>
                        {(this.state.availableAttributes) ? this.state.availableAttributes.map((attribute) => {
                            const exists = this.state.selectedAttributes.filter((item)=> {return item === attribute.name})
                            if(exists.length !== 1){
                                return <li className='selectable mt-1 p-1 rounded' name={attribute.name} key={attribute.id} onClick={this.handleSelectAttribute} label={attribute.name}>{attribute.name}</li>
                            } else {
                                return <li className='selected mt-1 p-1 rounded' name={attribute.name} key={attribute.id} onClick={this.handleSelectAttribute} label={attribute.name}>{attribute.name}</li>
                            }
                        }) : <li className='selectable'>Nothing</li>}
                        </ul>
                    </div>
                </div>
                <SpinnerButton
                    name='submitButton'
                    text='Save test'
                    titlePass='Form is ready'
                    titleNoPass='Form not ready'
                    type='submit'
                    disabled={!(validNameTest && validNumberSamples && validTest2 && (this.state.selectedStatus.length > 0))}
                    onClick={ this.handleSubmitStatus }
                />
                <label id='success' className={'col-lg-3 col-sm-10 text-center col-md-6  mt-3'}>
                {messageAPI}
                </label>
                </form>
            </div>
        </div>)
    }
}
