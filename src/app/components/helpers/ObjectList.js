import React, {Component,PropTypes} from 'react';
import Checkbox from 'material-ui/Checkbox';

export const cellFormatter = {
  date: (props)=>{
    return (<div>{moment(props.value).format('DD-MMM-YYYY')}</div>);
  },
  decimal:(props)=>{
    return (<div style={{textAlign:'right'}}>{props.value && numeral(props.value).format('0,0.000')}</div>);
  },
  monetary:(props)=>{
    return (<div style={{textAlign:'right'}}>{props.value && numeral(props.value).format('0,0.00')}</div>);
  },
  boolean:(props)=>{
    return (<div style={{textAlign:'center'}}><Checkbox disabled={true} checked={props.value}/></div>);
  },
  select:(props)=>{
    let d = _.find(props.dependentValues.col.list_values, {value:props.value });
    d = (d)?d.text:'';
    return (<div>{d}</div>)
  },
  //link field
  ////////
  identifier:(props)=>{
    return (<a href={"#/object/form/"+props.objectName+"?id="+props.dependentValues.data.id}>{props.value}</a>)
  }
  //ObjectNumber, ObjectStatus
};
