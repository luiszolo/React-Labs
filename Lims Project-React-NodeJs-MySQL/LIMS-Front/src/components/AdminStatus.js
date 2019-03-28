import React from 'react';

import SpinnerButton from './../components/SpinnerButton';
import Axios from 'axios';

export default class AdminStatus extends React.Component{
    constructor(props){
        super(props);
        this.state={
            availableStatus: [],
            selectedStatus: '',
            nameStatus: '',
            validStatus: undefined,
            active: true,
        }

        this.handleSelectStatus = this.handleSelectStatus.bind(this);
    }

    componentDidMount(){
        // const url= "http://localhost:4000/api/status/by/?option=name";
        // fetch(url,{
        //     method : "GET"
        // }).then( res => {
        //     console.log(res)
        // })
        Axios.get('http://localhost:4000/api/status/by/?option=name').then(res => {
            console.log(res.data.status);
            if (res.data.status === undefined | null) {
                return;
            }
            else this.setState({
                availableStatus: res.data.status
            });
        });
    }

    handleActive = () => {
        this.setState({
            active: !this.state.active,
        })
        console.log(!this.state.active)
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
        this.state.availableStatus.forEach((value)=>{
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
		Axios.post(`http://localhost:4000/api/status/add`,{
            status: {
                name: this.state.nameStatus,
                actived: this.state.active
            }
		})
		.then( res=> {
			if (res.data.message==='Insertion completed') {
                this.refs.submitButton.setState({
                    resultMessage: res.data.message,
                    pass: res.data.pass
				});
				this.setState({
                    nameStatus:'',
                    validStatus: false

                })
                this.componentDidMount()
			} else {
			}
			})
		.catch( () => {
			alert('Conection Timed Out');
		});
    }

    handleSelectStatus(e){
        const status = e.target.textContent

        if(status === this.state.selectedStatus){
            this.setState({
                selectedStatus: '',
                nameStatus: '',
                validStatus: undefined
            })
        } else {
            this.setState({
                selectedStatus: status,
                nameStatus: status,
                validStatus: true
            })
        }
    }

    render(){
        const {
            handleSubmitStatus,
            handleStatus,          
            state: {
                nameStatus,
                validStatus,
                active,
            }
        } = this;

        
        const regularLabels = 'col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
        const inputs = 'col-md-12 col-sm-12 col-lg-5 col-xl-5 form-control'
        const warningLabels = 'col-md-12 col-sm-12 col-lg-10 col-xl-10 text-danger text-center'


        return(
            <div className='content row justify-content-center'>
                <div className='col-sm-12 m-4'>
                    <h1 className='text-center'>Status</h1>
                </div>
                <div className='col-lg-4 col-xl-4 col-md-12 col-sm-12 status rounded-right'>
                    <h3 className='header'>Available status</h3>
                    <ul>
                        {(this.state.availableStatus.length > 0) ? this.state.availableStatus.map((status) => {
                            if(this.state.selectedStatus !== status.name){
                                return <li id={status.id} className='selectable mt-1 p-1 rounded' name={status.name} key={status.id} onClick={this.handleSelectStatus} label={status.name}>{status.name}</li>
                            } else {
                                return <li id={status.id} className='selected mt-1 p-1 rounded' name={status.name} key={status.id} onClick={this.handleSelectStatus} label={status.name}>{status.name}</li>
                            }
                        }) : <li className='selectable mt-1 p-1 rounded'>No available status</li>}
                        </ul>
                </div>
                <div className='col-lg-8 col-xl-8 col-md-12 col-sm-12'>
                    <form onSubmit={handleSubmitStatus}>
                        <div className='row justify-content-center form-inline mb-3'>
                            <label className={regularLabels}>Add new status:</label>
                            <input
                                type='text'
                                className={
                                    validStatus === undefined ? (inputs) : (
                                        validStatus === true ? inputs.concat(inputs, " ", "border border-success") : 
                                        inputs.concat(inputs, " ", "border border-danger")
                                    )
                                }
                                name='statusName' 
                                placeholder='e.g. Ready for Heat'
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
                                name='status'
                                checked={active}
                                onChange={this.handleActive}
                            />
                            <label className='form-check-label'>Active</label>
                        </div>
                        <SpinnerButton 
                            ref='submitButton'
                            name='submitButton'
                            text={(this.state.selectedStatus !== '') ? 'Modify status' : 'Save status'}
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

            </div>)
    }
}
