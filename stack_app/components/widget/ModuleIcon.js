import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import module_core from 'material-ui/svg-icons/hardware/developer-board';
import Icons from 'app_content/icons';

 const ModuleIcon = (props)=>{
  let MIcon = Icons["module_" + props.module];
  if(MIcon){
    return (<MIcon {...props} />);
  }
  else {
    return (<FontIcon {...props} className='fa fa-file-o' />);
  }
}
export default ModuleIcon;
