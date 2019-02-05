import React from 'react';
import ReactDOM from 'react-dom';

//Importing components
import ElectricityTest from './components/electricity-test.js';
import HeatTest from './components/heat-test.js';
import ChemistryTest from './components/chemistry-test.js';
import SpinnerTest from './components/spinner-test.js';
import GenerateReport from './components/report.js';
import Home from './components/home.js';

import Navbar from './containers/Navbar';
import Test from './containers/Test';

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
        let app = ['Home'].concat(this.state.tests.map(e =>{
            return e['name']
		})).concat('Generate Report1');

		let components = [(<Home/>)].concat(this.state.tests.map(e => {
			console.log(e)
			return (
				<Test name={e.name} sampleLength={10} attributes={[]}/>
			)
		}));

        return(<div>
            <header className='container-fluid bg-info'></header>
            {/* <Tests>
                {menu.map((t, keyT)=>{
                    return(<div label={t}>
                        {comp.map((c,keyC)=>{
                            if(keyT===keyC){
                                return(c)
                            }
                        })}
                    </div>)}
                )}
			</Tests> */}
			<Navbar>
			{
				app.map((test, i) => {
					return (
						<div label={test}>
							{
								components.map((comp, j) => {
									if (i === j) return comp;
								})
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
