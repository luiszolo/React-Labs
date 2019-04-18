import React from 'react';

export default props => <a className={'card-text'.concat(' ', props.className)} href={props.href}>{props.text}</a>
