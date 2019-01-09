import React from 'react';

export default class Sample extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          validated: undefined,
        };
      }

    handleOnBlur=(e)=>{
        if(/SA-\d\d-\d\d\d\d\d/.test(e.target.value)){
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

        let inputClassName="sample form-control";

        if(validated===false){
            inputClassName= "sample form-control border-danger"
            message="Incorret syntax"
        }else if(validated===true){
            inputClassName= "sample form-control border-success"
            message=" "
        }
        else{
            inputClassName="sample form-control"
        }

        return (<div className="row m-1 form-inline">
                    <label className="col col-1 mr-1">{"#"+number}</label>
                    <input 
                        type="text" 
                        className={inputClassName}
                        name={"sample"+number} 
                        placeholder={format}
                        onBlur={handleOnBlur}
                    />
                    <label className="col col-4 mr-1">{message}</label>
        </div>)
    }
}