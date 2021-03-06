//     Source Name        	AdminStatus.js
//     Author            	Josue Montaño    
//     Date            		04/17/19
//     Description        	Render a form to modify or add a new status. Also shows all the status in the DB.
// 
//     Execution        	
// 
// 	   Modifications
//     Date            Author           Description
//     =========       =============    ===========================================
//     04/17/19        Josue Montaño    Adding the header to the file

import React from 'react';
import axios from 'axios';

import SelectableTable from './SelectableTable';
import SpinnerButton from './../components/SpinnerButton';

export default class AdminStatus extends React.Component{
    constructor(props){
        super(props);

        this.state={
            availableStatus: [],
            selectedStatus: '',
            nameStatus: '',
            warningMessage: '',
            validStatus: undefined,
            active: true,
        }

        this.handleSelectStatus = this.handleSelectStatus.bind(this);
        this.handleActive = this.handleActive.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleSubmitStatus = this.handleSubmitStatus.bind(this);
    }

    componentDidMount(){
        const url= 'http://localhost:4000/api/status/by';

        axios.get(url)
        .then((res) => {
            console.log(res.data)
            this.setState({availableStatus: res.data.status})
            }
        )
    }

    handleActive(){
        this.setState({
            active: !this.state.active,
        })
    }

    handleStatus(e){
        const nameStatus = e.target.value

        this.setState({
            nameStatus: nameStatus
        })
        if(nameStatus.trim() !== '' && nameStatus.length > 0){
            this.setState({
                validStatus: true,
                warningMessage: ''
            })
        } else {
            this.setState({
                validStatus: false,
                warningMessage: 'Name can\'t be blank'
            })
        }
        this.state.availableStatus.forEach((value)=>{
            if(value.name === nameStatus){
                this.setState({
                    validStatus: false,
                    warningMessage: 'The status already exists'
                })
            }
        })
    }

    handleSelectStatus(e){
        const status = parseInt(e.target.id)

        if(this.state.selectedStatus.name === e.target.textContent){
            this.setState({
                selectedStatus: '',
                nameStatus: '',
                warningMessage: '',
                validStatus: undefined
            })
        } else {
            this.state.availableStatus.forEach((value) => {
                if(value.id === status){
                    this.setState({
                        selectedStatus: {id: value.id, name: value.name},
                        nameStatus: value.name,
                        warningMessage: '',
                        active: value.actived === 1 ? true : false,
                        validStatus: true
                    })
                }
            })
        }
    }

    handleSubmitStatus(event){
        event.preventDefault();
        
        if(this.state.selectedStatus === '') {
            axios.post('http://localhost:4000/api/status/add', {
                status: {
                    name: this.state.nameStatus,
                    actived: this.state.active,
                }, aux: true
            })
            .then((res) => {
                console.log(res)
                if (res.data.message === 'Insertion completed') {
                    this.refs.submitButton.setState({
                        resultMessage: res.data.message,
                        pass: true
                    });
                    this.setState({
                        nameStatus: '',
                        validStatus: undefined
                    })
                    this.componentDidMount()
                }
            })
            .catch( () => {
                alert('Conection Timed Out');
            });
        } else {
            axios.put('http://localhost:4000/api/status/find/' + this.state.selectedStatus.id, {
                status: {
                    name: this.state.nameStatus,
                    actived: this.state.active,
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    this.refs.submitButton.setState({
                        resultMessage: res.data.message,
                        pass: true
                    });
                    this.setState({
                        selectedStatus: '',
                        nameStatus: '',
                        validStatus: undefined
    
                    })
                    this.componentDidMount()
                } else {
                    console.log(res)
                }
            })
            .catch( err => {
                if (err.response.status !== 200) {
                    this.refs.submitButton.setState({
                        resultMessage: err.response.data.message,
                        pass: false
                    });
                }
            });
        }
    }

    render(){
        const {
            state: {
                selectedStatus,
                nameStatus,
                warningMessage,
                validStatus,
                active,
            }
        } = this;

        const regularLabels = 'col-md-12 col-sm-12 col-lg-3 col-xl-3 d-block text-right'
        const inputs = 'col-md-12 col-sm-12 col-lg-5 col-xl-5 form-control'
        const warningLabels = 'col-md-12 col-sm-12 col-lg-10 col-xl-10 text-danger text-center'

        return(
            <div className='content row justify-content-center'>
                <div className='col-sm-12 m-4'>
                    <h1 className='text-center'>Status</h1>
                </div>
                <SelectableTable
                    cssCLassName={'col-lg-4 col-xl-4 col-md-12 col-sm-12'}
                    selectDisabled={true}
                    header={'Available status'}
                    type={'status'}
                    addNew={false}
                    content={this.state.availableStatus}
                    multipleSelect={false}
                    selected={this.state.selectedStatus}
                    handleSelectItem={this.handleSelectStatus}
                />
                <div className='col-lg-8 col-xl-8 col-md-12 col-sm-12'>
                    <form onSubmit={this.handleSubmitStatus}>
                        <div className='justify-content-center form-inline mb-3'>
                            <label className={regularLabels}>{ selectedStatus === '' ? 'Name:' : 'Change name:' }</label>
                            <input
                                type='text'
                                className={
                                    validStatus === undefined ? (inputs) : (
                                        validStatus === true ? inputs.concat(inputs, ' ', 'border border-success') : 
                                        inputs.concat(inputs, ' ', 'border border-danger')
                                    )
                                }
                                name='statusName' 
                                placeholder='e.g. Sample Ready for Heat'
                                onChange={this.handleStatus}
                                value={nameStatus}
                            />
                            <label className={warningLabels}>{warningMessage}</label>
                        </div>
                        <div className='row justify-content-center form-inline mb-3'>
                            <label>Status:</label>
                            <input
                                id='status'
                                type='checkbox'
                                className='form-check-input ml-3'
                                name='status'
                                checked={active}
                                onChange={this.handleActive}
                            />
                            <label htmlFor='status'className='form-check-label'>{ active ? 'Active' : 'Inactive' }</label>
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
