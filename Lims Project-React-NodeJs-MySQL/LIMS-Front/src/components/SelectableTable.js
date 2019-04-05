import React from 'react';

export default class SelectableTable extends React.Component {
	constructor(props) {
        super(props);
    }
    render(){
        let cssClassName = 'col-lg-8 col-xl-8 col-md-12 col-sm-12 status rounded p-1' //this.props.cssCLassName.concat(' selectableList rounded p-1')
        let cssListItem = 'selectable mt-1 p-1 rounded'
        let cssSelectedListItem = 'selected mt-1 p-1 rounded'
        let cssDisabledListItem = this.props.selectDisable ? cssListItem.concat(' inactive') : cssListItem.concat(' inactive disable')

        return(<div className={cssClassName}>
        <h3 className='header'>{this.props.header}</h3>
        <ul>
        <li id='0' className={cssListItem} onClick={this.props.handleSelectItem}>{'Add ' + this.props.type}</li>
        {(this.props.content.length > 0) ? this.props.content.map((option) => {
            if(this.props.selected !== option.name){
                return <li id={option.id} className={option.actived === 1 ? cssListItem : cssDisabledListItem} name={option.actived} key={option.id} onClick={this.props.handleSelectItem} label={option.name}>{option.name}</li>
            } else {
                return <li id={test.id} className={option.actived === 1 ? cssSelectedListItem : cssDisabledListItem} name={option.actived} key={option.id} onClick={this.props.handleSelectItem} label={option.name}>{option.name}</li>
            }
        }) : ''}
        </ul>
        </div>
    )
    }
}