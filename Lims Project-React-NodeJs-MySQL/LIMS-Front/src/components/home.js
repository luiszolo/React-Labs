import React from 'react';
import axios from 'axios';
import '../index.css';

export default class Home extends React.Component{

  constructor(props){
    super(props);
    this.state={
        validateOp: undefined,
        isSubmitDisabled: true,
    }}
    
    state = {
        status: '', 
        samplesLength: '', 
        name:'', 
      }
      handleChangeName = event => {
        this.setState({ 
          name: event.target.value,
        } );// este name es el de la variable
      }

      handleOnBlur=(e)=>{
        if(/^[a-z][a-z\s]*$/g.test(e.target.value)){
            this.setState({
                validateOp: true,
                isSubmitDisabled: false
                
            })

        }else{
            this.setState({
                validateOp: false,
                isSubmitDisabled: true
            })
        }

    }

    // canSubmit() {
    //   const { status, samplesLength, name } = this.state
    //   // TODO: add valid email format validation in this condition
    //   if (samplesLength.length == 1 && status.length == 1 && name.length > 0) {
    //     this.setState({
    //       isSubmitDisabled: false
    //     })
    //   }
    //   else {
    //     this.setState({
    //       isSubmitDisabled: true
    //     })
    //   }
    // }

  handleChangeSampleLenght = event => {
    this.setState({
      samplesLength: event.target.value,
    } );// este name es el de la variable
  }

  handleChangeStatus = event => {
    this.setState({
      status: event.target.value,
    } );// este name es el de la variable
  }

  handleSubmit = event => {
    event.preventDefault();

    const name =  this.state.name 
    const samplesLength=this.state.samplesLength
    const status = this.state.status

    axios.post(`http://localhost:4000/api/tests/add`, {name, samplesLength,status})// al  parecer este name tiene que ser el nombre de la columna
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
    render(){

        return(<div className="col col-sm-6 offset-sm-4">
            <div className="col mx-auto d-block component ">
                <img src="images/logo.png" className="logo pb-3"alt="BSI logo"/>
                </div>
                </div>)
                
    }
}








