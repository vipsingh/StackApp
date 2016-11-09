import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

export default class DocToolbar extends Component{
  constructor(props){
    super(props);
  }
  executeCommand=()=>{

  }
  render(){
    return(
      <Toolbar>
        <ToolbarTitle text={this.props.title} />
        <ToolbarGroup>
          <ToolbarSeparator />
          <RaisedButton primary={true} onTouchTap={this.props.saveCommand}
            icon={<FontIcon className="fa fa-save" />} />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="Print" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
