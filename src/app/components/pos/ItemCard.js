import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import ObjectImage from 'stack_app/components/widget/ObjectImage';

const styles = {
    img:{        
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        margin: 'auto',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    title:{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}
export default (props)=>{
  let path = '';
  let dt = props.data;
  return (
    <Paper style={{padding: 5, width: 190, textAlign: 'center'}}>
      <div style={{height: 150, width: 150}}>
        <ObjectImage name={props.objectName} id={dt.id} style={styles.img} />
      </div>
      <div style={styles.title}>{dt.title}</div>
    </Paper>
  );
};
