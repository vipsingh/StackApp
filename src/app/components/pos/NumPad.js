import React, {Component,PropTypes} from 'react';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import {fullWhite} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
const styles = {
    button:{
        height: 50,
        width: 50,
        border: '1px solid #bfbfbf',
        margin: 1
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      }
}
export default class NumPad extends Component{
    render(){
        
        return (
            <div>
                <div style={styles.wrapper}>
                    {[1,2,3].map(this.renderNumButton, this)}
                </div>
                <div style={styles.wrapper}>
                    {[4,5,6].map(this.renderNumButton, this)}
                </div>
                <div style={styles.wrapper}>
                    {[7,8,9].map(this.renderNumButton, this)}
                </div>
                <div style={styles.wrapper}>
                    <RaisedButton label='.00' style={styles.button} />
                    {this.renderNumButton(0)}
                    <RaisedButton style={styles.button} icon={<FontIcon className="fa fa-arrow-left" />}/>
                </div>
            </div>
        )
    }

    renderNumButton(num){
        return(<RaisedButton label={num.toString()} style={styles.button} />)
    }
}