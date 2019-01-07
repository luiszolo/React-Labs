import React from 'react';

export default class ElectricityTest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            samples: 10
        }
    }

    render(){
        return(<div>
            <h1>
                Electricity test
            </h1>
            <form>
                <div className="form-group">
                    <label className="pr-1 col col-sm-8 ">
                    Operator ID:
                    <input type="text" className="form-control" name="operator" placeholder="#####"/>
                    </label>
                </div>
            <input type="submit" className="btn btn-primary" value="Submit"/>
            </form>
        </div>)
    }
}