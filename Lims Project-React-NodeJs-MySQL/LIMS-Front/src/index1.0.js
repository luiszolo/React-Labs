import React from 'react';
import ReactDOM from 'react-dom';

import NavItem from './components/nav-item.js';
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
            test: 0,
        }
    }
/*
    handleClick(i){
        switch(i){
            case 'Electricity test':
                this.setState({test: 1})
                break;
            case 'Heat test':
                this.setState({test: 2})
                break;
            case 'Chemistry test':
                this.setState({test: 3})
                break;
            case 'Spinner test':
                this.setState({test: 4})
                break;
            case 'Generate Report':
                this.setState({test: 5})
                break;
            default:
                this.setState({test: 0})
        }
    }
*/
    render() {
        const title = (<div className="container-fluid text-center bg-info text-white">
        <h2>LIMS</h2>
        </div>)
        const tests = ['Electricity test','Heat test','Chemistry test','Spinner test']
        const panel =  (<div className="bg-info ">
                <nav className="nav flex-column border-right">
                    <NavItem key='Home' value='Home' onClick={() => this.handleClick('Home')}/>
                    {tests.map((element)=>{
                    return <NavItem
                                key={element}
                                value={element}
                                onClick={() => this.handleClick(element)}
                            />})}
                    <NavItem key='Generate Report' value='Generate Report' onClick={() => this.handleClick('Generate Report')}/>
                </nav>
            </div>)
        return(<div>
            {title}
            <Tests>
                <div label="Home">
                    <Home/>
                </div>
                {tests.map((element)=>{
                    return (<div label={element}>
                        <ElectricityTest/>
                    </div>)}
                )}
                <div label="Generate report">
                    <GenerateReport/>
                </div>
            </Tests>
        </div>)
/*
        if(this.state.test===1){
            return (<div className="row">
                {title}
                {panel}
                <ElectricityTest />
            </div>)
        }
        else if(this.state.test===2){
            return (<div className="row">
                {title}
                {panel}
                <HeatTest />
            </div>)
        }
        else if(this.state.test===3){
            return (<div className="row">
                {title}
                {panel}
                <ChemistryTest />
            </div>)
        }
        else if(this.state.test===4){
            return (<div className="row">
                {title}
                {panel}
                <SpinnerTest />
            </div>)
        }
        else if(this.state.test===5){
            return (<div className="row">
                {title}
                {panel}
                <SearchSample />
            </div>)
        }
        else{
            return (<div className="row">
                {title}
                {panel}
                <Home />
            </div>)
        }
        */
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

