import React, {Component, PropTypes} from 'react';
import { IndexLink, Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import spacing from 'material-ui/styles/spacing';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Alert from 'react-s-alert';
import Paper from 'material-ui/Paper';

import LoadingIndicator from './widget/LoadingIndicator';
import LeftDrawer from './layout/LeftDrawer';
import AppBar from './layout/AppBar';
import RightDrawer from './layout/RightDrawer';

import 'react-s-alert/dist/s-alert-default.css';

const theme_var = {
    "body" : {"fontSize": '13px'},
    "spacing": {
        "iconSize": 18, "desktopGutter": 12, "desktopGutterMore": 16,
        "desktopGutterLess": 8, "desktopGutterMini": 6,
        "desktopKeylineIncrement": 48, "desktopDropDownMenuItemHeight": 24,
        "desktopDropDownMenuFontSize": 15, "desktopDrawerMenuItemHeight": 42,
        "desktopSubheaderHeight": 26, "desktopToolbarHeight": 38
    },
    "fontFamily": "Roboto,sans-serif",
    "palette": {
        "primary1Color": "#00bcd4", "primary2Color": "#0097a7", "primary3Color": "#bdbdbd",
        "accent1Color": "#ff4081", "accent2Color": "#f5f5f5", "accent3Color": "#9e9e9e",
        "textColor": "rgba(0,0,0,0.87)",
        "secondaryTextColor": "rgba(0,0,0,0.54)",
        "alternateTextColor": "#ffffff",
        "canvasColor": "#ffffff",
        "borderColor": "#e0e0e0",
        "disabledColor": "rgba(0,0,0,0.3)",
        "pickerHeaderColor": "#00bcd4",
        "clockCircleColor": "rgba(0,0,0,0.07)",
        "shadowColor": "rgba(0,0,0,1)",

        "infoColor": "#23b7e5", "successColor": "#27c24c", "dangerColor":"#f05050", "warningColor":"#ff902b"//
    },
    "themeName": "LightTheme",
    "button": {
        "height": 32, "minWidth": 64
    },
    "toolbar": { "height": 42, "titleFontSize": 14 },
    "tableHeaderColumn": { "height": 38, "spacing": 8 },
    "tableRowColumn": { "height": 32, "spacing": 8 },
    "tableRow": { "height": 32, "stripeColor": "#f9f9f9" },
    "menuItem": { "dataHeight": 18, "height": 32, "padding": 8 },
    "menuSubheader": { "padding": 12 },
    "tableHeader" : {"backgroundColor": "#f7f9fa"},

    "textFieldStyle" : {"fontSize": '13px'}//
};
class CoreLayout extends Component{
  static childContextTypes = {
    muiTheme: PropTypes.object,
  };
  state = {
    navDrawerOpen: false,
    rightDrawerOpen: false
  };
  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme(theme_var),
    });
  }
  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }
  handleTouchTapLeftIconButton = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  };

  handleToogleRightDrawer = () => {
    this.setState({
      rightDrawerOpen: !this.state.rightDrawerOpen,
    });
  };

  handleChangeRequestNavDrawer = (open) => {
    this.setState({
      navDrawerOpen: open,
    });
  };

  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        //zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
      },
      root: {
        paddingTop: theme_var.spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: theme_var.spacing.desktopGutterLess,
      },
      contentWhenMedium: {
        margin: theme_var.spacing.desktopGutter,//`${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      footer: {
        textAlign: 'center',
      },
      navDrawer: {
        width: 200
      },
      rightDrawer:{
        width: 250
      }
    };

    if (this.props.width === MEDIUM || this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles;
  }

  render() {
    const {location,children} = this.props;
    let {  navDrawerOpen, rightDrawerOpen} = this.state;
    const {
      prepareStyles,
    } = this.state.muiTheme;
    const router = this.context.router;
    const styles = this.getStyles();
    let docked = false;
    let showMenuIconButton = true;
    if (this.props.width === LARGE) {
      docked = true;
      navDrawerOpen = true;
      showMenuIconButton = false;

      styles.navDrawer.zIndex = styles.appBar.zIndex - 1;

      styles.root.paddingLeft = styles.navDrawer.width;
      styles.footer.paddingLeft = styles.navDrawer.width;
    }
    return (
      <div>
        <LoadingIndicator />
        <AppBar
              onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
              style={styles.appBar}
              showMenuIconButton={showMenuIconButton}
              onToogleRightDrawer={this.handleToogleRightDrawer}
          />
          {
            <div style={prepareStyles(styles.root)}>
              <div style={prepareStyles(styles.content)}>
                {React.cloneElement(children, {
                })}
              </div>
            </div>
          }
          <LeftDrawer  style={styles.navDrawer}
            location={location}
            docked={docked}
            onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
            open={navDrawerOpen} />
          <RightDrawer style={styles.rightDrawer} open={rightDrawerOpen} onToogleRightDrawer={this.handleToogleRightDrawer}/>
          <Alert stack={{limit: 5}} offset={70} />
      </div>
    );

  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
  location: PropTypes.object,
  width: PropTypes.number.isRequired
}

export default  withWidth()(CoreLayout);
