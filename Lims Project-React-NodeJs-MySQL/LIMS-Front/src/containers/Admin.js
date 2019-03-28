import React from 'react';

import Status from '../components/AdminStatus';
import Tests from '../components/AdminTests';
import Attributes from '../components/AdminAttributes';

export default class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            activeWindow: <Status/>,
            activeTab:0,
        }

        this.handleButtonMenu = this.handleButtonMenu.bind(this)
    }

    handleButtonMenu(e){
        let name = e.target.name

        if (name==='tests'){
            this.setState({
                activeWindow: <Tests/>,
                activeTab:2,
            })
        } else if(name==='attributes') {
            this.setState({
                activeWindow: <Attributes/>,
                activeTab:1,
            })
        } else {
            this.setState({
                activeWindow: <Status/>,
                activeTab:0,
            })
        }
    }

    render(){
        const active = 'col-4 col-lg-2 btn activeButton border border-bottom-0 rounded-0 shadow-none'
        const unactive = 'col-4 col-lg-2 btn btn-light border rounded-0 shadow-none'

        return(<div className='row test-component'>
            <div className='col-12 p-0 adminBar'>
                <button 
                    type='button' 
                    name='status' 
                    className = {(this.state.activeTab === 0) ? active : unactive}
                    onClick={this.handleButtonMenu}
                >
                Status
                </button>
                <button 
                    type='button' 
                    name='attributes' 
                    className = {(this.state.activeTab === 1) ? active : unactive}
                    onClick={this.handleButtonMenu}
                >
                Attributes
                </button>
                <button 
                    type='button'
                    name='tests'
                    className = {(this.state.activeTab === 2) ? active : unactive}
                    onClick={this.handleButtonMenu}
                >
                Tests
                </button>
            </div>
            <div className='container-fluid'>
                {this.state.activeWindow}
            </div>
        </div>)
    }
}
