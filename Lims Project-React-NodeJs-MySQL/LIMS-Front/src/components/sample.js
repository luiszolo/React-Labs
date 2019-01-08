import React from 'react';

export default class Sample extends React.Component{

    sampleCheck(){

    }

    render(){
        const {
            props: {
              number,
              message,
              format,
            },
          } = this;

        return (<div className="row m-1">
                    <label className="col col-1 mr-1">{"#"+number}</label>
                    <input type="text" className="col col-6 form-control" name={"sample"+number} placeholder={format}/>
                    <label className="col col-4">{message}</label>
        </div>)
    }

}