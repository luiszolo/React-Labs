import React from 'react';

export default class SampleSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            logs: []
        }
    }

    componentWillMount() {
        fetch("http://10.2.1.94:4000/api/logs")
            .then(res => res.json())
            .then(data=> this.setState({logs: data.Tests}));
    }

    render(){
        console.log()
        return(
            <div className="col col-sm-6 offset-sm-4">
                <h1>
                this is the report page
                </h1>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non maiores inventore in voluptatibus enim neque laboriosam vero vitae recusandae perspiciatis commodi unde dignissimos aspernatur assumenda culpa quisquam, architecto a dolorem?
                </p>
            </div>
        )
    }
}