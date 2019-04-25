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
        axios.get('http://localhost:4000/api/tests/by')
            .then(res => {
                this.setState({
                    tests: res.data.tests.actived
                });
            })
    }

    //Render function for the app
    render() {
		let app = ['Home'].concat(this.state.tests.map((e) => e['name']))
		.concat('Generate Report', 'Admin Site');

		let components = [(<Home key={'Home'}/>)].concat(this.state.tests.map((e) => {
            const status = {
                current: e.initial_State,
                required: e.require_State
            }
            
			return (<Test key={e.name} name={e.name} samplesLength={e.samplesLength} attributes={e.attributes} testStatus={status}/>)
		})).concat(<Report key={'Report'}/>, <Admin key={'Admin'}/>);
        return(<div>
            <header className='container-fluid bg-info fixed-top'></header>
			<Navbar>
			{
				app.map((test, i) => {
					return (
						<div key={i} label={test}>
							{
								components.map((comp, j) => i === j ? comp : null)
							}
						</div>
					);
				})
			}
			</Navbar>
        </div>)
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
