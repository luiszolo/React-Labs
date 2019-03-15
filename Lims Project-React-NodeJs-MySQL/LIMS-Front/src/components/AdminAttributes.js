import React from 'react';
import axios from 'axios';



import ReactTable from "react-table";
import "react-table/react-table.css";


export default class AdminAtrributes extends React.Component{
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

        }
    }

    handleAtt=(e)=>{
        const nameAtt=e.target.value
        if(nameAtt.length>=1){
            this.setState({
                validOp:true
            })
        }
        else{
            this.setState({
                validOp:false
            })
        }
        this.state.status.forEach((value,index)=>{
            
            if(value.name===nameAtt){
                this.setState({
                    validOp:false
                })
            }
        })

    }

    handleUnitAtt=(e)=>{
        const unitAtt=e.target.value
        if(unitAtt.length>=1){
            this.setState({
                validAtt1: true,
                unitAtt:unitAtt

            })
            }
            else if(unitAtt===''){
                this.setState({
                    validAtt1: false,
                })
            }
    }

    handleRegexAtt=(e)=>{
        const regexAtt=e.target.value
        if(regexAtt.length>=1){
            this.setState({
                validAtt3: true,
                regexAtt:regexAtt
            })
            }
            else if(regexAtt===''){
                this.setState({
                    validAtt3: false,
                    //messageOp:"cant be blank"
                })
            }
    }

    handleTypeAtt=(e)=>{
        const typeAtt=e.target.value
        if(typeAtt.length>=1){
            this.setState({
                validAtt2: true,
                typeAtt:typeAtt
            })
            }
            else if(typeAtt===''){
                this.setState({
                    validAtt2: false,
                })
            }
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

    componentDidMount(){
        const url= "http://10.2.1.94:4000/api/attributes";
        fetch(url,{
            method : "GET"
        }).then(Response => Response.json()).then(res =>{
            this.setState({status:res.Attributes})
            
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


    render(){
        const {
            columns =[
                {
                    Header: "Name",
                    accessor: "name"
                },

    
            
            ], 
            handleAtt,
            handleSubmitAtt,
            handleUnitAtt,
            handleRegexAtt,
            handleTypeAtt,
            state: {
              
                messageOp,
                validOp,
                validAtt1,
                validAtt2,
                validAtt3,
                validSample,
                messageAPI,
        
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
                        disabled={(validOp && validAtt1 && validAtt2 && validAtt3) ? false : true}
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


            <ReactTable
            columns={columns}
            data={this.state.status}
            filtrable
            sortable
            
            
            ></ReactTable>



        </div>)
    }
}
