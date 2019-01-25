import React from 'react';
import ReactDOM from 'react-dom';

import ElectricityTest from './components/electricity-test.js';
import HeatTest from './components/heat-test.js';
import ChemistryTest from './components/chemistry-test.js';
import SpinnerTest from './components/spinner-test.js';
import GenerateReport from './components/report.js';
import Home from './components/home.js';
import Tests from './components/tests.js';

import './index.css';



class App extends React.Component {
  constructor(props){
      super(props);
      this.state={
          tests: [],
      }
  }

   componentWillMount() {
       fetch("http://10.2.1.94:4000/api/tests/?actived=true")
           .then(res => res.json()) 
           .then(data=> this.setState({tests: data.Tests}));
   }

  render() {
        const title = (<div className="container-fluid text-center bg-info text-white "><h1>LIMS</h1></div>)
        const app =["Home"]
        
        const tests = this.state.tests.map((e)=>{
            return e["name"]
        })
        
        const menu = app.concat(tests) // ["Home","<ElectricityTest/>","<HeatTest/>","<ChemistryTest/>","<SpinnerTest/>","<GenerateReport/>"]
        const comp = [<Home/>,<ElectricityTest/>,<HeatTest/>,<ChemistryTest/>,<SpinnerTest/>,<GenerateReport/>]

        return(<div className="component">
            {title}
            <Tests>
                {menu.map((t, keyT)=>{
                    return (<div label={t}>
                        {comp.map((c,keyC)=>{
                            if(keyT===keyC){
                                return(c)
                            }
                        })}
                    </div>)}
                )}
            </Tests>
        </div>)
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
