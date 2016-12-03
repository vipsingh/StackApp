import React, {Component, PropTypes} from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import OIcon from '../widget/ObjectIcon';
import MIcon from '../widget/ModuleIcon';

//const SelectableList = makeSelectable(List);

class MenuPane extends Component {
  render(){
    return(
      <List>
        <Subheader>Menu</Subheader>
        <ListItem leftIcon={<MIcon module='home' />}
          primaryText="Home"
          href ="#/"
        />
        <ListItem leftIcon={<OIcon name='Customer' />}
          primaryText="Customer"
          href ="#/object/form/Customer"
        />
        <ListItem  leftIcon={<OIcon name='Partner' />}
          primaryText="Partner"
          href ="#/object/form/Partner?id=2"
        />
        <ListItem  leftIcon={<OIcon name='Customer' />}
          primaryText="Customer List"
          href ="#/object/list/Customer"
        />
        <ListItem  leftIcon={<OIcon name='Partner' />}
          primaryText="Partner List"
          href ="#/object/list/Partner"
        />
      </List>
    );
  }
}
export default MenuPane;
