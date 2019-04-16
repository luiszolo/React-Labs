import React from 'react';

export default class SelectableTable extends React.Component {
    render(){
        let cssClassName = this.props.cssCLassName.concat(' selectableList rounded p-1')
        let cssListItem = 'selectable mt-1 p-1 rounded'
        let cssSelectedListItem = 'selected mt-1 p-1 rounded'
        let cssDisabledListItem = this.props.selectDisabled ? cssListItem.concat(' inactive') : cssListItem.concat(' inactive disabled')
        let cssDisabledSelectedListItem = cssSelectedListItem.concat(' inactive')

        return(<div className={cssClassName}>
        <h3 className='header'>{this.props.header}</h3>
        <ul>{this.props.addNew ? <li id='0' className={cssListItem} onClick={this.props.handleSelectItem}>{'Add ' + this.props.type}</li> : ''}
        {(this.props.content.length > 0) ? this.props.content.map((option) => {
            const exists = (this.props.multipleSelect && this.props.selected !== undefined) ? this.props.selected.filter((item)=> {return item === option.name}) : '1'
            
            if(exists[0] === option.name || this.props.selected.name === option.name){
                return <li id={option.id} className={option.actived === 1 ? cssSelectedListItem : cssDisabledSelectedListItem} name={option.actived} key={option.id} onClick={this.props.handleSelectItem} label={option.name}>{option.name}</li>
            } else {
                return <li id={option.id} className={option.actived === 1 ? cssListItem : cssDisabledListItem} name={option.actived} key={option.id} onClick={this.props.handleSelectItem} label={option.name}>{option.name}</li>
            }
        }) : this.props.content.length === 0 && !this.props.addNew ? <li id='0' className={cssListItem}>{'No ' + this.props.type + ' available'}</li> : ''}
        </ul>
        </div>
    )
    }
}