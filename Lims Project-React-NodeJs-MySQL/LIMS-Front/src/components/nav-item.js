import React from 'react';


export default class NavItem extends React.Component {

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const {
      onClick,
      props: {
        activeTest,
        label,
      },
    } = this;

    let className = 'nav-link btn btn-light w-100 text-left rounded-0';

    if (activeTest === label) {
      className += ' tab-list-active';
    }

    return (
      <button
        className={className}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
}
