import React,{Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';

const sty = {
  bar: {
    boxSizing:'border-box',
    height: 32,
    padding: '5px 5px',
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '2px solid'
  },
  body:{

  }
}
class Panel extends Component{
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }
  render(){
    sty.bar.borderColor = this.context.muiTheme.palette.primary3Color;
    let paper_styl = Object.assign({},this.props.style);
    return(
      <div style={{width:'100%'}}>
        <Paper style={paper_styl} zDepth={1} rounded={false}>
          <div style={sty.bar}>
            <div>
              <span style={{fontWeight: 500, fontSize: 14}}>{this.props.title}</span>
            </div>
          </div>
          <div style={sty.body}>
            {this.props.children}
          </div>
        </Paper>
      </div>
    );
  }
}

export default Panel;
/*
expandable : true/false
scheme: primary secondary
icon
actions
*/
