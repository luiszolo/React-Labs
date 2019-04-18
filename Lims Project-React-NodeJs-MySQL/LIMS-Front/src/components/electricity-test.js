import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ElectricityTest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: 'Electricity Test',           //Name of the test
            operator: 0,                        //State of the operator
            messageOp: '',                      //Message for the operator field
            validOp: undefined,                 //Validation state of the operator
            samples: Array(10).fill(''),        //Array of samples
            messageSamples: Array(10).fill(''), //Array of messages for the samples
            validSample: false,                 //Validation state of the samples
            messageAPI: '',                     //Message of the API
            loading: false,                     //Loading state
        }
    }
    
    /*Funtion for update the samples in their position in the array */
    updateSamples=(value,position)=>{                       //Take the parameters value an position. Value is the sample and position is the position in the array
        this.setState((state)=>{                            //Setting the state with an arrow funtion with the parameter state
            let samples = state.samples.map((sample,i)=>{   //Declaring a variable "samples" and assigning the value of the map of the state of samples with a function with the parameters sample as the current value and i as the index in the array
                if(position===i){                           //Condition that say if the position of the parameter given is equal to the index then then change the value for the parameter
                    return sample=value                     //Changing the last value for the new one
                } else {                                    //If the position don't match, return the current value
                    return sample;                          //Return the current value
                }
            })
            return {                                        //Return the array as the new state
                samples,
            };
        })
    }

    /*Funtion for update the samples in their position in the array */
    updateSamplesMessage=(value,position)=>{                                //Take the parameters value an position. Value is the sample and position is the position in the array
        this.setState((state)=>{                                            //Setting the state with an arrow funtion with the parameter state
            const messageSamples = state.messageSamples.map((message,i)=>{  //Declaring a variable "samples" and assigning the value of the map of the state of samples with a function with the parameters sample as the current value and i as the index in the array
                if(i===position){                                           //Condition that say if the position of the parameter given is equal to the index then then change the value for the parameter
                    return message=value                                    //Changing the last value for the new one
                } else {                                                    //If the position don't match, return the current value
                    return message;                                         //Return the current value
                }
            })
            return {                                                        //Return the array as the new state
                messageSamples,
            };
        })
    }

    handleSample=(e)=>{
        const sampleNumber = parseInt(e.target.name.replace('sample',''),10)
        const sample = e.target.value
        let counter=0, counter2=0
        if(sample.length<=11){
            this.updateSamples(sample,sampleNumber - 1)
            if(sample===''){
                this.updateSamplesMessage('', sampleNumber - 1)
            }else if (!(/SA-\d\d-\d\d\d\d\d/.test(sample))){
                this.updateSamplesMessage('Incorrect syntax', sampleNumber - 1)
                this.setState({
                    validSample: false,
                })
            } else {
                this.updateSamplesMessage('', sampleNumber - 1)
                axios.get(`http://10.2.1.94:4000/api/samples/${sample}/Electricity Test`)
                .then(res => {
                    if (res.data.message) {
                        this.updateSamplesMessage(res.data.message, sampleNumber - 1)
                        this.setState({
                            validSample: false,
                        });
                    }else {
                        this.state.samples.forEach((value,index)=>{
                            if(sample===value && index!==sampleNumber - 1){
                                this.updateSamplesMessage('This sample is repeated', sampleNumber - 1 )
                                this.setState({
                                    validSample: false,
                                })
                            }
                        })
                    }
                })		.catch( () => {
                    alert('Conection Timed Out');
                    this.setState({
                        loading: false,
                        validSample: false,
                    });
                });
                this.setState({
                    validSample: true,
                })
                    for (let i=0; i<9; i++){
                    if (this.state.messageSamples[i]==="Incorrect syntax"  || this.state.messageSamples[i]==="This sample is repeated"){
                        console.log("hay una mala en:"+" "+i)
                        counter++
                    }
                    else{
                        counter2++
                    }
                }
                if (counter2==8){
                    this.setState({
                        validSample: true,
                    })
                }
                else{
                    this.setState({
                        validSample: false,
                    })
                }
                console.log(counter2)
            }
        }
    }

    clearSamples=(sampleNumber)=>{
        if (sampleNumber < this.state.samples.length){
            this.updateSamples('', sampleNumber)
            this.updateSamplesMessage('', sampleNumber)
            this.clearSamples(sampleNumber + 1)
        }
    }

    handleBlanks=(e)=>{
        const sampleNumber = parseInt(e.target.name.replace('sample',''),10)
        const sample = e.target.value
        if(sample===''){
            this.clearSamples(sampleNumber)
        }
    }

    handleOperator=(e)=>{
        const operator = e.target.value

        if(/[1-99999]/.test(operator) && operator.length<=5){
            axios.get(`http://10.2.1.94:4000/api/operators/` + operator) 
            .then(res => {
                if (res.data.message) { 
                    this.setState({
                        messageOp: 'The operator doesn\'t exist',
                        validOp: false,
                    })
                } else  {
                    this.setState({
                        operator: operator,
                        messageOp: '',
                        validOp: true,
                    })
                }
            })		.catch( () => {
                alert('Conection Timed Out');
                this.setState({
                    loading: false,
                    validSample: false,
                });})
        }else if(operator===''){
            this.setState({
                messageOp: 'Field can\'t be blank', //that's racist
                validOp: undefined,
            })
        }else{
            this.setState({
                validOp: false,
                messageOp: 'Invalid Syntax',
            })
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            loading:true
        })
        const operator= this.state.operator

        const samples = this.state.samples.filter((sample)=>{return ((/SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11))})
   
		axios.post(`http://10.2.1.94:4000/api/test-forms/add`,{
			operator,
			test: this.state.name,
			samples: samples,
		})
		.then( res=> {
			if (res.data.message==='Insertion completed') {
				this.setState({
					operator: 0, 
					samples: Array(10).fill(''),
					messageAPI: res.data.message,
					validSample: false,
					loading:false
				})
				ReactDOM.findDOMNode(this.refs.firstSample).focus();
			} else {
				this.setState({
					loading:false,
				})
			}
			})
		.catch( () => {
			alert('Conection Timed Out');
			this.setState({
				loading: false
			});
		});
    }

    render(){
        const {
            handleSubmit,
            handleOperator,
            handleSample,
            handleBlanks,
            state: {
                name,
                messageOp,
                validOp,
                messageSamples,
                validSample,
                messageAPI,
                samples,
            }
        } = this;

        const format='SA-##-#####'
        const regularLabels = 'col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
        const inputs = 'col-md-12 col-sm-12 col-lg-5 col-xl-5 form-control'
        const warningLabels = 'col-md-12 col-sm-12 col-lg-10 col-xl-10 text-danger text-center'

        let operatorInput= inputs
        let data

        if(validOp===false){
            operatorInput= operatorInput += ' border-danger'
        }else if(validOp===true){
            operatorInput= operatorInput += ' border-success'
        }else{
            operatorInput = inputs
        }

        if (this.state.loading) {
          data = <img src='/images/spinner.gif' alt='loading' id='spinner'/>
        } 

        return(<div className='content row justify-content-center'>
            <div className='col-lg-4 col-sm-12 m-4'>
                <h1 className='text-center'>{name}</h1>
            </div>
            <div className='col-sm-12 col-xl-10'>
                <form onSubmit={handleSubmit}>
                    <div className='row justify-content-center form-inline mb-3'>
                        <label className={regularLabels}>Operator</label>
                        <input
                            type='text'
                            className={operatorInput}
                            name='operator' 
                            placeholder='#####'
                            onChange={handleOperator}
                        />
                        <label className={warningLabels}>{messageOp}</label>
                    </div>
                    <div>
                        <h5 className='text-center m-4'>Sample Barcodes</h5>
                        <div className='row justify-content-center form-inline mb-2'>
                            <label className={regularLabels}>Sample 1:</label>
                            <input 
                                value={samples[0]}
                                type='text'
                                className={inputs}
                                name={'sample1'} 
                                placeholder={format}
                                onBlur={handleBlanks}
								onChange={handleSample}
								ref='firstSample'
                            />
							<label className={warningLabels}>{messageSamples[0]}</label>
                        </div>
                        <div className='row justify-content-center form-inline mb-2'>
                            <label className={regularLabels}>Sample 2:</label>
                            <input
                                value={samples[1]}
                                type='text'
                                className={inputs}
                                name={'sample2'}
                                placeholder={format}
                                disabled={(/SA-\d\d-\d\d\d\d\d/.test(samples[0]))? false : true}
                                onBlur={handleBlanks}
                                onChange={handleSample}
                            />
                            <label className={warningLabels}>{messageSamples[1]}</label> 
                        </div>
                        <div className='row justify-content-center form-inline mb-2'>
                            <label className={regularLabels}>Sample 3:</label>
                            <input 
                                type='text'
                                value={samples[2]}
                                className={inputs}
                                name={'sample3'} 
                                placeholder={format}
                                disabled={(/SA-\d\d-\d\d\d\d\d/.test(samples[1]))? false : true}
                                onBlur={handleBlanks}
                                onChange={handleSample}
                            />
                            <label className={warningLabels}>{messageSamples[2]}</label> 
                        </div>
                        <div className='row justify-content-center form-inline mb-2'>
                            <label className={regularLabels}>Sample 4:</label>
                            <input 
                                type='text'
                                value={samples[3]}
                                className={inputs}
                                name={'sample4'} 
                                placeholder={format}
                                disabled={(/SA-\d\d-\d\d\d\d\d/.test(samples[2]))? false : true}
                                onBlur={handleBlanks}
                                onChange={handleSample}
                            />
                            <label className={warningLabels}>{messageSamples[3]}</label> 
                        </div>
                        <div className='row justify-content-center form-inline mb-2'>
                            <label className={regularLabels}>Sample 5:</label>
                            <input 
                                type='text'
                                value={samples[4]}
                                className={inputs}
                                name={'sample5'} 
                                placeholder={format}
                                disabled={(/SA-\d\d-\d\d\d\d\d/.test(samples[3]))? false : true}
                                onBlur={handleBlanks}
                                onChange={handleSample}
                            />
                            <label className={warningLabels}>{messageSamples[4]}</label> 
                        </div>
                        <div className='row justify-content-center form-inline mb-2'>
                            <label className={regularLabels}>Sample 6:</label>
                            <input 
                                type='text'
                                value={samples[5]}
                                className={inputs}
                                name={'sample6'} 
                                placeholder={format}
                                disabled={(/SA-\d\d-\d\d\d\d\d/.test(samples[4]))? false : true}
                                onBlur={handleBlanks}
                                onChange={handleSample}
                            />
                            <label className={warningLabels}>{messageSamples[5]}</label> 
                        </div>
                        <div className='row justify-content-center form-inline mb-2'>
                            <label className={regularLabels}>Sample 7:</label>
                            <input 
                                type='text'
                                value={samples[6]}
                                className={inputs}
                                name={'sample7'} 
                                placeholder={format}
                                disabled={(/SA-\d\d-\d\d\d\d\d/.test(samples[5]))? false : true}
                                onBlur={handleBlanks}
                                onChange={handleSample}
                            />
                            <label className={warningLabels}>{messageSamples[6]}</label> 
                        </div>
                        <div className='row justify-content-center form-inline mb-2'>
                            <label className={regularLabels}>Sample 8:</label>
                            <input 
                                type='text'
                                value={samples[7]}
                                className={inputs}
                                name={'sample8'} 
                                placeholder={format}
                                disabled={(/SA-\d\d-\d\d\d\d\d/.test(samples[6]))? false : true}
                                onBlur={handleBlanks}
                                onChange={handleSample}
                            />
                            <label className={warningLabels}>{messageSamples[7]}</label> 
                        </div>
                        <div className='row justify-content-center form-inline mb-2'>
                            <label className={regularLabels}>Sample 9:</label>
                            <input 
                                type='text'
                                value={samples[8]}
                                className={inputs}
                                name={'sample9'} 
                                placeholder={format}
                                disabled={(/SA-\d\d-\d\d\d\d\d/.test(samples[7]))? false : true}
                                onBlur={handleBlanks}
                                onChange={handleSample}
                            />
                            <label className={warningLabels}>{messageSamples[8]}</label> 
                        </div>
                        <div className='row justify-content-center form-inline mb-2'>
                            <label className={regularLabels}>Sample 10:</label>
                            <input 
                                type='text'
                                value={samples[9]}
                                className={inputs}
                                name={'sample10'}
                                placeholder={format}
                                disabled={(/SA-\d\d-\d\d\d\d\d/.test(samples[8]))? false : true}
                                onBlur={handleBlanks}
                                onChange={handleSample}
                            />
                            <label className={warningLabels}>{messageSamples[9]}</label>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
					<button
                        type='submit'
                        className='btn btn-primary col-md-6 col-sm-10 col-lg-3'
                        disabled={(validSample && validOp) ? false : true}
                        title={(validSample && validOp) ? 'Form is ready' : 'Form not ready'}
                    >
                    Save Data
                    {data}
                    </button>
					</div>
					<div className='row justify-content-center'>
					<label id='succes' className={'col-lg-3 col-sm-10 text-center col-md-6  mt-3'}>
                    {messageAPI}
                    </label>
					</div>
                </form>
            </div>
        </div>)
    }
}
