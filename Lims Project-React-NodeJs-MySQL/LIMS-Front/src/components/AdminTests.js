import React from 'react';
import axios from 'axios';



import ReactTable from "react-table";
import "react-table/react-table.css";


export default class AdminTests extends React.Component{
    constructor(props){
        super(props);
        this.state={
            validTest1:undefined,
            validTest2:undefined,
            validTest3:undefined,
            validTest4:undefined,
            tests:[],
            attributes:[],
            attributes2:[],
            status:[],
            status2:[],
            status3:[],
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
            attributeTest:'',

        }
    }
    






    handleBlanks=(e)=>{
        const sampleNumber = parseInt(e.target.name.replace('sample',''),10)
        const sample = e.target.value
        if(sample===''){
            this.clearSamples(sampleNumber)
        }
    }


    handleAttributesTest=(e)=>{
        const attributeTest=e.target.value
        if(attributeTest.length>=1){
            this.setState({
                attributeTest:attributeTest
            })
            }
            else if(attributeTest===''){
            }
    }
    handleSamplesLTest=(e)=>{
        const samplelenghtTest=e.target.value
        if(samplelenghtTest.length>=1){
            this.setState({
                samplelenghtTest:samplelenghtTest,
                validTest1:true,
            })
            }
            else if(samplelenghtTest===''){
                this.setState({
                    validTest1:false,
                })
            }
    }

    handleNameTest=(e)=>{
        const nameTest=e.target.value
        if(nameTest.length>=1){
            this.setState({
                validOp:true,
                nameTest:nameTest
            })
        }
        else{
            this.setState({
                validOp:false
            })
        }
        this.state.tests.forEach((value,index)=>{
            
            if(value.name===nameTest){
                this.setState({
                    validOp:false
                })
            }
        })
    }


    handleStatusTest=(e)=>{
        const statusTest=e.target.value
        if(statusTest.length>=1){
            this.setState({
                statusTest: statusTest === 'on' ? true : false,
                validTest2:true,
            });
            }
            else if(statusTest===''){
                this.setState({
                    validTest2:false,
                })
            }
    }

    handlePreStatusTest=(e)=>{
        const preStatusTest=e.target.value
        console.log("preStatusTes")
        console.log(preStatusTest)
        if(preStatusTest.length>=1){
            this.setState({
                preStatusTest:preStatusTest,
                validTest3:true,
            })
            }
            else if(preStatusTest===''){
                this.setState({
                    validTest3:false,
                })
            }
    }


    handlePostStatusTest=(e)=>{
console.log(this.state.status2)
        if(this.state.status2.length===0){
            this.setState({
                validTest4:false,
            })
            }
            else{
              this.setState({
                    validTest4:true,
                })
            }
    }




    handleSubmitTest = event => {
        event.preventDefault();
        this.setState({
            loading:true
        })
       
        console.log(this.state.status2)
		axios.post(`http://10.2.1.94:4000/api/tests/add`,{
            name:this.state.nameTest,
            samplesLength:this.state.samplelenghtTest,
            attributes:this.state.attributes2.map((x, i) => x.name),
            status: this.state.statusTest,
            prevStatus:
            {
                name:this.state.preStatusTest, 
            },
            postStatus:this.state.status2.map((x, i) => x.name)
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
        


        const url1= "http://10.2.1.94:4000/api/attributes";
        fetch(url1,{
            method : "GET"
        }).then(Response => Response.json()).then(res =>{
            this.setState({attributes:res.Attributes})
        } 
            )

            const url2= "http://10.2.1.94:4000/api/status";
            fetch(url2,{
                method : "GET"
            }).then(Response => Response.json()).then(res =>{
                this.setState({status:res.Statuss})
                
            } 

            
                )
                
                const url4= "http://10.2.1.94:4000/api/status";
                fetch(url4,{
                    method : "GET"
                }).then(Response => Response.json()).then(res =>{
                    this.setState({status3:res.Statuss})
                    
                } 
    
                
                    )

            const url= "http://10.2.1.94:4000/api/tests";
            fetch(url,{
                method : "GET"
            }).then(Response => Response.json()).then(res =>{
                this.setState({tests:res.Tests})
            } 
                )
 
    }
    
    deleteRow(name){
    
        const index = this.state.attributes.findIndex(attributes=>{ // aqui seleccionas el que quieres es como un pointer
            return attributes.name === name
        })
    
        let copyattributes = [...this.state.attributes]
        copyattributes.splice(index,1)                   // estas tres lineas es para el borrado logico 
        this.setState({attributes:copyattributes})
        
        const item = {
            id: index,                              // asignamos al los states los valores seleccionados con el pointer 
            name: name
          };
    
          this.setState({
            attributes2: [...this.state.attributes2, item]       // llenamos la info en el arreglo de alado 
          });
          console.log(item.name)
    
    }
    
    deleteRow2(name){
    
        const index = this.state.attributes2.findIndex(attributes2=>{ // aqui seleccionas el que quieres es como un pointer
            return attributes2.name === name
        })
    
        let copyattributes2 = [...this.state.attributes2]
        copyattributes2.splice(index,1)                   // estas tres lineas es para el borrado logico 
        this.setState({attributes2:copyattributes2})
        
        const item = {
            id: index,                              // asignamos al los states los valores seleccionados con el pointer 
            name: name
          };
    
          this.setState({
            attributes: [...this.state.attributes, item]       // llenamos la info en el arreglo de alado 
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
            status2: [...this.state.status2, item]       // llenamos la info en el arreglo de alado 
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
    
    }
    renderOption(){
        return this.state.status3.map(name=>{
            return <option value={name.name}>{name.name}</option>
        })
    }
    render(){
        const {
            columns =[
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
                            <button className="" 
                            
                            onClick={()=>{
                                this.deleteRow(props.original.name)
                                

                            }}>🡺</button>
                        )
                    }
                },
    
            
            ],            
            columns2 =[
     
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
                            <button className="" 
                            onClick={()=>{
                                this.deleteRow2(props.original.name)
                                
    
                            }}>	🡸</button>
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
                            <button className="" 
                            onClick={()=>{
                                this.deleteRow3(props.original.name)
                                
    
                            }}>🡺</button>
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
                            <button className="" 
                            onClick={()=>{
                                this.deleteRow4(props.original.name)
                                
    
                            }}>	🡸</button>
                        )
                    }
                },
    
            
            ],

            state: {
            
                messageOp,
                validOp,
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
                <h1 className='text-center'>Tests</h1>
            </div>
            <div className='col-sm-12 col-xl-10'>
                <form onSubmit={this.handleSubmitTest}>
                    <div className='row justify-content-center form-inline mb-3'>
                    <div className="container">
{/* <button onBlur={this.handlePostStatusTest()}>hola</button> */}

                        <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                           
                        </div>
                        <div className="col-md-4"></div>
                        </div>

                    </div>
                        <label className={regularLabels}>Name:</label>
                        <input
                            type='text'
                            className={operatorInput}
                            name='Status' 
                            placeholder='#####'
                            onBlur={this.handleNameTest}
                        />
                        <label className={warningLabels}>{messageOp}</label>
                    </div>
                    <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>Samples Lenght:</label>
                    <input
                   
                        type='number'
                        className={operatorInput}
                        name='Status' 
                        placeholder='#####'
                        onBlur={this.handleSamplesLTest}
                    />
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                {/* <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>Attributes:</label>
                    <input
                        type='text'
                        className={operatorInput}
                        name='Status' 
                        placeholder='#####'
                        onBlur={this.handleAttributesTest}
                    />
                    <label className={warningLabels}>{messageOp}</label>
                </div> */}
                <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>Status:</label>
                    <input
                        type='checkbox'
                        className={operatorInput}
                        name='Status' 
                        placeholder='#####'
                        onBlur={this.handleStatusTest}
                    /> Active
                    <label className={warningLabels}>{messageOp}</label>
                </div>
                <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>Pre Status:</label>
                        <select id="status" onBlur={this.handlePreStatusTest} defaultValue="Sample Ready For Electricity" placeholder="Status"  >
                            {this.renderOption()}
                        </select>
                    <label className={warningLabels}>{messageOp}</label>
                </div>

                <div className='row justify-content-center form-inline mb-3'>
                    
                    <label className={regularLabels}>Post Status:</label>
                    <input
                        type='text'
                        className={operatorInput}
                        name='Status' 
                        placeholder='#####'
                        onBlur={this.handlePostStatusTest}
                    />
                    <label className={warningLabels}>{messageOp}</label>
                </div>







                    <div className='row justify-content-center'>
					<button
                        type='submit'
                        className='btn btn-primary col-md-6 col-sm-10 col-lg-3'
                        disabled={(validOp && validTest1 && validTest2&& validTest3&& validTest4) ? false : true}
                        title={(validOp) ? 'Form is ready' : 'Form not ready'}
                    >
                    Save Data
                    {data}
                    </button>
					</div>
					<div id="tables" className='row justify-content-center'>                
                    <ReactTable
                        columns={columns3}
                        data={this.state.status}
                        
                        //defaultPageSize={5}
                    ></ReactTable>
                    <ReactTable
                        columns={columns4}
                        data={this.state.status2}
                        noDataText={"Select a Status..."}>
                    </ReactTable>
					<label id='succes' className={'col-lg-3 col-sm-10 text-center col-md-6  mt-3'}>
                    {messageAPI}
                    
                    </label>
                    
					</div>
                   
                
                </form>

            </div>

            <ReactTable
            columns={columns}
            data={this.state.attributes}
            //defaultPageSize={5}
            ></ReactTable>
            <ReactTable
            columns={columns2}
            data={this.state.attributes2}
            noDataText={"Select an Attribute..."}
            ></ReactTable>

        </div>)
    }
}
