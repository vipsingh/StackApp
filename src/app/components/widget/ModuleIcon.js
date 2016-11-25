import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Icons from '../../../appContent/icons';

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
