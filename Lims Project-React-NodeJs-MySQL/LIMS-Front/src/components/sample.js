import React from 'react';

export default class Sample extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          validated: undefined,
        };
      }

    handleOnBlur=(e)=>{
        console.log(e.target.value.length)
        if(/SA-\d\d-\d\d\d\d\d/.test(e.target.value)&& e.target.value.length===11){
            this.setState({
                validated: true,
            })
        }else if(e.target.value===""){
            this.setState({
                validated: undefined,
            })
        }else{
            this.setState({
                validated: false,
            })
        }
    }

    render(){
        const {
            handleOnBlur,
            props: {
                number,
                format,
            },
            state: {
                validated,
            }
          } = this;

        let message=" ";

        let inputClassName="sample col-lg-3 col-6 form-control";

        if(validated===false){
            inputClassName= "sample col-lg-3 col-6 form-control border-danger"
            message="Incorret syntax"
        }else if(validated===true){
            inputClassName= "sample col-lg-3 col-6 form-control border-success"
            message=" "
        }
        else{
            inputClassName="sample col-lg-3 col-6 form-control"
        }

        return (<div className="row mb-1 form-inline">
                    <label className="col col-lg-5 col-sm-2 text-right d-block">{"#"+number}</label>
                    <input 
                        type="text" 
                        className={inputClassName}
                        name={"sample"+number} 
                        placeholder={format}
                        onBlur={handleOnBlur}
                        required
                    />
                    <label className="col col-lg-4 col-sm-4">{message}</label>
        </div>)
    }
}