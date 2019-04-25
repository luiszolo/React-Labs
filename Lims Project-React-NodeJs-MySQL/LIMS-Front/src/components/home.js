//     Source Name        	Home.js
//     Author            	Josue Montaño    
//     Date            		04/17/19
//     Description        	Render the image of biosoft.
// 
//     Execution        	
// 
// 	   Modifications
//     Date            Author           Description
//     =========       =============    ===========================================
//     04/17/19        Josue Montaño    Adding the header to the file

import React from 'react';

export default class Home extends React.Component{
    render(){
        return(<div className='homeLogo'>
                <img src='images/logo.png' className='logo mx-auto d-block' alt='BSI logo'/>
        </div>)
    }
}