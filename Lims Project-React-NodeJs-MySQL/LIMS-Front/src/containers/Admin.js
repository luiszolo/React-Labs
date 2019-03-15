import React from 'react';
import axios from 'axios';


import ReactTable from "react-table";
import Status from '../components/AdminStatus';
import Tests from '../components/AdminTests';
import Attributes from '../components/AdminAttributes';

import "react-table/react-table.css";



export default class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            activeWindow: <Status/>,
        }

        this.handleButtonMenu = this.handleButtonMenu.bind(this)
    }

    handleButtonMenu(e){
        let name = e.target.name

        if (name==='tests'){
            this.setState({
                activeWindow: <Tests/>
            })
        } else if(name==='attributes') {
            this.setState({
                activeWindow: <Attributes/>
            })
        } else {
            this.setState({
                activeWindow: <Status/>
            })
        }
    }


    render(){
        return(<div className='content row test-component'>
            <button 
                type='button' 
                name='status' 
                className = 'col btn btn-light w-100 rounded-0 shadow-none'
                onClick={this.handleButtonMenu}
            >
            Add status
            </button>
            <button 
                type='button' 
                name='attributes' 
                className = 'col btn btn-light w-100 rounded-0 shadow-none'
                onClick={this.handleButtonMenu}
            >
            Add attributes
            </button>
            <button 
                type='button' 
                name='tests' 
                className = 'col btn btn-light w-100 rounded-0 shadow-none'
                onClick={this.handleButtonMenu}
            >
            Add tests
            </button>
            <div>
                {this.state.activeWindow}
            </div>
        </div>)
    }
}
