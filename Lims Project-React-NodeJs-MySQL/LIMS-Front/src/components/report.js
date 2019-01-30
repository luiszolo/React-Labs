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
        const sample = e.target.value

        this.setState({
            sample: sample,
        })
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
                if(res.data.message){
                    this.setState({
                        tests: [],
                        attributes: [],
                        sampleSearched: "",
                    });
                    this.setState({
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
                        messageAPI: "",
                        validSample: false
                    })
                }
            }).catch( () => alert("Conection Timed Out"));
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

        const regularLabels = "col-md-6 col-sm-12 col-lg-3 col-xl-3 d-block text-center"

        
        return(<div className="container">
                    <div className="row justify-content-center form-inline mb-2">
                       <div className="col-12 row justify-content-center form-inline mb-2">
                        <label className={regularLabels}>Sample Search: </label>
                        <input
                            id="sample"
                            type="text"
                            name="sample"
                            className={"col-md-6 col-sm-12 col-lg-4 col-xl-3 form-control"}
                            placeholder="SA-##-#####"
                            value={sample}
                            onChange={addSample}
                            onBlur={validateSample}
                            />
                       </div>
                
                <div className="row col-12 justify-content-center form-inline mb-2">
                    <button
                        className="btn btn-primary col-md-6 col-sm-10 col-lg-3"
                        onClick={handleSearch}
                        disabled={!validSample}
                    >
                    Search
                    </button>
                </div>
                <div className='row justify-content-center'>
                    <label className={"col-lg-3 col-sm-12 col-md-12 text-center text-danger mt-3"}><p class="Danger">{messageAPI}</p></label>
					</div>
            </div>
            <h3 className="col-12 text-center pb-2">{sampleSearched}</h3>
            <div>
                {(tests.length===0) ? "" : this.renderLogs()}
                {(attributes.length===0) ? "" : this.renderAtributes()}
            </div>
        </div>)
        }
    }