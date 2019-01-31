import React from 'react';

import NavItem from './nav-item';

export default class Tests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTest: "Home",
    };
  }

  onClickTest = (test) => {
    this.setState({ activeTest: test });
  }

  render() {
    const {
      onClickTest,
      props: {
        children,
      },
      state: {
        activeTest,
      }
    } = this;

    return (





<header>
    <div className="row justify-content-center component m-0" >
      <div className="col-lg-2 col-xl-2 col-md-12 col-sm-12 p-0 bg-info" id="menuMobilDiv" >
        
      <ul class="breadcrumb">


          {children.map((child) => {
            const { label } = child.props;
        
            return (
              <NavItem
                activeTest={activeTest}
                key={label}
                label={label}
                onClick={onClickTest}
              />
            );})}





  </ul>
  <nav class="navbar navbar-default navbar-inverse navbar-fixed-top" id="navMobil">
    <div class="container-fluid">
      
      <div class="navbar-header" classname="col-sm-1">
      
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false" id="menuButton">
       
        <img src="images/menu.png"  />
        </button>
      
      </div>
      
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="navbar navbar-nav">

          {children.map((child) => {
            const { label } = child.props;
        
            return (
              <NavItem
                activeTest={activeTest}
                key={label}
                label={label}
                onClick={onClickTest}
              />
            );})}
        </ul>
      </div>
    </div>
  </nav>
        
        {/* <nav className="nav flex-column ">
          {children.map((child) => {
            const { label } = child.props;
        
            return (
              <NavItem
                activeTest={activeTest}
                key={label}
                label={label}
                onClick={onClickTest}
              />
            );})}
        </nav> */}










      </div>
      <div className="col-lg-10 col-xl-10 col-md-9 col-sm-12 p-4 mb-4">
          {children.map((child) => {
            if (child.props.label !== activeTest) return undefined;
            return child.props.children;
          })}
        </div>
    </div>
    </header>
    );
  }
}
