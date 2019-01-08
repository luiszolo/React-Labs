import React from 'react';

import Sample from './sample.js'

export default class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
            samples: 10
        }
    }

    render(){
        const messages=["Required","Incorrect sintax"]
        return(<div className="col offset-sm-3 col-md-6 col-">
            <h1>Electricity test</h1>
            <form>
                <div className="form-group">
                    <label className="pr-1 form-inline">
                    Operator ID:
                    <input type="text" className="form-control m-1" name="operator" placeholder="#####"/>
                    </label>
                </div>
                <div className="form-group">
                    <Sample
                        number={1}
                        message={messages[0]}
                        format={"SA-##-#####"}
                    />
                    <Sample
                        number={2}
                        message={messages[1]}
                        format={"SA-##-#####"}
                    />
                    <Sample
                        number={3}
                        message={""}
                        format={"SA-##-#####"}
                    />
                    <Sample
                        number={10}
                        message={""}
                        format={"SA-##-#####"}
                    />
                </div>
            <input type="submit" className="btn btn-primary" value="Save data"/>
            </form>
        </div>)
    }
}