import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
export default class SampleSearch extends React.Component{
    state = {
        tests: []
      }
    
      componentDidMount() {
        axios.get(`http://10.2.1.94:4000/api/logs/`)
          .then(res => {
            const tests = res.data.Logs;
            this.setState({ tests });
          })
      }
    
      render() {
        return (
          <ul>
            { this.state.tests.map(log => <li>{log.onCreated}</li>)}
            { this.state.tests.map(log => <li>{log.operator_Id}</li>)}
          </ul>
          
        )
      }
    }