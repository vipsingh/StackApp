import React, {Component, PropTypes} from 'react';
import AppBarUi from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {fullWhite} from 'material-ui/styles/colors';

export default class AppBar extends Component{
  render(){
    return(
      <AppBarUi
            onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}
            title={'App'}
            zDepth={0}
            iconElementRight={
              <div  style={{color:fullWhite}}>
                <IconButton iconClassName="fa fa-gears"  onTouchTap={this.props.onToogleRightDrawer}  iconStyle={{color:fullWhite}}/>
                <FlatButton  style={{color:'inherit'}}
                  label="Admin"
                  icon={<FontIcon className="fa fa-user" />}
                />
              </div>
            }
            style={this.props.style}
            showMenuIconButton={this.props.showMenuIconButton}
        />
    );
  }
}
