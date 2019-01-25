import React from 'react';
import axios from 'axios';

export default class SampleSearch extends React.Component{
    state = {
        sample:'',
        tests: [],
        validSample: undefined,
        messageAPI:'',
        attributes:[]
      }

      handleChangeSample = event => {
        this.setState({ 
            sample: event.target.value,
        } );
      }

      validateSample=(e)=>{
        const sample = e.target.value
    
        if(!(/SA-\d\d-\d\d\d\d\d/.test(sample)) && sample!==""){
            this.setState({
                messageSample: "Incorrect syntax",
                validSample: false,
            })
        }else if(sample===""){
            this.setState({
                messageSample: "",
                validSample: false,
            })
        }else{
            axios.get(`http://10.2.1.94:4000/api/samples/${sample}`)
            .then(res => {
                if (res.data.message) {
                    this.setState({
                        messageSample: res.data.message,
                        validSample: false,
                    })
                } else {
                    this.setState({
                        messageSample: "",
                        validSample: true,
                    })
                }
            })
        }
    }

      handleSubmit = event => {
        event.preventDefault();
        const sample =  this.state.sample
   
        axios.get(`http://10.2.1.94:4000/api/logs/${sample}`)
                  .then(res => {
                    if(res.data.message){
                        this.setState({ tests:[] ,
                        attributes:[]});
                        this.setState({    // this is for reseting the inputs
                            messageAPI: res.data.message
                        });
                    }
                    else{
            const tests = res.data.Logs;
            const attributes = res.data.Attributes;
            this.setState({ tests,attributes,messageAPI:"" });}
          })
      }
    
      render() {
        const{sample}=this.state;
        const{messageAPI}=this.state;

        console.log(this.state.tests)

        return(<div className="container" id="table">
            <div className="offset-3">
                <form onSubmit={this.handleSubmit}>
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
                            className="btn btn-primary col-lg-2 col-4"
                            disabled={false}
                        >
                        Search
                        </button>
                        <p id="error">
                        {messageAPI}
                        </p>
                    </div>
                </form>
            </div>
            <div>
                <table class="table table-info">
                    <thead class="thead-gray">
                        <tr>
                            <th scope="col">Samples</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Status</th>
                            <th scope="col">Test</th>
                            <th scope="col">Created On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tests.map(log =><tr><td>{log["Sample"]}</td><td>{log["UserID"]}</td><td>{log["State"]}</td><td>{log["Test"]}</td><td>{log["On Created"]}</td></tr>)}
                        
                    </tbody>
                    
                </table>
               {this.state.attributes ? ( <table class="table table-info">
                    <thead class="thead-gray">
                        <tr>
                            <th scope="col">Test</th>
                            <th scope="col">Attribute</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.attributes.map(atrb =><tr><td>{atrb["Test"]}</td><td>{atrb["Attribute"]}</td><td>{atrb["Value"]}</td></tr>)}
                        
                    </tbody>
                    
                </table>) : ''}
                
            </div>
        </div>)
        }
    }