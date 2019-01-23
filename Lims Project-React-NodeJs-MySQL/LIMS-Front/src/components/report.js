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


      validateSample=()=>{
        const sample = this.state.sample
        this.setState({ 
          messageAPI:"",
        });
        if(sample.length===11){
            axios.get(`http://10.2.1.94:4000/api/samples/${sample}`) 
            .then(res => {
                if (res.data.message) { 
                    console.log(res.data.message)
                    this.setState({
                      messageAPI: res.data.message,
                      validOp: true,
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
                messageAPI: "invalid sintaxis"
                
            })
        }
    }

      handleSubmit = event => {
        event.preventDefault();
        const sample =  this.state.sample
   
        axios.get(`http://10.2.1.94:4000/api/logs/${sample}`)
                  .then(res => {
                    if(res.data.message){
                       const tests = res.data.Logs;
                       this.setState({ tests:[] });
                      this.setState({ 
                        messageAPI:res.data.message
                        
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

        var pstyle={color:'red'};

        console.log(this.state.tests)

        return(
            
<div>

            
            <div className="container" id="searchbar">
                <form onSubmit={this.handleSubmit}>
                <h1>Sample Barcodes</h1>
                    <div className="form-inline">
                        <input 
                            id="input"
                            type="text"
                            name="sample1"
                            className={"sample col-lg-3 col-sm-12  form-control"}
                            number={1}
                            placeholder="SA-##-#####"
                            onChange={this.handleChangeSample}
                            value={sample}
                            onBlur={this.validateSample}
                        />
                    <button 
                        type="submit" 
                        className="btn btn-primary col-lg-1 col-sm-3"
                        disabled={validOp}
                        //onBlur={validateOperator}
                    >
                    Search
                    </button>
                        <p style={pstyle} className="col-lg-3 col-sm-3" >{messageAPI}</p>
                    </div>
                </form>
</div>
<table class="table">
  <thead class="thead-gray">
  <th scope="col">User ID</th>
      <th scope="col">Status</th>
      <th scope="col">Test</th>
      <th scope="col">Created On</th>
  </thead>
  <tbody>
        { this.state.tests.map(log =><tr className={"sample col-lg-2 col-4"}><td>{log["UserID"]}</td><td>{log["State"]}</td><td>{log["Test"]}</td><td>{log["On Created"]}</td></tr>)}
  </tbody>
</table>
        </div>)
        }
    }