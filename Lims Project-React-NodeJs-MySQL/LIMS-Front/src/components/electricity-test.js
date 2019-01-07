import React from 'react';

export default class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
            samples: 10
        }
    }

    render(){
        return(<div className="col offset-sm-3 col-md-6 col-">
            <h1>
                Electricity test
            </h1>
            <form>
                <div className="form-group">
                    <label className="pr-1 form-inline">
                    Operator ID:
                    <input type="text" className="form-control m-1" name="operator" placeholder="#####"/>
                    </label>
                </div>
                <div className="form-group">
                    <label className="pr-1 form-inline">
                    #1
                    <input type="text" className="form-control m-1" name="sample1" placeholder="SA-##-#####"/>
                    </label>
                    <label className="pr-1 form-inline">
                    #2
                    <input type="text" className="form-control m-1" name="sample2" placeholder="SA-##-#####"/>
                    </label>
                    <label className="pr-1 form-inline">
                    #3
                    <input type="text" className="form-control m-1" name="sample3" placeholder="SA-##-#####"/>
                    </label>
                </div>
            <input type="submit" className="btn btn-primary" value="Save data"/>
            </form>
        </div>)
    }
}