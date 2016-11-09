import React, {Component, PropTypes} from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

//const SelectableList = makeSelectable(List);

class MenuPane extends Component {
  render(){
    return(
      <List>
        <Subheader>Menu</Subheader>
        <ListItem
          primaryText="Home"
          href ="#/"
        />
        <ListItem
          primaryText="Customer"
          href ="#/object/form/Customer"
        />
        <ListItem
          primaryText="Partner"
          href ="#/object/form/Partner?id=2"
        />
        <ListItem
          primaryText="Customer List"
          href ="#/object/list/Customer"
        />
        <ListItem
          primaryText="Partner List"
          href ="#/object/list/Partner"
        />
      </List>
    );
  }
}
export default MenuPane;
