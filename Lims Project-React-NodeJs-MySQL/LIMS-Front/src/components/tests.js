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

    return (<div className="row component m-0">
      <div className="col-lg-2 col-xl-2 col-md-3 col-sm-12 p-0 bg-info">
        <nav className="nav flex-column ">
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
        </nav>
      </div>
      <div className="col-lg-10 col-xl-10 col-md-9 col-sm-12 p-4">
          {children.map((child) => {
            if (child.props.label !== activeTest) return undefined;
            return child.props.children;
          })}
        </div>
    </div>
    );
  }
}
