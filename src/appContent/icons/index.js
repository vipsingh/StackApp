import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import module_home from 'material-ui/svg-icons/action/home';
import module_core from 'material-ui/svg-icons/maps/layers';
import module_purchase from './module_purchase';
import module_sales from './module_sales';
import module_inventory from './module_inventory';

import object_icons  from './object';

export default {
  module_home,
  module_core,
  module_sales,
  module_purchase,
  module_inventory,
  module_finance : (props)=>(<FontIcon {...props} className='fa fa-money' />),

  ...object_icons
}
//  module_sales: (props)=>(<FontIcon className="fa fa-save" />)
