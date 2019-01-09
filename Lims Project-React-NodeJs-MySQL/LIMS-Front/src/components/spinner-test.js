import React from "react";
import axios from 'axios';
import Sample from './sample.js'
const initialState = {
  id: "",
  value: "",
  name: "",
  idError: "",
  valueError: "",
  nameError: ""
};

export default class ValiationForm extends React.Component {

      

        state = initialState;
      
        handleChange = event => {
          const isCheckbox = event.target.type === "checkbox";
          this.setState({
            [event.target.id]: isCheckbox
              ? event.target.checked
              : event.target.value
          });
        };
      
        validate = () => {
          let idError = "";
          let valueError = "";
          // let nameError = "";
      
          if (!this.state.id) {
            idError = "Operator ID cannot be blank";
          }
          if (!this.state.id.lenght < 5) {
            idError = "Caracter count not valid. Must be more than 5 Digits";
          }
      
          if (!this.state.value.includes("@")) {
            valueError = "invalid value";
          }
      
          if (valueError || idError) {
            this.setState({ valueError, idError });
            return false;
          }
      
          return true;
        };
      
        handleSubmit = event => {
          event.preventDefault();
          const isValid = this.validate();
          if (isValid) {
            console.log(this.state);
            // clear form
            this.setState(initialState);
          }
        };
      
        render() {
          return (
            <form onSubmit={this.handleSubmit}>
            
              <div>
              <label className="pr-1 form-inline">
              Operator Id
                <input className="form-control m-1"
                  name="id"
                  placeholder="Operator Id"
                  value={this.state.id}
                  onChange={this.handleChange}
                />
                </label>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.idError}
                </div>
              </div>
              
              <div>
              
              <label className="pr-1 form-inline">
              Velocity (RPM)
                <input className="form-control m-1"
                  name="value"
                  placeholder="RPM"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                </label>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.valueError}
                </div>
              </div>


              <div>
              <Sample
                        number={1}
                        message={""}
                        format={"SA-##-#####"}
                  type="name"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.nameError}
                </div>
              </div>

              <div>
              <Sample
                        number={2}
                        message={""}
                        format={"SA-##-#####"}
                  type="name"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.nameError}
                </div>
              </div>

                            <div>
              <Sample
                        number={3}
                        message={""}
                        format={"SA-##-#####"}
                  type="name"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.nameError}
                </div>
              </div>

                            <div>
              <Sample
                        number={4}
                        message={""}
                        format={"SA-##-#####"}
                  type="name"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.nameError}
                </div>
              </div>

                            <div>
              <Sample
                        number={5}
                        message={""}
                        format={"SA-##-#####"}
                  type="name"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.nameError}
                </div>
              </div>

                            <div>
              <Sample
                        number={6}
                        message={""}
                        format={"SA-##-#####"}
                  type="name"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.nameError}
                </div>
              </div>

                            <div>
              <Sample
                        number={7}
                        message={""}
                        format={"SA-##-#####"}
                  type="name"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.nameError}
                </div>
              </div>

                            <div>
              <Sample
                        number={8}
                        message={""}
                        format={"SA-##-#####"}
                  type="name"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.nameError}
                </div>
              </div>

                            <div>
              <Sample
                        number={9}
                        message={""}
                        format={"SA-##-#####"}
                  type="name"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.nameError}
                </div>
              </div>

                            <div>
              <Sample
                        number={10}
                        message={""}
                        format={"SA-##-#####"}
                  type="name"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.nameError}
                </div>
              </div>


              <button type="submit" className="btn btn-primary col-6">submit</button>
            </form>
          );
        }
      }