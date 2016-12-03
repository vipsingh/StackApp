import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

export default (props)=>{
  let l_letter = props.title.substr(0,1).toUpperCase();
  return (
    <Paper style={{padding: 5}}>
      <div style={{display:'flex', boxSizing: 'border-box', position: 'relative', whiteSpace: 'nowrap'}}>
        <Avatar>{l_letter}</Avatar>
        <div>
          {props.title}
        </div>
      </div>
    </Paper>
  );
};
