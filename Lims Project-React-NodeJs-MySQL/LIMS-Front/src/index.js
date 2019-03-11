import React from 'react';
import ReactDOM from 'react-dom';

//Importing components
import Home from './components/Home';
import Navbar from './containers/Navbar';
import Report from './containers/Report';
import Test from './containers/Test';

//Importing CSS file
import './index.css';
import Admin from './containers/Admin';

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
		let app = ['Home'].concat(this.state.tests.map(e => e['name']))
		.concat('Generate Report', 'Admin Site');

		let components = [(<Home/>)].concat(this.state.tests.map(e => (
			<Test name={e.name} samplesLength={e.samplesLength} attributes={e.attributes}/>
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
