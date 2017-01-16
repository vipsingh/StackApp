import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

export default (props)=>{
  let l_letter = props.title.substr(0,1).toUpperCase();
  return (
    <Paper style={{padding: 5}}>
      <div className='row'>
        <div className='col-xs-8'>{props.title}</div>
      </div>
      <div className='row'>
        <div className='col-xs-4'>
          <Avatar>{l_letter}</Avatar>
        </div>
        <div className='col-xs-8'>
          {props.title1}
        </div>
      </div>
    </Paper>
  );
};
