import React, {Component, PropTypes} from 'react';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

const style={

}
class ModuleViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  render(){
    return(
      <div>
        <RaisedButton
            onTouchTap={this.handleTouchTap}
            label="App"
            primary={true}
            style={{width:'100%', height: 48}}
            icon={<FontIcon className="fa fa-list" />}
          / >
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Core" leftIcon={<FontIcon className="fa fa-user" color={blue500} />} />
            <MenuItem primaryText="Sales" leftIcon={<FontIcon className="fa fa-home" />} />
            <MenuItem primaryText="Setting" leftIcon={<FontIcon className="fa fa-list" color={red500} hoverColor={greenA200} />} />
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default ModuleViewer;
