import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

export default class RightDrawer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    style: PropTypes.object,
  };
  state = {
    selectedIndex: 0,
  };
  select = (index) => this.setState({selectedIndex: index});

  render() {
      const {
        open,
        style
      } = this.props;
      return (
        <Drawer openSecondary={true}
        style={style}
        width = {style.width}
        open={open}
        containerStyle={{zIndex: zIndex.drawer - 100}}
        >
          <IconButton iconClassName="fa fa-close"  onTouchTap={this.props.onToogleRightDrawer} />
          <br/>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                      label="Notification"
                      icon={<FontIcon className="fa fa-comment-o" />}
                      onTouchTap={() => this.select(0)}
                    />
                    <BottomNavigationItem
                      label="Tasks"
                      icon={<FontIcon className="fa fa-paper-plane" />}
                      onTouchTap={() => this.select(1)}
                    />
                    <BottomNavigationItem
                      label="Setting"
                      icon={<FontIcon className="fa fa-cogs" />}
                      onTouchTap={() => this.select(2)}
                    />
          </BottomNavigation>
        </Drawer>
      )
  }

}
