import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

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
            <p>User ID</p>
            { this.state.tests.map(log => <li>{log.operator_Id}</li>)}
            <hr/>
            <p>Status</p>
            { this.state.tests.map(log => <li>{log.status_Id}</li>)}
            <hr/>
            <p>Test</p>
            { this.state.tests.map(log => <li>{log.test_Id}</li>)}
            <hr/>
            <p>Created On</p>
            { this.state.tests.map(log => <li>{log.onCreated}</li>)}
          </ul>



        );
      }
    }