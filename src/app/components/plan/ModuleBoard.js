//Module specific DashBoard
import React,{Component, PropTypes} from 'react';
import {Bar} from '../widget/chart';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import Color from 'color';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: blue500,
      borderColor: Color(blue500).alpha(0.5).lighten(0.5),
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
export default class ModuleBoard extends Component{
  shouldComponentUpdate(){
    return false;
  }
  render(){
    return(
      <div className='row'>
        <div className='col-md-6'>
          <Paper style={{height:220}}>
            <Bar
              data={data}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: false
              }}
            />
          </Paper>
        </div>
        <div className='col-md-6'>
          <Paper style={{height:220}}>
            
          </Paper>
        </div>
      </div>
    );
  }
}
