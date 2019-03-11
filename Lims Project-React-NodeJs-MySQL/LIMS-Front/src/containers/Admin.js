import React from 'react';
import axios from 'axios';





export default class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nameStatus:'',
            nameAtt:'',
            name: 'Electricity Test',           //Name of the test
            operator: 0,                        //State of the operator
            messageOp: '',                      //Message for the operator field
            validOp: undefined,                 //Validation state of the operator
            validStatus: undefined,
            validAtt: undefined,
            samples: Array(10).fill(''),        //Array of samples
            messageSamples: Array(10).fill(''), //Array of messages for the samples
            validSample: false,                 //Validation state of the samples
            messageAPI: '',                     //Message of the API
            loading: false,                     //Loading state
            unitAtt:'',
            typeAtt:'',
            regexAtt:'',
            validAttGet: undefined,
            nameTest:'',
            samplelenghtTest:'',
            statusTest:'',
            preStatusTest:'',
            requiredTest:'',
            postStatusTest:'',

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

    handleAtt=(e)=>{
        const nameAtt=e.target.value
        this.setState({
            validAttGet: true,
            messageOp: "",
            nameAtt:nameAtt
            
        })
        if(nameAtt.length>=1){
            
            axios.get(`http://10.2.1.94:4000/api/Attributes/`+ nameAtt) 
            .then(res => {
                if (res.data.message) { 
                    this.setState({
                        validAttGet: true,
                        messageOp: "",
                        nameAtt:nameAtt
                        
                    })
                } 
                else {
                    this.setState({
                        validAttGet: false,
                        messageOp:"Attribute allready exists",
                        nameAtt:nameAtt//recordar quitar
                    })
                }
            })		
            .catch( () => {
                alert('Conection Timed Out');
                this.setState({
                    loading: false,
                    validAtt: false,
                });})
            }
            if(nameAtt===''){
                this.setState({
                    validAtt: false,
                    messageOp:'',
                })
            }
    }

    handleUnitAtt=(e)=>{
        const unitAtt=e.target.value
        if(unitAtt.length>=1){
            this.setState({
                // validAtt: true,
                unitAtt:unitAtt

            })
            }
            else if(unitAtt===''){
                this.setState({
                    // validAtt: false,
                })
            }
    }

    validateAttHandler=(e)=>{
        if(this.state.validAttGet==true && this.state.typeAtt!=''){
            this.setState({
                validAtt: true
            })
            
        }
    }

    handleSamplesLenghtTest=(e)=>{
        const samplelenghtTest=e.target.value
        if(samplelenghtTest.length>=1){
            this.setState({
                samplelenghtTest:samplelenghtTest
            })
            }
            else if(samplelenghtTest===''){
            }
    }

    handleAttributesTest=(e)=>{
        const handleAttributesTest=e.target.value
        if(handleAttributesTest.length>=1){
            this.setState({
                handleAttributesTest:handleAttributesTest
            })
            }
            else if(handleAttributesTest===''){
            }
    }


    handleStatusTest=(e)=>{
        const statusTest=e.target.value
        if(statusTest.length>=1){
            this.setState({
                statusTest:statusTest
            })
            }
            else if(statusTest===''){
            }
    }

    handlePreStatusTest=(e)=>{
        const preStatusTest=e.target.value
        if(preStatusTest.length>=1){
            this.setState({
                preStatusTest:preStatusTest
            })
            }
            else if(preStatusTest===''){
            }
    }

    handleRequiredTest=(e)=>{
        const requiredTest=e.target.value
        if(requiredTest.length>=1){
            this.setState({
                requiredTest:requiredTest
            })
            }
            else if(requiredTest===''){
            }
    }

    handlePostStatusTest=(e)=>{
        const postStatusTest=e.target.value
        if(postStatusTest.length>=1){
            this.setState({
                postStatusTest:postStatusTest
            })
            }
            else if(postStatusTest===''){
            }
    }

    handleTypeAtt=(e)=>{
        const typeAtt=e.target.value
        if(typeAtt.length>=1){
            this.setState({
                validAttGet: true,
                typeAtt:typeAtt
            })
            }
            else if(typeAtt===''){
                this.setState({
                    validAttGet: false,
                })
            }
    }
    handleRegexAtt=(e)=>{
        const regexAtt=e.target.value
        console.log(regexAtt)
        if(regexAtt.length>=1){
            this.setState({
                // validAtt:true,
                regexAtt:regexAtt
                
            })
            console.log(regexAtt)
            }
            else if(regexAtt===''){
                this.setState({
                    // validAtt: false,
                })
            }
    }

    handleStatus=(e)=>{
        const nameStatus=e.target.value
        if(nameStatus.length>=1){
            console.log(nameStatus)
            axios.get(`http://10.2.1.94:4000/api/status/` + nameStatus) 
            .then(res => {
                if (res.data.message) { 
                    this.setState({
                        validStatus: true,
                        messageOp: "",
                    })
                } 
                else {
                    this.setState({
                        messageOp: "The status alredy exist",
                        validStatus: false,
                    })
                }
            })		
            .catch( () => {
                alert('Conection Timed Out');
                this.setState({
                    loading: false,
                    validSample: false,
                });})
            }
            if(nameStatus===''){
                this.setState({
                    validStatus: false,
                })
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

    handleSubmitStatus = event => {
        event.preventDefault();
        this.setState({
            loading:true
        })
        const nameStatus=this.state.nameStatus
		axios.post(`http://10.2.1.94:4000/api/status/add`,{
			name:"Status de Prueba para Altas en Admin tres"
		})
		.then( res=> {
			if (res.data.message==='Insertion completed') {
				this.setState({
					messageAPI: res.data.message,
					validStatus: false,
					loading:false
				})
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




    handleSubmitAtt = event => {
        event.preventDefault();
        this.setState({
            loading:true
        })
        const nameStatus=this.state.nameStatus
        const regex=this.state.regexAtt
		axios.post(`http://10.2.1.94:4000/api/Attributes/add`,{
            name:this.state.nameAtt,
            unit:this.state.unitAtt,
            type:this.state.typeAtt,
            regex:regex
		})
		.then( res=> {
			if (res.data.message==='Insertion completed') {
				this.setState({
					messageAPI: res.data.message,
					validStatus: false,
					loading:false
				})
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



    handleSubmitTest = event => {
        event.preventDefault();
        this.setState({
            loading:true
        })
        const nameStatus=this.state.nameStatus
		axios.post(`http://10.2.1.94:4000/api/tests/add`,{
            name:this.state.nameTest,
            samplesLenght:this.state.samplelenghtTest,
            attributes:this.state.attributes,
            prevStatus:
            {
                name:this.state.prevStatus, 
                prev:this.state.requiredTest
            },
            postStatus:this.state.postStatusTest
		})
		.then( res=> {
			if (res.data.message==='Insertion completed') {
				this.setState({
					messageAPI: res.data.message,
					validStatus: false,
					loading:false
				})
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
            handleSubmitStatus,
            handleStatus,
            handleOperator,
            handleSample,
            handleBlanks,
            handleAtt,
            handleSubmitAtt,
            handleUnitAtt,
            handleRegexAtt,
            handleTypeAtt,
            state: {
                name,
                messageOp,
                validOp,
                messageSamples,
                validSample,
                messageAPI,
                samples,
                validStatus,
                validAtt,
            }
        } = this;

        const format='SA-##-#####'
        const regularLabels = 'col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block'
        const inputs = 'col-md-12 col-sm-12 col-lg-5 col-xl-5 form-control'
        const warningLabels = 'col-md-12 col-sm-12 col-lg-10 col-xl-10 text-danger text-center'

        let operatorInput= inputs
        let data

        // if(validStatus===false){
        //     operatorInput= operatorInput += ' border-danger'
        // }else if(validStatus===true){
        //     operatorInput= operatorInput += ' border-success'
        // }else{
        //     operatorInput = inputs
        // }

        if (this.state.loading) {
          data = <img src='/images/spinner.gif' alt='loading' id='spinner'/>
        } 

        return(
        <div className='content row justify-content-center'>
            <div className='col-lg-4 col-sm-12 m-4'>
                <h1 className='text-center'>{name}</h1>
            </div>
            <div className='col-sm-12 col-xl-10'>
                <form onSubmit={handleSubmitStatus}>
                    <div className='row justify-content-center form-inline mb-3'>
                    
                        <label className={regularLabels}>Status</label>
                        <input
                            type='text'
                            className={operatorInput}
                            name='Status' 
                            placeholder='#####'
                            onBlur={handleStatus}
                        />
                        <label className={warningLabels}>{messageOp}</label>
                    </div>

                    <div className='row justify-content-center'>
					<button
                        type='submit'
                        className='btn btn-primary col-md-6 col-sm-10 col-lg-3'
                        disabled={(validStatus) ? false : true}
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

            <div className='col-lg-4 col-sm-12 m-4'>
                <h1 className='text-center'>Attributes</h1>
            </div>
            <div className='col-sm-12 col-xl-10'>
                <form onSubmit={handleSubmitAtt}>
                    <div className='row justify-content-center form-inline mb-3'>
                    
                        <label className={regularLabels}>Name:</label>
                        <input
                            type='text'
                            className={operatorInput}
                            name='Status' 
                            placeholder='#####'
                            onBlur={handleAtt}
                        />
                        <label className={warningLabels}>{messageOp}</label>
                    </div>
                    <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>Unit:</label>
                    <input
                   
                        type='text'
                        className={operatorInput}
                        name='Status' 
                        placeholder='#####'
                        onBlur={handleUnitAtt}
                    />
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>Type:</label>
                    <input
                        type='text'
                        className={operatorInput}
                        name='Status' 
                        placeholder='#####'
                        onBlur={handleTypeAtt}
                    />
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>Regex:</label>
                    <input
                        type='text'
                        className={operatorInput}
                        name='Status' 
                        placeholder='#####'
                        onBlur={handleRegexAtt}
                    />
                    <label className={warningLabels}>{messageOp}</label>
                </div>

                    <div className='row justify-content-center'>
					<button
                        type='submit'
                        className='btn btn-primary col-md-6 col-sm-10 col-lg-3'
                        // disabled={(validAtt) ? false : true}
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

            <div className='col-lg-4 col-sm-12 m-4'>
                <h1 className='text-center'>Tests</h1>
            </div>
            <div className='col-sm-12 col-xl-10'>
                <form onSubmit={handleSubmitAtt}>
                    <div className='row justify-content-center form-inline mb-3'>
                    
                        <label className={regularLabels}>Name:</label>
                        <input
                            type='text'
                            className={operatorInput}
                            name='Status' 
                            placeholder='#####'
                            onBlur={handleAtt}
                        />
                        <label className={warningLabels}>{messageOp}</label>
                    </div>
                    <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>Samples Lenght:</label>
                    <input
                   
                        type='text'
                        className={operatorInput}
                        name='Status' 
                        placeholder='#####'
                        onBlur={handleUnitAtt}
                    />
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>Attributes:</label>
                    <input
                        type='text'
                        className={operatorInput}
                        name='Status' 
                        placeholder='#####'
                        onBlur={handleTypeAtt}
                    />
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>Status:</label>
                    <input
                        type='text'
                        className={operatorInput}
                        name='Status' 
                        placeholder='#####'
                        onBlur={handleRegexAtt}
                    />
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>Pre Status:</label>
                    <input
                        type='text'
                        className={operatorInput}
                        name='Status' 
                        placeholder='#####'
                        onBlur={handleRegexAtt}
                    />
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>What Test does it Required:</label>
                    <input
                        type='text'
                        className={operatorInput}
                        name='Status' 
                        placeholder='#####'
                        onBlur={handleRegexAtt}
                    />
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>Post Status:</label>
                    <input
                        type='text'
                        className={operatorInput}
                        name='Status' 
                        placeholder='#####'
                        onBlur={handleRegexAtt}
                    />
                    <label className={warningLabels}>{messageOp}</label>
                </div>

                    <div className='row justify-content-center'>
					<button
                        type='submit'
                        className='btn btn-primary col-md-6 col-sm-10 col-lg-3'
                        // disabled={(validAtt) ? false : true}
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
