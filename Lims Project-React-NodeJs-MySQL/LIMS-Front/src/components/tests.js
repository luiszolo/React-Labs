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

    return (<div className="row m-0" >
        <nav className = 'col-lg-2 col-xl-2 col-md-2 col-sm-12 fixed-top bg-info' id="menuMobilDiv">
            <div className='breadcrumb p-0'>
                <h1 className='text-center bg-info text-white w-100'>LIMS</h1>
                <ul>
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
            <div class="navbar navbar-default navbar-inverse navbar-fixed-top" id="navMobil">
                <div class="navbar-header w-100" classname="col-sm-1">
                    <button type="button" class="navbar-toggle collapsed float-left" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false" id="menuButton">
                        <img src="images/menu.png" alt='button menu'/>
                    </button>
                    <h3 className='text-center bg-info text-white'>LIMS</h3>
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
        <div className="col-lg-10 col-xl-10 col-md-9 col-sm-12 offset-md-2">
            {children.map((child) => {
            if (child.props.label !== activeTest) return undefined;
            return child.props.children;
            })}
        </div>
    </div>
    );
  }
}
