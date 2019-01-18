import React from 'react';

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			baseClass: '',
			cssClasses: 'btn',
			hover: false,
			selected: false
		};
		this.onMouseOver = this.onMouseOver.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
	}

	onMouseOver() {
		this.setState({
			hover: !this.state.hover
		});
	}

	componentWillMount() {
		const { colorSchema } = this.props;
		switch (colorSchema) {
			case 'primary': 
			this.setState({
				baseClass:  'btn-primary',
				cssClasses: this.state.cssClasses.concat(' ', this.state.baseClass)
			});
			break;
	
			case 'secondary':
			this.setState({
				baseClass:  'btn-secondary',
				cssClasses: this.state.cssClasses.concat(' ', this.state.baseClass)
			});
			break;
	
			case 'success':
			this.setState({
				baseClass:  'btn-success',
				cssClasses: this.state.cssClasses.concat(' ', this.state.baseClass)
			});
			break;
			
			case 'danger':
			this.setState({
				baseClass:  'btn-danger',
				cssClasses: this.state.cssClasses.concat(' ', this.state.baseClass)
			});
			break;
	
			case 'warning':
			this.setState({
				baseClass:  'btn-warning',
				cssClasses: this.state.cssClasses.concat(' ', this.state.baseClass)
			});
			break;
	
			case 'info':
			this.setState({
				baseClass:  'btn-info',
				cssClasses: this.state.cssClasses.concat(' ', this.state.baseClass)
			});
			break;
	
			case 'light':
			this.setState({
				baseClass:  'btn-light',
				cssClasses: this.state.cssClasses.concat(' ', this.state.baseClass)
			});
			break;
	
			case 'dark':
			this.setState({
				baseClass:  'btn-dark',
				cssClasses: this.state.cssClasses.concat(' ', this.state.baseClass)
			});
			break;
	
			case 'link':
			this.setState({
				baseClass:  'btn-link',
				cssClasses: this.state.cssClasses.concat(' ', this.state.baseClass)
			});
			break;
		}
	}

	render() {

		const {
			className,
			hoverEffectClass,
			selectedClass,
			id,
			onClick,
			size,
			type
		} = this.props;


		switch(size) {
			case 'large':
			this.setState({ cssClasses: this.state.cssClasses.concat(' ', 'btn-lg')});
			break;

			case 'small':
			this.setState({ cssClasses: this.state.cssClasses.concat(' ', 'btn-sm')});
			break;
		}

		let cssClasses = (className ? this.state.cssClasses.concat(' ', className) : this.state.cssClasses);
		let hoverClass = this.state.hover ? (cssClasses).concat(' ', hoverEffectClass) : cssClasses.concat(' ', this.state.baseClass);
		return ( 
			<button className={
				this.state.selected ? hoverClass.replace(this.state.baseClass, selectedClass) : hoverClass.replace(selectedClass, this.state.baseClass)
				}
				type={type}
				id={id}
				onClick={onClick}
				onMouseLeave={e => {
					this.onMouseOver();
					this.props.onMouseLeave();

				}}
				onMouseEnter={ e => {
					this.onMouseOver();
					this.props.onMouseEnter();
	
				}}>
				{this.props.children}
			</button>
		);
	}
};
