import React from 'react';
import ReactDOM from 'react-dom';

//Importing components
import Home from './components/home';
import Navbar from './containers/Navbar';
import Report from './containers/Report';
import Test from './containers/Test';

//Importing CSS file
import './index.css';

import Admin from './containers/Admin';
import Axios from 'axios';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            tests: [],
        }
    }

    //Getting tests on load
    componentWillMount() {
        Axios.get('http://localhost:4000/api/tests/by/')
            .then(res => {
                console.log(res)
            })
    }

    //Render function for the app
    render() {
		let app = ['Home'].concat(this.state.tests.map((e) => e['name']))
		.concat('Generate Report', 'Admin Site');

		let components = [(<Home/>)].concat(this.state.tests.map((e) => (
			<Test key={e.name}name={e.name} samplesLength={e.samplesLength} attributes={e.attributes}/>
		))).concat(<Report/>, <Admin/>);

        return(<div>
            <header className='container-fluid bg-info fixed-top'></header>
			<Navbar>
			{
				app.map((test, i) => {
					return (
						<div label={test}>
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
