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

    return (<div className="row">
      <div className="bg-info">
        <nav className="nav flex-column border-right">
          {children.map((child) => {
            const { label } = child.props;

            return (
              <NavItem
                activeTab={activeTest}
                key={label}
                label={label}
                onClick={onClickTest}
              />
            );
          })}
        </nav>
      </div>
      <div className="container">
          {children.map((child) => {
            if (child.props.label !== activeTest) return undefined;
            return child.props.children;
          })}
        </div>
    </div>
    );
  }
}