import React from 'react';

import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';

import FieldEditor from '../editor/FieldEditor';

export default class ObjectFilterBox extends React.Component{
  constructor(props){
    super(props);
    this.fields= [];
    var that = this;
    _.map(props.modelSchema.fields, (fl)=>{
      if(fl.type == 'one_to_one'){
        let fl_1 = Object.assign({}, fl);
        _.map(fl_1.fields, (fl_2)=>{
          fl_2.name = fl_1.name +"."+fl_2.name;
          fl_2.text = fl_1.text +"."+fl_2.text;
          that.fields.push(fl_2);
        });
      }
      else if(fl.type == 'one_to_many'){

      }
      else{
        //*info: we can also extend date object to  Month, Year
        that.fields.push(fl);
      }

    });
    this.criteria =[{value:'$eq', text:'='},{value:'$ne', text:'!='},
      {value:'$in', text:'In', includeIn:['string','link','select']},
      {value:'$cn', text:'Contains', includeIn:['string']},
      {value:'$sw', text:'StartWith', includeIn:['string']},
      {value:'$ew', text:'EndWith', includeIn:['string']},
      {value:'$gt', text:'>', includeIn:['decimal', 'monetary', 'date', 'datetime']},
      {value:'$lt', text:'<', includeIn:['decimal', 'monetary', 'date', 'datetime']},
      {value:'$gte', text:'>=', includeIn:['decimal', 'monetary', 'date', 'datetime']},
      {value:'$lte', text:'<=', includeIn:['decimal', 'monetary', 'date', 'datetime']}
    ];
    this.state={
      filters:[],
      current: {field:'', op:'$eq', value: null, schema: null, text:'='},
      filterEditorVisible: false
    };
    this.counter=1;
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
      },
    };
  }
  handleAdd=()=>{
    let fls = this.state.filters;
    let curr = Object.assign({}, this.state.current);
    curr.id = this.counter++;
    delete curr.schema;
    fls.push(curr);
    let curr_1 = Object.assign({}, this.state.current,{field:'', op:'$eq', value: null, schema: null, text:'='});
    this.setState({filters: fls, current: curr_1});
    setTimeout(function() {
      this.submitFilter();
    }.bind(this));
  }
  handleRemove=(id)=>{
    let fls = this.state.filters.slice();
    let ix = -1;
    _.each(fls, (d,idx)=>{if(d.id === id){ix = idx;}});
    fls.splice(ix, 1);
    this.setState({filters: fls});
    setTimeout(function() {
      this.submitFilter();
    }.bind(this));
  }
  handleChange=(field, value)=>{
    value = (value.target)?value.target.value: value;
    let curr = Object.assign({}, this.state.current, {[field]:value});
    if(field == 'field'){
      let sch = _.find(this.fields,{name:value});
      curr.schema = sch;
      curr.value = null;
      curr.op = '$eq';
      curr.text = '=';
    }
    else if(field == 'op') {
      curr.text = _.find(this.criteria,{value:value}).text;
    }
    this.setState({current: curr});
  }

  handleSearch = (ev)=>{
    let s_txt = ev.target.value;
    this.props.onSearch(s_txt);
  }
  submitFilter=()=>{
    //{name: 'xyz', user: 1};//name = 'xyz' and user = 1
    //{$or:[{name: 'xyz', user: 1}], city: 'xy'};//(name = 'xyz' or user = 1) and city ='xy'
    //{$or:[{name: {$like: '%xy'}}, {user: {$in:[1,2]}}, {$and:[{city: 'c1'}, {city: 'c2'}]}]}
    let f_o = {};
    _.each(this.state.filters, (f)=>{
      if(f_o.hasOwnProperty(f.field)){
        let d = f_o[f.field];
        d[f.op] = f.value;
      }
      else{
        f_o[f.field] ={[f.op]: f.value};
      }
    });
    this.props.onFilterChanged(f_o);
  };

  toogleFilterEditor=()=>{
    this.setState({filterEditorVisible: !this.state.filterEditorVisible});
  };

  render(){
    let filterEditordisplay = (this.state.filterEditorVisible)?'block':'none';
    return(
      <Paper width={200}>
        <div style={{width:'100%', display:'flex'}}>
          <div style={this.styles.wrapper}>
              {this.state.filters.map(this.renderChip, this)}
          </div>
          <div>
            <TextField name='search_list' onBlur={this.handleSearch} />
          </div>
          <div style={{width:70}}>
            <IconButton onTouchTap={this.toogleFilterEditor} iconClassName={this.state.filterEditorVisible ? "fa fa-search-minus" : "fa fa-search-plus"} className='pull-right' />
          </div>
        </div>
        <div style={{display: filterEditordisplay}}>
          <table>
            <tr>
              <td>
                <SelectField name='field' value={this.state.current.field} onChange={(ev, index, value)=>{this.handleChange('field', value);}}>
                  {
                    this.fields.map((v)=>{
                      return (<MenuItem value={v.name} primaryText={v.text} />)
                    })
                  }
                </SelectField>
              </td>
              <td>
                <SelectField  name='op' value={this.state.current.op}  onChange={(ev, index, value)=>{this.handleChange('op', value);}}>
                {
                  function() {
                    var ctr = _.filter(this.criteria, (d)=>{
                      if(d.includeIn && this.state.current.schema && d.includeIn.indexOf(this.state.current.schema.type) >= 0){
                        return true;
                      }
                      else if(!d.includeIn){
                        return true;
                      }
                      return false;
                    });
                    return ctr.map((v)=>{
                      return (<MenuItem value={v.value} primaryText={v.text} />)
                    })
                  }.bind(this)()

                }
              </SelectField>
              </td>
              <td>
                {
                  function(){
                    if(this.state.current.schema != null){
                      return (<FieldEditor fieldSchema={this.state.current.schema} value={this.state.current.value} onChange={(value)=>{this.handleChange('value', value);}} floatingLabelText={null}/>)
                    }
                    else{
                      return (<div></div>)
                    }
                  }.bind(this)()
                }
              </td>
              <td><IconButton onTouchTap={this.handleAdd} iconClassName="fa fa-plus" /></td>
            </tr>
          </table>
        </div>

      </Paper>)
  }
  renderChip(data) {
    return (
      <Chip
        key={data.id}
        onRequestDelete={() => this.handleRemove(data.id)}
        style={this.styles.chip}
      >
        {data.field + ' ' + data.text + ' ' + data.value}
      </Chip>
    );
  }
}
