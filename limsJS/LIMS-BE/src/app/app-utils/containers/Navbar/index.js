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
		this.setState({
			activeTab: tab
		});
	}

	render() {
		const { items } = this.props;
		let buttonClasses ='text-center rounded-0 shadow-none';
		return (
			<nav className='nav bg-info'>
						<BaseButton className={buttonClasses}
							id='home'
							colorSchema='info'
							type='button'
							onClick={e => console.log('Home')}
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
										onClick={e => console.log(element.name)}
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
							onClick={e => console.log('Generate Report')}
						>
							Generate Report
						</BaseButton>
			</nav>
		);
	}
};
