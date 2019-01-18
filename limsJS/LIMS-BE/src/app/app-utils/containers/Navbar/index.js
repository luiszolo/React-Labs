import React from 'react';


import BaseButton from './../../../bootstrap/components/Button/BaseButton';

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: 'Home'
		};

		this.onClickTab = this.onClickTab.bind(this);
	}

	onClickTab(tab) {
		console.log(tab.target.id)
		this.setState({
			activeTab: tab.target.id
		});
	}

	render() {
		const { items } = this.props;
		let buttonClasses ='text-center rounded-0 shadow-none';
		return (
			<nav className='nav'>
						<BaseButton className={buttonClasses}
							id='Home'
							colorSchema='info'
							type='button'
							onClick={this.onClickTab}
							onMouseLeave={ e => console.log('leave') }
							onMouseEnter={ e => console.log('enter') }
							hoverEffectClass='btn-light'
							selectedClass='btn-dark'
							selected={this.state.activeTab === 'Home' ? true : false}
						>
							Home
						</BaseButton>
					{ 
						items.map((element, key) => {
							return(
									<BaseButton className={buttonClasses}
										id={element.name}
										colorSchema='info'
										type='button'
										onClick={ this.onClickTab }
										onMouseLeave={ e => console.log('leave') }
										onMouseEnter={ e => console.log('enter') }
										hoverEffectClass='btn-light'
										selectedClass='btn-dark'
										selected={this.state.activeTab == element.name ? true : false}
									>
										{element.name}
									</BaseButton>
							);
						})
					}
						<BaseButton className={buttonClasses}
							id='report'
							colorSchema='info'
							type='button'
							onClick={ this.onClickTab }
							onMouseLeave={ e => console.log('leave') }
							onMouseEnter={ e => console.log('enter') }
							hoverEffectClass='btn-light'
							selectedClass='btn-dark'
							selected={this.state.activeTab == 'Generate Report' ? true : false}
						>
							Generate Report
						</BaseButton>
			</nav>
		);
	}
};
