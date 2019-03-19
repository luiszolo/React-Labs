import React from 'react';
import axios from 'axios';

import ReactTable from "react-table";
import "react-table/react-table.css";

import SpinnerButton from './../components/SpinnerButton';

export default class AdminTests extends React.Component{
    constructor(props){
        super(props);
        this.state={
            validTest1: undefined,
            validTest2: undefined,
            validTest3: undefined,
            validTest4: undefined,
            attributes2: [],
            tests: [],
            status: [],
            status2: [],
            status3: [],
            nameAtt: '',
            name: 'Electricity Test',           //Name of the test
            operator: 0,                        //State of the operator
            messageOp: '',                      //Message for the operator field
            ValidNameTest: undefined,
            validAtt: undefined,
            messageAPI: '',                     //Message of the API
            loading: false,                     //Loading state
            samplelenghtTest: '',
            statusTest: '',
            preStatusTest: '',
            requiredTest: '',
            postStatusTest: '',
            attributeTest: '',
        }
    }

    componentDidMount() {
        const url1= "http://10.2.1.94:4000/api/attributes";
        fetch(url1,{
            method : "GET"
        })
        .then(Response => Response.json())
        .then(res => {
        this.setState({attributes:res.Attributes})
        })

        const url2= "http://10.2.1.94:4000/api/status";

        fetch(url2,
            {
                method : "GET"
            })
        .then(Response => Response.json())
        .then(res => {
            this.setState({status: res.Statuss})
        })

        const url4= "http://10.2.1.94:4000/api/status";

        fetch(url4,
            {
            method : "GET"
        })
        .then(Response => Response.json())
        .then(res => {
            this.setState({status3: res.Statuss})  
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
            validTest2: !this.state.validTest2,
        })
    }

    handlePreStatusTest = (e) => {
        const preStatusTest = e.target.value

        console.log("preStatusTes")
        console.log(preStatusTest)

        if(preStatusTest.length>=1) {
            this.setState({
                preStatusTest: preStatusTest,
                validTest3: true,
            })
        } else if(preStatusTest === '') {
            this.setState({
                validTest3: false,
            })
        }
    }

    handlePostStatusTest = (e) => {
        if(this.state.status2.length === 0) {
            this.setState({
                validTest4: false,
            })
        } else {
            this.setState({
                validTest4: true,
            })
        }
    }

    handleSubmitTest = event => {
        event.preventDefault();

		axios.post(`http://10.2.1.94:4000/api/tests/add`,{
            name:this.state.nameTest,
            samplesLength:this.state.samplelenghtTest,
            attributes:this.state.attributes2.map((x, i) => x.name),
            status: this.state.validTest2,
            prevStatus: this.state.preStatusTest,
            postStatus:this.state.status2.map((x, i) => x.name)
		})
		.then( res=> {
            console.log(res.data.message)
			if (res.data.message==='Insertion successful') {
                this.componentDidMount()
				this.setState({
					messageAPI: res.data.message,
					ValidNameTest: false,
                    nameTest: '',
                    status2: [],
                    attributes2: [],
				})
			}
		})
		.catch( () => {
			alert('Conection Timed Out');
		});
    }
    
    deleteRow(name){
        const index = this.state.attributes.findIndex(attributes=>{ // aqui seleccionas el que quieres es como un pointer
            return attributes.name === name
        })

        let copyattributes = [...this.state.attributes]

        copyattributes.splice(index, 1)                           // estas tres lineas es para el borrado logico 

        this.setState({attributes:copyattributes})
        const item = {
            id: index,                              // asignamos al los states los valores seleccionados con el pointer 
            name: name
        };
        this.setState({
            attributes2: [...this.state.attributes2, item]       // llenamos la info en el arreglo de alado 
        });
    }
    
    deleteRow2(name){
        const index = this.state.attributes2.findIndex(attributes2=>{ // aqui seleccionas el que quieres es como un pointer
            return attributes2.name === name
        })

        let copyattributes2 = [...this.state.attributes2]

        copyattributes2.splice(index,1)                 // estas tres lineas es para el borrado logico 

        this.setState({attributes2:copyattributes2})
        const item = {
            id: index,                              // asignamos al los states los valores seleccionados con el pointer 
            name: name
        };
        this.setState({
            attributes: [...this.state.attributes, item]       // llenamos la info en el arreglo de al lado 
        });
    }

    deleteRow3(name){
        const index = this.state.status.findIndex(status=>{ // aqui seleccionas el que quieres es como un pointer
            return status.name === name
        })

        let copyStatus = [...this.state.status]

        copyStatus.splice(index,1)                   // estas tres lineas es para el borrado logico 

        this.setState({status:copyStatus})
        const item = {
            id: index,                              // asignamos al los states los valores seleccionados con el pointer 
            name: name
        };
        this.setState({
            status2: [...this.state.status2, item] ,      // llenamos la info en el arreglo de al lado 
            validTest4: true
        });
    }
    
    deleteRow4(name){
        const index = this.state.status2.findIndex(status2=>{ // aqui seleccionas el que quieres es como un pointer
            return status2.name === name
        })

        let copyStatus2 = [...this.state.status2]

        copyStatus2.splice(index,1)                   // estas tres lineas es para el borrado logico 

        this.setState({status2:copyStatus2})

        const item = {
            id: index,                              // asignamos al los states los valores seleccionados con el pointer 
            name: name
        };
        this.setState({
            status: [...this.state.status, item]       // llenamos la info en el arreglo de alado 
        });
        if(this.state.status2.length === 1) {
            console.log("funciona")
            this.setState({
                validTest4: false,
            })
        }
    }

    renderOption(){
        return this.state.status3.map(name => {
            return <option value={name.name}>{name.name}</option>
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
                validTest2,
                validTest3,
                validTest4,
                messageAPI,
            }
        } = this;

        const regularLabels = 'col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
        const inputs = 'col-md-12 col-sm-12 col-lg-5 col-xl-5 form-control'
        const warningLabels = 'col-md-12 col-sm-12 col-lg-10 col-xl-10 text-danger text-center'

        return(<div className='row justify-content-center m-0'>
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
                                ValidNameTest === undefined ? (inputs) : (
                                    ValidNameTest === true ? inputs.concat(inputs, " ", "border border-success") : 
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
                            validTest1 === undefined ? (inputs) : (
                                validTest1 === true ? inputs.concat(inputs, " ", "border border-success") : 
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
                        checked={validTest2}
                        onChange={this.handleStatusTest}
                    />
                    <label className='form-check-label'>Active</label>
                </div>
                <div className='row justify-content-center form-inline mb-3'>
                    <label className={regularLabels}>Pre Status:</label>
                        <select 
                            className={inputs} 
                            id="status" 
                            onBlur={this.handlePreStatusTest} 
                            defaultValue="Sample Ready For Electricity" 
                            placeholder="Status">
                            {this.renderOption()}
                        </select>
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                    <SpinnerButton
                        name='submitButton'
                        text='Save test'
                        titlePass='Form is ready'
                        titleNoPass='Form not ready'
                        type='submit'
                        disabled={
                            !(ValidNameTest && validTest1 && validTest2 && validTest3&& validTest4)
                        } 
                        onClick={ this.handleSubmitStatus }
                    />
                    <label id='succes' className={'col-lg-3 col-sm-10 text-center col-md-6  mt-3'}>
                    {messageAPI}
                    </label>
                </form>
            </div>
            <div id="tables" className='tables'>
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
                            data={this.state.status}
                            defaultPageSize= {10}
                            showPageSizeOptions={false}
                            noDataText={"No available status"}
                        >
                        </ReactTable>
                    </div>
                    <div className='col-3'>
                        <ReactTable
                            columns={columns4}
                            data={this.state.status2}
                            defaultPageSize= {10}
                            showPageSizeOptions={false}
                            noDataText={"Select a status..."}>
                        </ReactTable>
                    </div>
                    <div className='col-3'>
                        <ReactTable
                            columns={columns}
                            data={this.state.attributes}
                            defaultPageSize= {10}
                            showPageSizeOptions={false}
                            noDataText={"No available attributes"}
                        >
                        </ReactTable>
                    </div>
                    <div className='col-3'>
                        <ReactTable
                            columns={columns2}
                            data={this.state.attributes2}
                            defaultPageSize= {10}
                            showPageSizeOptions={false}
                            noDataText={"Select an attribute..."}
                        >
                        </ReactTable>
                    </div>
                </div>
            </div>
        </div>)
    }
}
