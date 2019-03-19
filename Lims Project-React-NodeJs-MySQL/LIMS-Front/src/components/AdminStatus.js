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
            messageAPI:'',
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

    handleStatus=(e)=>{
        const nameStatus = e.target.value

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

    handleSubmitStatus = event => {
        event.preventDefault();
		axios.post(`http://10.2.1.94:4000/api/status/add`,{
			name: this.state.nameStatus
		})
		.then( res=> {
			if (res.data.message==='Insertion completed') {
				this.setState({
					messageAPI: res.data.message,
					validStatus: false,
				})
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
                messageAPI,
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
                        <SpinnerButton name='submitButton'
                                text='Save status'
                                titlePass='Form is ready'
                                titleNoPass='Form not ready'
                                type='submit'
                                disabled={
                                    !(validStatus)
                                } 
                                onClick={ this.handleSubmitStatus }
                        />
                        <div className='row justify-content-center'>
                        <label id='succes' className={'col-lg-3 col-sm-10 text-center col-md-6  mt-3'}>
                        {messageAPI}
                        </label>
                        </div>
                    </form>
                </div>
                <div className='col-lg-6 col-xl-6 col-md-12 col-sm-12 status rounded-right'>
                    <h4>Available status</h4>
                    <ul>
                        {this.state.status.map((value, idx)=>{
                                return (<li key={idx}>{value.name}</li>)
                            })
                        }
                    </ul>
                </div>
            </div>)
    }
}