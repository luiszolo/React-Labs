import React from 'react';
import axios from 'axios';

export default class SampleSearch extends React.Component{
    state = {
        tests: [],
 
      }
    
      componentDidMount() {
        axios.get(`http://10.2.1.94:4000/api/logs/`)// agregarle en el api un filtrado por id y que en un combo lo agreguemos como +{id}
          .then(res => {
            const tests = res.data.Logs;
            this.setState({ tests });
          })
      }
    
      render() {

        const { tableData } = this.state;
        return (
          <ul>
        <div class="container">
          <div class="row">
            <div class="col-sm">
            <p>User ID</p>
            { this.state.tests.map(log => <li className={"sample col-lg-2 col-4  "}>{log.operator_Id}</li>)}
            </div>
            <div class="col-sm">
            <p>Status</p>
            { this.state.tests.map(log => <li className={"sample col-lg-2 col-4"}>{log.status_Id}</li>)}
            </div>
            <div class="col-sm">
            <p>Test</p>
            { this.state.tests.map(log => <li className={"sample col-lg-2 col-4 "}>{log.test_Id}</li>)}
            </div>
            <div class="col-sm">
            
            <p>Created On</p>
            { this.state.tests.map(log => <li className={"sample col-lg-6 col-4 "}>{log.sample_Id}</li>)}
            </div>
          </div>
        </div>
        </ul>


          
            

            

            

            
 
          



        );
      }
    }