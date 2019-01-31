import React from 'react';
import ReactDOM from 'react-dom';

//Importing components
import ElectricityTest from './components/electricity-test.js';
import HeatTest from './components/heat-test.js';
import ChemistryTest from './components/chemistry-test.js';
import SpinnerTest from './components/spinner-test.js';
import GenerateReport from './components/report.js';
import Home from './components/home.js';
import Tests from './components/tests.js';

//Importing CSS file
import './index.css';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            tests: [],
        }
    }

    //Getting tests on load
    componentWillMount() {
        fetch("http://10.2.1.94:4000/api/tests/?actived=true")
            .then(res => res.json()) 
            .then(data=> this.setState({ //Saving the tests in "tests" state
                tests: data.Tests
            })
            );
    }

    //Render function for the app
    render() {
        const app =['Home']
        
        //Moving state to a constant
        const tests = this.state.tests.map((e)=>{
            return e['name']
        })
        
        const menu = ['Home','ElectricityTest','HeatTest','ChemistryTest','SpinnerTest','GenerateReport'] //Adding "Home" to the menu app.concat(tests)
        const comp = [<Home/>,<ElectricityTest/>,<HeatTest/>,<ChemistryTest/>,<SpinnerTest/>,<GenerateReport/>] //Array of the test components

        return(<div>
            <header className='container-fluid bg-info'></header>
            <Tests>
                {menu.map((t, keyT)=>{
                    return(<div label={t}>
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
