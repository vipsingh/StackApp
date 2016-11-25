import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Icons from '../../../appContent/icons';

 const ObjectIcon = (props)=>{
  let MIcon = Icons["object_" + props.name];
  if(MIcon){
    return (<MIcon {...props} />);
  }
  else {
    return (<FontIcon {...props} className='fa fa-file-o' />);
  }
}
export default ObjectIcon;
