import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import module_core from 'material-ui/svg-icons/maps/layers';
import module_purchase from './module_purchase';
import module_sales from './module_sales';
import module_inventory from './module_inventory';

export default {
  module_core,
  module_sales,
  module_purchase,
  module_inventory,
  module_finance : (props)=>(<FontIcon {...props} className='fa fa-money' />)
}
//  module_sales: (props)=>(<FontIcon className="fa fa-save" />)
