import React, {Component, PropTypes} from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import OIcon from '../widget/ObjectIcon';
import MIcon from '../widget/ModuleIcon';
import { Link } from 'react-router'

//const SelectableList = makeSelectable(List);

class MenuPane extends Component {
  render(){
    return(
      <List>
        <Subheader>Menu</Subheader>
        <Link to ='/'>
          <ListItem leftIcon={<MIcon module='home' />}
            primaryText="Home"/>
        </Link>
        <Link to ='/object/form/Customer'>
          <ListItem leftIcon={<OIcon name='Customer' />}
            primaryText="Customer"/>
        </Link>
        <Link to ='/object/list/Customer'>
          <ListItem  leftIcon={<OIcon name='Customer' />}
            primaryText="Customer List"/>
        </Link>
        <Link to ='/object/list/Partner'>
          <ListItem  leftIcon={<OIcon name='Partner' />}
            primaryText="Partner List"/>
        </Link>
        <Link to ='/object/list/SalesOrder'>
          <ListItem  leftIcon={<OIcon name='Partner' />}
            primaryText="Sales Order"/>
        </Link>
        <Link to ='/object/list/Item'>
          <ListItem  leftIcon={<OIcon name='Partner' />}
          primaryText="Item"/>
        </Link>
        <Link to ='/pos'>
          <ListItem  leftIcon={<OIcon name='Partner' />}
          primaryText="POS"/>
        </Link>
      </List>
    );
  }
}
export default MenuPane;
