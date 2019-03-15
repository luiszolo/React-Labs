import React from 'react';
import axios from 'axios';


import ReactTable from "react-table";


import "react-table/react-table.css";



export default class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={
          status:[],
          status2:[],
            nameAtt:'',
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
            solodepruebadetablas:'',
            solodepruebadetablasparaindex:'',

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
            } else if(unitAtt===''){
                this.setState({
                    // validAtt: false,
                })
            }
    }

    validateAttHandler=(e)=>{
        if(this.state.validAttGet===true && this.state.typeAtt!==''){
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
        } else if(samplelenghtTest===''){
        }
    }

    handleAttributesTest=(e)=>{
        const handleAttributesTest=e.target.value
        if(handleAttributesTest.length>=1){
            this.setState({
                handleAttributesTest:handleAttributesTest
            })
        } else if(handleAttributesTest===''){
        }
    }

    handleStatusTest=(e)=>{
        const statusTest=e.target.value
        if(statusTest.length>=1){
            console.log("hola")
            this.setState({
                statusTest:statusTest,
                messageOp:"hola",
            })
        } else if(statusTest===''){
        }
    }

    handlePreStatusTest=(e)=>{
        const preStatusTest=e.target.value
        if(preStatusTest.length>=1){
            this.setState({
                preStatusTest:preStatusTest
            })
        } else if(preStatusTest===''){
        }
    }

    handleRequiredTest=(e)=>{
        const requiredTest=e.target.value
        if(requiredTest.length>=1){
            this.setState({
                requiredTest:requiredTest
            })
        } else if(requiredTest===''){
        }
    }

    handlePostStatusTest=(e)=>{
        const postStatusTest=e.target.value
        if(postStatusTest.length>=1){
            this.setState({
                postStatusTest:postStatusTest
            })
        } else if(postStatusTest==='') {
        }
    }

    handleTypeAtt=(e)=>{
        const typeAtt=e.target.value
        if(typeAtt.length>=1){
            this.setState({
                validAttGet: true,
                typeAtt:typeAtt
            })
            } else if(typeAtt===''){
            this.setState({
                validAttGet: false,
            })
        }
    }
    handleRegexAtt=(e)=>{
        const regexAtt=e.target.value
        
        if(regexAtt.length>=1){
            this.setState({
                // validAtt:true,
                regexAtt:regexAtt
                
            })
         
            }
            else if(regexAtt===''){
                this.setState({
                    // validAtt: false,
                })
            }
    }

    handleStatus=(e)=>{
        const nameStatus=e.target.value
        console.log(this.state.status.map((x, i) => x.name))
        if(nameStatus.length>=1){
            this.setState({
                validOp:true,
                nameStatus:nameStatus
            })
        }
        this.state.status.forEach((value,index)=>{
            console.log(value.name)
            if(value.name===nameStatus){
                this.setState({
                    validOp:false
                })
            }
        })
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
        
		axios.post(`http://10.2.1.94:4000/api/status/add`,{
			name: this.state.nameStatus
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



componentDidMount(){
    const url= "http://10.2.1.94:4000/api/status";
    fetch(url,{
        method : "GET"
    }).then(Response => Response.json()).then(res =>{
        this.setState({status:res.Statuss})
        
    } 
        )
}

deleteRow(name){

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
        status2: [...this.state.status2, item]       // llenamos la info en el arreglo de alado 
      });

}

deleteRow2(name){

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

}


handleAddRow = () => {
    const item = {
      id: this.state.solodepruebadetablasparaindex,
      name: this.state.solodepruebadetablas
    };
    
    this.setState({
      status2: [...this.state.status2, item]
    });
  };

    render(){
        const {
            handleSubmitStatus,
            handleStatus,
            columns =[
            {
                Header: "Name",
                accessor: "name"
                ,filtrable: true
            },
            // {
            //     Header: "Action",
            //     Cell: props=>{
            //         return(
            //             <button className="" 
            //             onClick={()=>{
            //                 this.deleteRow(props.original.name)
                            

            //             }}>Delete</button>
            //         )
            //     }
            // },

        
        ],            
        columns2 =[
 
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Action",
                Cell: props=>{
                    return(
                        <button className="" 
                        onClick={()=>{
                            this.deleteRow2(props.original.name)
                            

                        }}>Delete</button>
                    )
                }
            },

        
        ],
        

            state: {
                name,
                messageOp,
                validOp,
              solodepruebadetablas,
                validSample,
                messageAPI,
             
                validStatus,
              
            }
        } = this;

        
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
                {solodepruebadetablas}
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
                        disabled={(validOp) ? false : true}
                        title={(validOp) ? 'Form is ready' : 'Form not ready'}
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










      <div>




          </div>
       


            <ReactTable
            columns={columns}
            data={this.state.status}
            filtrable
            sortable
            ></ReactTable>




            {/* <ReactTable
            columns={columns2}
            data={this.state.status2}
            
            ></ReactTable> */}

            {/* <ResponsiveTable title="Hello my fellas!" cols={{
                id: 'ID',
                name: 'Status'
            }} rows ={this.state.status}></ResponsiveTable> */}









        </div>)
    }
}
