import React from 'react';
import axios from 'axios';

export default class SampleSearch extends React.Component{
    state = {
        tests: [],
        sample:'',
        validOp:true,
        messageAPI:'',
 
      }
      handleChangeSample = event => {
        this.setState({ 
          sample: event.target.value,
        } );
      }

      // componentDidMount() {
      //   axios.get(`http://10.2.1.94:4000/api/logs/`)// agregarle en el api un filtrado por id y que en un combo lo agreguemos como +{id}
      //     .then(res => {
      //       const tests = res.data.Logs;
      //       this.setState({ tests });
      //     })
      // }

      validateOperator=(e)=>{
        const sample = this.state.sample
        this.setState({ // this is for reseting the inputs
          messageAPI:"",
          
        
        });
        if(sample.length===11){
            axios.get(`http://10.2.1.94:4000/api/samples/${sample}`) //manda el get con el nombre del operador ejemplo: 12345
            .then(res => {
                if (res.data.message) { //si devuelve el no existe se pone que no valida por que pues no existe XD
                    console.log(res.data.message)
                    this.setState({ // this is for reseting the inputs
                      messageAPI:res.data.message,
                      validOp:true,
                    
                    });

                } else  {
                    this.setState({
                        validOp: false,
                    })
                }
            })
        }else if(sample===""){
            this.setState({
                validOp: false,
            })
        }else{
            this.setState({
                validOp: true,
                
            })
        }
    }

      handleSubmit = event => {// This part is creating the new const that are going to take the values from our previus states that have the user input
        event.preventDefault();
        const sample =  this.state.sample
   
        axios.get(`http://10.2.1.94:4000/api/logs/${sample}`)
                  .then(res => {
                    if(res.data==="{}"){
                      this.setState({ // this is for reseting the inputs
                        messageAPI:"No logs for this Sample",
                      });
                    }
                    else{
            const tests = res.data.Logs;
            this.setState({ tests });}
          })
        
        

        
      }


    
      render() {
        const{sample}=this.state;
        const{validOp}=this.state;
        const{messageAPI}=this.state;
        return(


          <ul>
        <div class="container">
        <form onSubmit={this.handleSubmit}>
        
        
        <h1>Sample Barcodes</h1>
                    <div className="form-group">
                        <input 
                        id="input"
                        type="text"
                        name="sample1" 
                        number={1}
                        placeholder="SA-##-#####"
                        onChange={this.handleChangeSample}
                        value={sample}
                        onBlur={this.validateOperator}
                        />
                    
        
                    <button 
                        type="submit" 
                        className="btn btn-primary col-1"
                        disabled={validOp}
                        //onBlur={validateOperator}
                    >
                    Search
                    </button>
                    <p >{messageAPI}</p>
                    </div>
        
         </form>
          <div class="row">
            <div class="col-sm">
            <p>User ID</p>
            { this.state.tests.map(log => <li className={"sample col-lg-2 col-4  "}>{log["UserID"]}</li>)}
            </div>
            <div class="col-sm">
            <p>Status</p>
            { this.state.tests.map(log => <li className={"sample col-lg-2 col-4"}>{log["State"]}</li>)}
            </div>
            <div class="col-sm">
            <p>Test</p>
            { this.state.tests.map(log => <li className={"sample col-lg-2 col-4 "}>{log["Test"]}</li>)}
            </div>
            <div class="col-sm">
            
            <p>Created On</p>
            { this.state.tests.map(log => <li className={"sample col-lg-6 col-4 "}>{log["On Created"]}</li>)}
            </div>
          </div>
          
        </div>
        </ul>
        
        );
        
      }
      
      
    }