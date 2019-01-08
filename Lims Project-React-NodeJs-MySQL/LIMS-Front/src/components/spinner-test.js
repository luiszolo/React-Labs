import React from 'react';
import axios from 'axios';
import Sample from './sample.js'


export default class SpinnerTest extends React.Component{

        state = {
            id: '', // Table Operator
            value: '', //Table SampleValue
            name:'', //Table Sample
    
          }
            
      handleChange = event => {
        this.setState({ 
          id: event.target.value,
          name: event.target.value,
          value: event.target.value
        } );// este name es el de la variable
      }
    
      handleSubmit = event => {
        event.preventDefault();
    
        const name =  this.state.name // este name2 es puro show no afecta lo imprme en la consola asi nomas //
        const id = this.state.id;
        const value = this.state.value;
    
        axios.post(`http://localhost:4000/api/Samples/add`, {name})// al  parecer este name tiene que ser el nombre de la columna
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }
        render(){
            return(
              <div className="col col-sm-6 offset-sm-4">
              <h1>Spinner Test</h1>
                <form onSubmit={this.handleSubmit}>
                  <label className="pr-1 form-inline">
                    Operator ID:
                    <input type="text" className="form-control m-1" name="id" onChange={this.handleChange} />
                  </label>
                  <label className="pr-1 form-inline">
                    Velocity (RPM):
                    <input type="text" className="form-control m-1" name="value" onChange={this.handleChange} />
                  </label>

    
                  <h1>Sample Barcodes</h1>
    
    
    
                    <div className="form-group">
                        <Sample
                            number={1}
                            message={""}
                            format={"SA-##-#####"}
                        />
                        <Sample
                            number={2}
                            message={""}
                            format={"SA-##-#####"}
                        />
                        <Sample
                            number={3}
                            message={""}
                            format={"SA-##-#####"}
                        />
                        <Sample
                            number={4}
                            message={""}
                            format={"SA-##-#####"}
                        />
                        <Sample
                            number={5}
                            message={""}
                            format={"SA-##-#####"}
                        />
                                                <Sample
                            number={6}
                            message={""}
                            format={"SA-##-#####"}
                        />
                        <Sample
                            number={7}
                            message={""}
                            format={"SA-##-#####"}
                        />
                        <Sample
                            number={8}
                            message={""}
                            format={"SA-##-#####"}
                        />
                        <Sample
                            number={9}
                            message={""}
                            format={"SA-##-#####"}
                        />
                        <Sample
                            number={10}
                            message={""}
                            format={"SA-##-#####"}
                        />
                        
                    </div>
    
    
    
    
                  <button type="submit" className="btn btn-primary col-6">Save Data</button>
    
                  
              </form>
            </div>
            )
        }
    }