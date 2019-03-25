import React from 'react';
import axios from 'axios';

import SpinnerButton from './../components/SpinnerButton';

export default class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            status:[],
            nameStatus: '',
            validStatus: undefined,
            activeTest: false,
        }
    }

    componentDidMount(){
        const url= "http://10.2.1.94:4000/api/status";
        fetch(url,{
            method : "GET"
        }).then(Response => Response.json()).then(res =>{
            this.setState({status: res.Statuss})
            }
        )
    }

    renderOption(){
        return this.state.status.map(name => {
            return <option key={name.name} value={name.name}>{name.name}</option>
        })
    }

    handleStatusTest = () => {
        this.setState({
            activeTest: !this.state.activeTest,
        })
        console.log(!this.state.activeTest)
    }

    handleStatus=(e)=>{
        const nameStatus = e.target.value
        this.setState({
            messageAPI:""
        })
        this.setState({
            nameStatus: nameStatus
        })
        if(nameStatus.length >= 1){
            this.setState({
                validStatus: true
            })
        } else {
            this.setState({
                validStatus: false
            })
        }
        this.state.status.forEach((value)=>{
            if(value.name === nameStatus){
                this.setState({
                    validStatus: false
                })
            }
        })
    }

    handlePreStatusTest = (e) => {
        const preStatusTest = e.target.value

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

    handleSubmitStatus = event => {
        event.preventDefault();
		axios.post(`http://10.2.1.94:4000/api/status/add`,{
            name: this.state.nameStatus,
            requiredPrev: this.state.activeTest,
            prevStatus: this.state.preStatusTest
		})
		.then( res=> {
			if (res.data.message==='Insertion completed') {
                this.refs.submitButton.setState({
                    resultMessage: res.data.message,
                    pass: res.data.pass
				});
				this.setState({
                    nameStatus:"",
                    validStatus: undefined

                })
                this.componentDidMount()
			} else {
			}
			})
		.catch( () => {
			alert('Conection Timed Out');
		});
    }

    

    render(){
        const {
            handleSubmitStatus,
            handleStatus,          
            state: {
                nameStatus,
                validStatus,
                activeTest,
            }
        } = this;

        
        const regularLabels = 'col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
        const inputs = 'col-md-12 col-sm-12 col-lg-5 col-xl-5 form-control'
        const warningLabels = 'col-md-12 col-sm-12 col-lg-10 col-xl-10 text-danger text-center'


        return(
            <div className='content row justify-content-center'>
                <div className='col-sm-12 m-4'>
                    <h1 className='text-center'>Add status</h1>
                </div>
                <div className='col-lg-6 col-xl-6 col-md-12 col-sm-12'>
                    <form onSubmit={handleSubmitStatus}>
                        <div className='row justify-content-center form-inline mb-3'>
                            <label className={regularLabels}>Status:</label>
                            <input
                                type='text'
                                className={
                                    validStatus === undefined ? (inputs) : (
                                        validStatus === true ? inputs.concat(inputs, " ", "border border-success") : 
                                        inputs.concat(inputs, " ", "border border-danger")
                                    )
                                }
                                name='Status' 
                                placeholder='#####'
                                onChange={handleStatus}
                                value={nameStatus}
                            />
                            <label className={warningLabels}></label>
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
                     
                        <label className={regularLabels}>Pre Status:</label>
                        <select 
                            className={inputs} 
                            id="status" 
                            onBlur={this.handlePreStatusTest} 
                            defaultValue="Sample Ready For Electricity" 
                            placeholder="Status">
                            {this.renderOption()}
                        </select>
                    {/* <label className={warningLabels}>{messageOp}</label> */}
                </div>
                        <SpinnerButton 
                            ref='submitButton'
                            name='submitButton'
                            text='Save status'
                            titlePass='Form is ready'
                            titleNoPass='Form not ready'
                            type='submit'
                            disabled={
                                !(validStatus)
                            } 
                            onClick={ this.handleSubmitStatus }
                        />
                    </form>
                </div>
                <div className='col-lg-6 col-xl-5 col-md-12 col-sm-12 status rounded-right'>
                    <h3 className='header'>Available status</h3>
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
