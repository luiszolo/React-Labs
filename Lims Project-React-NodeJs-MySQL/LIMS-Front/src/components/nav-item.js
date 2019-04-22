//     Source Name        	NavItem.js
//     Author            	Josue Montaño    
//     Date            		04/17/19
//     Description        	Render the button in the navbar and manage his state.
// 
//     Execution        	
// 
// 	   Modifications
//     Date            Author           Description
//     =========       =============    ===========================================
//     04/17/19        Josue Montaño    Adding the header to the file

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

        let className = 'btn btn-light w-100 rounded-0 shadow-none';

        if (activeTest === label) {
            className = 'btn btn-secondary w-100 rounded-0 shadow-none';
        }

        return (
            <button
                className={className}
                onClick={onClick}
                title={label}
                data-toggle='collapse'
                data-target='#navCollapse'
                aria-expanded='false'
            >
            {label}
            </button>
        );
    }
}
