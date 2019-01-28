import React from 'react';
import axios from 'axios';

export default class SampleSearch extends React.Component{
    state = {
        sample:"",
        validSample: false,
        messageAPI: "",
        sampleSearched: "",
        tests: [],
        attributes: [],
      }

    addSample = (e) => {
        if(e.target.value.length <= 11){
            this.setState({
                sample: e.target.value,
            })
        }  
    }

    validateSample = (e) => {
        const sample = e.target.value
    
        if(!(/SA-\d\d-\d\d\d\d\d/.test(sample)) && sample!==""){
            this.setState({
                messageAPI: "Incorrect syntax",
                validSample: false,
            })
        }else if(sample===""){
            this.setState({
                messageAPI: "",
                validSample: false,
            })
        }else{
            this.setState({
                messageAPI: "",
                validSample: true,
            })
        }
    }

    handleSearch = () => {
        const sample =  this.state.sample
   
        axios.get(`http://10.2.1.94:4000/api/logs/${sample}`)
            .then(res => {
                console.log(res.data.message)
                if(res.data.message){
                    this.setState({
                        tests: [],
                        attributes: [],
                        sampleSearched: "",
                    });
                    this.setState({    // this is for reseting the inputs
                        messageAPI: res.data.message
                    });
                }else{
                    const tests = res.data.Logs;
                    const attributes = res.data.Attributes;
                    this.setState({
                        sampleSearched: this.state.sample,
                        sample: "",
                        tests,
                        attributes,
                        messageAPI:""
                        
                    })
                }
            })
    }

    renderLogs(){
        const logs = this.state.tests

        return(<div>
            <table className="table">
                <thead class="thead-gray">
                    <tr>
                        <th scope="col">Operator</th>
                        <th scope="col">Status</th>
                        <th scope="col">Test</th>
                        <th scope="col">Created On</th>
                    </tr>
                </thead>
                <tbody>
                {logs.map(log =><tr><td>{log["UserID"]}</td><td>{log["State"]}</td><td>{log["Test"]}</td><td>{log["On Created"]}</td></tr>)}
                </tbody>
            </table>
        </div>)
    }

    renderAtributes(){
        const attributes = this.state.attributes

        return(
            <table class="table">
                <thead className="thead-gray">
                    <tr>
                        <th scope="col">Test</th>
                        <th scope="col">Attribute</th>
                        <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {attributes.map(atrb =><tr><td>{atrb["Test"]}</td><td>{atrb["Attribute"]}</td><td>{atrb["Value"]}</td></tr>)}
                </tbody>
            </table>
        )
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
                sampleSearched,
                tests,
                attributes,
            }
        } = this;

        return(<div className="container">
            <div className="pb-3 form-inline">
                <label className="col-md-4 col-sm-12 col-lg-2 col-xl-2 d-block text-right" htmlFor="sample">Search Sample:</label>
                <input
                    id="sample"
                    type="text"
                    name="sample"
                    className={"col-md-4 col-sm-12 col-lg-5 col-xl-3 form-control"}
                    placeholder="SA-##-#####"
                    value={sample}
                    onChange={addSample}
                    onBlur={validateSample}
                />
                <button
                    className="btn btn-primary col-lg-2 col-4"
                    onClick={handleSearch}
                    disabled={!validSample}
                >
                Search
                </button>
                <label className={"text-danger"}>{messageAPI}</label>
            </div>
            <h3 className="col-12 text-center pb-2">{sampleSearched}</h3>
            <div>
                {(tests.length===0) ? "" : this.renderLogs()}
                {(attributes.length===0) ? "" : this.renderAtributes()}
            </div>
        </div>)
        }
    }