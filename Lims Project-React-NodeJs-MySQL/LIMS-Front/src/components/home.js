import React from 'react';

import '../index.css';

export default class Home extends React.Component{
    render(){
        return(<div className="col col-sm-6 mx-auto d-block">
                    <img src="images/logo.png" className="logo" alt="BSI logo"/>
        </div>
        )
    }
}