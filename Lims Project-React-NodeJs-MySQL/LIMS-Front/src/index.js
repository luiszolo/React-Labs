//     Source Name        	index.js
//     Author            	Josue Montaño    
//     Date            		04/17/19
//     Description        	Render the navbar and passes the data of the tests to the test component.
// 
//     Execution        	
// 
// 	   Modifications
//     Date            Author           Description
//     =========       =============    ===========================================
//     04/17/19        Josue Montaño    Adding the header to the file

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//Importing components
import Home from './components/home';
import Navbar from './containers/Navbar';
import Report from './containers/Report';
import Test from './containers/Test';
import Admin from './containers/Admin';

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
        fetch('http://10.2.1.94:4000/api/tests/?actived=true')
            .then(res => res.json()) 
            .then(data=> this.setState({ //Saving the tests in 'tests' state
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
        }).concat('Generate Report')
        
        const menu = app.concat(tests) //Adding 'Home' to the menu ['Home','ElectricityTest','HeatTest','ChemistryTest','SpinnerTest','GenerateReport'] 
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
