import React from 'react';
import axios from 'axios';

import ReactTable from "react-table";
import "react-table/react-table.css";

import SpinnerButton from './../components/SpinnerButton';
import { element } from 'prop-types';

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
            ValidNameTest: undefined,
            validTest1: undefined,
            validTest2: undefined,
            validTest3: undefined,
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
            this.setState({preStatus: res.Statuss})  
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
                validTest1: true,
            })
        } else if(samplelenghtTest === '') {
            this.setState({
                validTest1: false,
            })
        }
    }

    handleNameTest = (e) => {
        const nameTest = e.target.value

        if(nameTest.length >= 1) {
            this.setState({
                ValidNameTest: true,
                nameTest: nameTest
            })
        } else {
            this.setState({
                ValidNameTest: false
            })
        }
        this.state.tests.forEach((value, index) => {
            if(value.name === nameTest) {
                this.setState({
                    ValidNameTest: false
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

    handlePostStatusTest = (e) => {
        if(this.state.selectedAttributes.length === 0) {
            this.setState({
                validTest3: false,
            })
        } else {
            this.setState({
                validTest3: true,
            })
        }
    }

    handleSubmitTest = event => {
        event.preventDefault();

		axios.post(`http://10.2.1.94:4000/api/tests/add`,{
            name:this.state.nameTest,
            samplesLength:this.state.samplelenghtTest,
            availableAttributes:this.state.selectedAttributes.map((x, i) => x.name),
            availableStatus: this.state.statusTest,
            prevStatus:
            {
                name:this.state.preStatusTest, 
            },
            postStatus:this.state.selectedAttributes.map((x, i) => x.name)
		})
		.then( res=> {
            console.log(res.data.message)
			if (res.data.message==='Insertion successful') {
                this.componentDidMount()
				this.setState({
					messageAPI: res.data.message,
					ValidNameTest: false,
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

        
        console.log(this.state.selectedStatus)

        let selectedStatus = this.state.selectedStatus

        const exists = selectedStatus.filter((item)=> {return item === status})
        if(exists.length !== 1){
            selectedStatus.forEach((element)=>{
                if(element !== status) {
                    selectedStatus.push(status)
                    this.setState({
                        selectedStatus: selectedStatus
                    })
                } else {
                    console.log('Status already in the array')
                }
            })
        }
    }

    handleSelectAttribute(e){
        const attribute = e.target.textContent

        // console.log(this.state.selectedAttributes)

        let selectedAttributes = this.state.selectedAttributes

        const exists = selectedAttributes.filter((item)=> {return item === attribute})
        if(exists.length !== 1){
            selectedAttributes.push(attribute)
            this.setState({
                selectedAttributes: selectedAttributes
            })
        }
    }
    
    deleteRow(name){
        const index = this.state.availableAttributes.findIndex(attributes=>{ // aqui seleccionas el que quieres es como un pointer
            return attributes.name === name
        })

        let copyattributes = [...this.state.availableAttributes]

        copyattributes.splice(index, 1)                           // estas tres lineas es para el borrado logico 

        this.setState({availableAttributes: copyattributes})
        const item = {
            id: index,                              // asignamos al los states los valores seleccionados con el pointer 
            name: name
        };
        this.setState({
            selectedAttributes: [...this.state.selectedAttributes, item]       // llenamos la info en el arreglo de alado 
        });
    }
    
    deleteRow2(name){
        const index = this.state.selectedAttributes.findIndex(selectedAttributes=>{ // aqui seleccionas el que quieres es como un pointer
            return selectedAttributes.name === name
        })

        let copyattributes2 = [...this.state.selectedAttributes]

        copyattributes2.splice(index,1)                 // estas tres lineas es para el borrado logico 

        this.setState({selectedAttributes: copyattributes2})
        const item = {
            id: index,                              // asignamos al los states los valores seleccionados con el pointer 
            name: name
        };
        this.setState({
            availableAttributes: [...this.state.availableAttributes, item]       // llenamos la info en el arreglo de al lado 
        });
    }

    deleteRow3(name){
        const index = this.state.availableStatus.findIndex(status=>{ // aqui seleccionas el que quieres es como un pointer
            return status.name === name
        })

        let copyStatus = [...this.state.availableStatus]

        copyStatus.splice(index,1)                   // estas tres lineas es para el borrado logico 

        this.setState({availableStatus: copyStatus})
        const item = {
            id: index,                              // asignamos al los states los valores seleccionados con el pointer 
            name: name
        };
        this.setState({
            selectedStatus: [...this.state.selectedStatus, item] ,      // llenamos la info en el arreglo de al lado 
            validTest3: true
        });
    }
    
    deleteRow4(name){
        const index = this.state.selectedStatus.findIndex(selectedStatus=>{ // aqui seleccionas el que quieres es como un pointer
            return selectedStatus.name === name
        })

        let copyStatus2 = [...this.state.selectedStatus]

        copyStatus2.splice(index,1)                   // estas tres lineas es para el borrado logico 

        this.setState({selectedStatus: copyStatus2})

        const item = {
            id: index,                              // asignamos al los states los valores seleccionados con el pointer 
            name: name
        };
        this.setState({
            availableStatus: [...this.state.availableStatus, item]       // llenamos la info en el arreglo de alado 
        });
        if(this.state.selectedAttributes.length === 1) {
            console.log("funciona")
            this.setState({
                validTest3: false,
            })
        }
    }

    renderOption(){
        return this.state.preStatus.map(name => {
            return <option key={name} value={name.name}>{name.name}</option>
        })
    }

    render(){
        const {
            columns = [
                {
                    Header: "Name",
                    accessor: "name",
                },
                {
                    Header: "Action",
                    maxWidth:100,
                    style:{
                        textAlign:"center"
                    },
                    width:100,
                    minWidth:100,
                    Cell: props=>{
                        return(
                            <button
                                onClick={() => {
                                    this.deleteRow(props.original.name)
                                }}
                            >
                            🡺
                            </button>
                        )
                    }
                },
            ],            
            columns2 = [
                {
                    Header: "Name",
                    accessor: "name",
                },
                {
                    style:{
                        textAlign:"center"
                    },
                    width:100,
                    minWidth:100,
                    Header: "Action",
                    Cell: props=>{
                        return(
                            <button
                                onClick={() => {
                                    this.deleteRow2(props.original.name)
                                }}
                            >🡸
                            </button>
                        )
                    }
                },
            ],
            columns3 =[
                {
                    Header: "Name",
                    accessor: "name"
                },
                {
                    Header: "Action",
                    maxWidth:100,
                    style:{
                        textAlign:"center"
                    },
                    width:100,
                    minWidth:100,
                    Cell: props=>{
                        return(
                            <button
                                onClick={() => {
                                    this.deleteRow3(props.original.name)
                                }}
                            >
                            🡺
                            </button>
                        )
                    }
                },
            ],            
            columns4 =[
                {
                    Header: "Name",
                    accessor: "name",
                },
                {
                    style:{
                        textAlign:"center"
                    },
                    width:100,
                    minWidth:100,
                    Header: "Action",
                    Cell: props=>{
                        return(
                            <button
                                onClick={() => {
                                    this.deleteRow4(props.original.name)
                                }}
                            >
                            🡸
                            </button>
                        )
                    }
                },
            ],
            state: {
                messageOp,
                ValidNameTest,
                validTest1,
                activeTest,
                validTest2,
                validTest3,
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
                            className={inputs}
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
                        className={inputs}
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
                            defaultValue="Sample Ready For Electricity" 
                            placeholder="availableStatus">
                            {this.renderOption()}
                        </select>
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                <div className='row'>
                    <div className='col-md-12 col-sm-12 col-lg-6 col-xl-6'>
                        <h3>Select one or more Status</h3>
                        <ul className='p-0'>
                        {(this.state.availableStatus) ? this.state.availableStatus.map((status) => {
                            return <li className='selectable' name={status.name} key={status.id} onClick={this.handleSelectStatus}>{status.name}</li>
                        }) : <li className='selectable'>Nothing</li>}
                        </ul>
                    </div>
                    <div className='col-md-12 col-sm-12 col-lg-6 col-xl-6'>
                        <h3>Select one or more attribute</h3>
                        <ul className='p-0'>
                        {(this.state.availableAttributes) ? this.state.availableAttributes.map((attribute) => {
                            return <li className='selectable' name={attribute.name} key={attribute.id} onClick={this.handleSelectAttribute}>{attribute.name}</li>
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
                    disabled={
                        !(ValidNameTest && validTest1 && activeTest && validTest2&& validTest3)
                    } 
                    onClick={ this.handleSubmitStatus }
                />
                <label id='succes' className={'col-lg-3 col-sm-10 text-center col-md-6  mt-3'}>
                {messageAPI}
                </label>
                </form>
            </div>
            {/* <div id="tables" className='tables'>
                <div className='row'>
                    <div className='col-6 text-center'>
                        <h3>Status</h3>
                    </div>
                    <div className='col-6 text-center'>
                        <h3>Attributes</h3>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3'>
                        <ReactTable
                            columns={columns3}
                            data={this.state.availableStatus}
                            defaultPageSize= {10}
                            showPageSizeOptions={false}
                            noDataText={"No available availableStatus"}
                        >
                        </ReactTable>
                    </div>
                    <div className='col-3'>
                        <ReactTable
                            columns={columns4}
                            data={this.state.selectedStatus}
                            defaultPageSize= {10}
                            showPageSizeOptions={false}
                            noDataText={"Select a availableStatus..."}>
                        </ReactTable>
                    </div>
                    <div className='col-3'>
                        <ReactTable
                            columns={columns}
                            data={this.state.availableAttributes}
                            defaultPageSize= {10}
                            showPageSizeOptions={false}
                            noDataText={"No available attributes"}
                        >
                        </ReactTable>
                    </div>
                    <div className='col-3'>
                        <ReactTable
                            columns={columns2}
                            data={this.state.selectedAttributes}
                            defaultPageSize= {10}
                            showPageSizeOptions={false}
                            noDataText={"Select an attribute..."}
                        >
                        </ReactTable>
                    </div>
                </div>
            </div> */}
        </div>)
    }
}
