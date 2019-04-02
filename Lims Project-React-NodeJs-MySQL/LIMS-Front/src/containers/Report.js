import React from 'react';
import axios from 'axios';


import ResponsiveTable from './../components/ResponsiveTable';


export default class Report extends React.Component{
    state = {
        title: undefined,
        sample: undefined,
        validSample: false,
        messageAPI: undefined,
        logs: undefined,
        attributes: undefined,
      }

    addSample = (e) => {
        const sample = e.target.value

        this.setState({
            sample: sample,
        })
        if(!(/SA-\d\d-\d\d\d\d\d/.test(sample)) && sample!==''){
            this.setState({
                messageAPI: 'Incorrect syntax',
                validSample: false,
            })
        }else if(sample===''){
            this.setState({
                messageAPI: undefined,
                validSample: false,
            })
        }else{
            this.setState({
                messageAPI: undefined,
                validSample: true,
            })
        }

    }

    handleSearch = () => {
        const sample =  this.state.sample
        
        axios.get(`http://localhost:4000/api/logs/find/${sample}`)
            .then(res => {
                if(res.status === 200){
                    this.setState({
                        sampleSearched: this.state.sample,
                        title: sample,
                        logs: res.data.Logs,
                        attributes: res.data.Attributes,
                        messageAPI: undefined,
                        validSample: false
                    })
                }
            }).catch( err =>{
                if (err.response.status !== 200) {
                    this.setState({
                        sample: undefined,
                        logs: undefined,
                        attributes: undefined,
                        messageAPI: err.response.data.message
                    });
                }
            });
	}
	
    render() {
        const {
            addSample,
          
            validateSample,
            handleSearch,
            state: {
                sample,
                validSample,
                messageAPI,
                title,
            }
        } = this;

        const regularLabels = 'col-md-6 col-sm-12 col-lg-3 col-xl-3 d-block text-center'

        
        return(
        <div className='test-component p-4'>
                    <div className='row justify-content-center form-inline m-4'>
                       <div className='col-12 row justify-content-center form-inline mb-2'>
                        <label className={regularLabels}>Sample Search: </label>
                        <input
                            id='sample'
                            type='text'
                            name='sample'
                            className={'col-md-6 col-sm-12 col-lg-4 col-xl-3 form-control'}
                            placeholder='SA-##-#####'
                            value={sample}
                            onChange={addSample}
                            onBlur={validateSample}
                            />
                       </div>
                
                <div className='row col-12 justify-content-center form-inline mb-2'>
                    <button
                        className='btn btn-primary col-md-6 col-sm-10 col-lg-3'
                        onClick={handleSearch}
                        disabled={!validSample}
                    >
                    Search
                    </button>
                </div>
                <div className='row justify-content-center'>
                    <label className={'col-lg-12 col-sm-12 col-md-12 text-center text-danger mt-3'}><p className='Danger'>{messageAPI}</p></label>
					</div>
            </div>
            <h3 className='col-12 text-center pb-2'>{title}</h3>
            <div>
				{
					this.state.logs === undefined ? ('') : (
						<ResponsiveTable title='Sample logs' cols={{
							userID: 'User ID',
							sample: 'Sample' ,
							state: 'State',
							test: 'Test',
							onCreated: 'On Created'
						}} rows={this.state.logs}
                        onClick={this.handletesting}/>
					)
				}
				{
					this.state.attributes === undefined ? ('') : (
						<ResponsiveTable title='Sample attributes' cols={{
							test: 'Test',
							attribute: 'Attribute',
							value: 'Value'
						}} rows={this.state.attributes}/>
					)
				}		
            </div>
        </div>)
        }
    }
