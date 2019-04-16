import React from 'react';

import NavItem from './../components/NavItem';

export default class Navbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTest: 'Home'
		};

		this.onClick = this.onClick.bind(this);
	}

	onClick(test) {
		this.setState({
			activeTest: test
		});
	}

	render(){
		return (
			<div className='row m-0'>
				<nav className='col-lg-2 col-xl-2 col-md-12 col-sm-12 fixed-top bg-info' id='mobileMenu'>
					<div className='breadcrumb'>
						<h1 className='text-center bg-info text-white w-100'>LIMS</h1>
						<ul className='m-0'>
							{
								this.props.children.map(child => {
									const { label } = child.props;
									return (
										<NavItem
											activeTest={ this.state.activeTest }
											key={ label } label = { label }
											onClick={ this.onClick }
										/>
									);
								})
							}
						</ul>
					</div>
					<div className='navbar navbar-default navbar-inverse navbar-fixed-top' id='mobileNav'>
						<div className='container-fluid navbar-header m-0'> 
							<button 
								type='button' 
								className='navbar-toggle collapsed w-100' 
								data-toggle='collapse' 
								data-target='#navCollapse' 
								aria-expanded='false' 
								id='menuButton'
							>
							<img src='images/menu.png' className='buttonImage' alt='button menu'/>
							<h3 className='mx-auto text-white pt-1'>LIMS</h3></button>
						</div>
						<div className='collapse navbar-collapse' id='navCollapse'>
							<ul className='navbar navbar-nav'>
								{
									this.props.children.map(child => {
										const { label } = child.props;
										return (
											<NavItem
												activeTest={ this.state.activeTest }
												key={ label } label = { label }
												onClick={ this.onClick }
											/>
										);
									})
								}
							</ul>
						</div>
					</div>
				</nav>
				<div className='col-lg-10 col-xl-10 col-md-12 col-sm-12 offset-lg-2 p-0'>
					{
						this.props.children.map(child => {
							if (child.props.label !== this.state.activeTest) return undefined;
							return child.props.children;
						})
					}
				</div>
			</div>
		);
	}
}
