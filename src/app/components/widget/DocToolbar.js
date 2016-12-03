import React, {Component, PropTypes} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import OIcon from '../widget/ObjectIcon';

export default class DocToolbar extends Component{
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
  }
  executeCommand=()=>{

  }
  render(){
    return(
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <FlatButton style={{color:this.context.muiTheme.toolbar.color}}
            label={this.props.title}
            icon={<OIcon name={this.props.name} />}
          />
        </ToolbarGroup>
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
