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

    return (<div className="row root pt-5 m-0">
      <div className="bg-info col col-sm-2 p-0">
        <nav className="nav flex-column border-right">
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
      <div className="col-sm-10 p-0 component">
          {children.map((child) => {
            if (child.props.label !== activeTest) return undefined;
            return child.props.children;
          })}
        </div>
    </div>
    );
  }
}