import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import setting_cell from 'material-ui/svg-icons/action/settings-cell';
import Icons from 'app_content/icons';

 const ObjectIcon = (props)=>{
  let MIcon = Icons["object_" + props.name];
  if(MIcon){
    return (<MIcon {...props} />);
  }
  else {
    return (<setting_cell {...props} />);
  }
}
export default ObjectIcon;
