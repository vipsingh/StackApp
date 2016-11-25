import React, {Component, PropTypes} from 'react';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import ModuleIcon from '../widget/ModuleIcon';

const style={

}
class ModuleViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.styles = {
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
      },
    };
    this.modules= [
      {name:'core', text:'Core'},
      {name:'finance', text:'Finance'},
      {name:'sales', text:'Sales'},
      {name:'purchase', text:'Purchase'},
      {name:'inventory', text:'Inventory'}];
  }

  handleModuleClick = (m)=>{
    alert(m.name);
    this.handleRequestClose();
    //this.props.onModuleClick(m.name);
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
          style={{width:350}}
        >
        <div style={this.styles.wrapper}>
          {
            this.modules.map((m)=>{
              return (<div style={{width:'50%'}}>
                <FlatButton
                  label={m.text}
                  onTouchTap={()=>{this.handleModuleClick(m)}}
                  icon={<ModuleIcon module={m.name} />}
                  style={{color:red500}}
                />
              </div>)
            })
          }
        </div>

        </Popover>
      </div>
    );
  }
}

export default ModuleViewer;
