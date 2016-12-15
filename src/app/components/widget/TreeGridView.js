import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
const stylee ={
  headerColIndex:{width:100},
  wrapperStyle:{border:'1px solid rgb(224, 224, 224)'}
}
export default class TreeGridView extends React.Component {
  constructor(props){
    super(props);
    this.tmpCnt = -100000;
    this.cols = ['id', 'name', 'city'];
    var _data = [
      {id:1, name:'bhokal 1', city: 'deb 1', _expanded: true, children:[{id:11, name:'c 2', city: 'deb 22', _expanded: true},{id:12, name:'c 21', city: 'deb 21', _expanded: true}]},
      {id:2, name:'bhokal 2', city: 'deb 2', _expanded: true},
      {id:3, name:'bhokal 3', city: 'deb 3', _expanded: true,
        children:[{id:31, name:'c 2', city: 'deb 22', _expanded: true, children: [{id:311, name:'bhokal 2', city: 'deb 2', _expanded: true},{id:312, name:'bhokal 2', city: 'deb 2', _expanded: true}]},
          {id:32, name:'c 21', city: 'deb 21', _expanded: true}]}
    ];
    // var _data = [
    //   {id:1, name:'bhokal 1', city: 'deb 1', parent: 0, level:'1', nested: 0, expanded : true},
    //   {id:2, name:'bhokal 2', city: 'deb 2', parent: 1, level:'1.1', nested: 1, expanded : true},
    //   {id:3, name:'bhokal 3', city: 'deb 3', parent: 1, level:'1.2', nested: 1, expanded : true},
    //   {id:4, name:'bhokal 4', city: 'deb 4', parent: 0, level:'2', nested: 0, expanded : true},
    //   {id:5, name:'bhokal 5', city: 'deb 5', parent: 4, level:'2.1', nested: 1, expanded : true}
    // ];
    this.state={data: _data, tData: [], currentId: null, currentMember:'', loaded: false};
  }

  componentWillMount() {
    var arr = [];
    this.buildX(arr, true, this.state.data, 0, 0);
    this.setState({tData: arr});
    setTimeout(()=>{
        this.setState({loaded: true});
    })
  }

  getWidth(){
    let nd = ReactDOM.findDOMNode(this);
    return (nd)?nd.offsetWidth:0;
  }

  buildX(arr, expanded, nodes, uid, parid, nested, lavel){
    var that = this;
    uid = uid+1;
    let dt = nodes;
    if(dt){
      let cnt = 1;
      _.each(dt, (n)=>{
        let x = Object.assign({},n,{children:undefined, _expanded: (nested === 0), _uid: uid,  _parent: parid, _nested: nested, _visible: expanded, _lavel: lavel + cnt});
        arr.push(x);
        if(n.children){
          that.buildX(arr, false, n.children, uid, x._uid, nested + 1, lavel + cnt);
        }
      });
      cnt++;
    }
  }

  toogleV =(row)=>{
    var that = this;
    let dt = this.state.tData.slice(0);
    let exp;
    dt = dt.map(function(d) {
      if(d._uid === row._uid){
        exp = !d._expanded;
        return Object.assign({},d,{_expanded:!d._expanded});
      }
      return d;
    });
    dt = dt.map(function(d) {
      if(d._lavel.startsWith(row._level)){
        return Object.assign({},d,{_visible: !d._expanded});
      }
      return d;
    });
    this.setState({data: dt});
  }

  expcollNode=(dt, id)=>{
    var that = this;
    dt.map(function(d) {
      if(d.id === id){
        return Object.assign({},d,{_expanded:!d._expanded});
      }
      if(d.children){
        that.expcollNode(d.children, id);
      }
      return d;
    });
  }

  renderQ(){
    //var DT = [];
    //this.buildX(DT, true, this.state.data, 0, 0);
    return (
      <div>
        <Table selectable={false} wrapperStyle={stylee.wrapperStyle}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {_.map(this.cols, (fl) => {
                  return (<TableHeaderColumn>{fl}</TableHeaderColumn>);
              })}

            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              this.state.tData.map(function(row) {
                if(row._visible)
                  return this.renderTreeRow(row);
              }.bind(this))
            }
          </TableBody>
        </Table>
      </div>
    );
  }

  renderTreeRow = (row)=>{
    return (
      <TableRow>
          {_.map(this.cols, (fl) => {
              if(fl === 'name'){
                return(<TableRowColumn>
                  <div style={{marginLeft: row._nested * 15}}>
                    <IconButton iconClassName={"fa fa-minus"} onTouchTap={()=>{this.toogleV(row)}}/>{row[fl]}
                  </div>
                </TableRowColumn>)
              }
                return (
                  <TableRowColumn>
                    <div>{row[fl]}</div>
                  </TableRowColumn>);
          })}
      </TableRow>
    )
  }
//<div></div>
  render(){
    if(this.state.loaded){
      let wdt = this.getWidth();
      // let colarr = [30, 100, 50];
      // let t_wd = _.reduce(colarr,(x, d)=>{
      //   return x+d;
      // },0);
      // colarr = _.map(colarr, (d)=>{
      //   return wdt * (d/t_wd);
      // });

      return(<div>
      <div className="react-grid-Container" style={{width: wdt}}>
        <div className="react-grid-Main">
          <div style={{overflow:'hidden',outline:0,position:'relative',minHeight: 200}}>
            <div height="30" style={{position:'relative',height:30}} className='react-grid-Header'>
              <div style={{height: 30, position: 'absolute', top: 0, left: 0, width: wdt, overflowX: 'hidden', minHeight: 'auto'}}>
                <div className='react-grid-HeaderCell' style={{width:80,left:0,display:'inline-block',position:'absolute',height:30,margin:0,textOverflow:'ellipsis',whiteSpace:'nowrap'}}><div className='widget-HeaderCell__value'>{'col1'}</div></div>
                <div className='react-grid-HeaderCell' style={{width:80,left:80,display:'inline-block',position:'absolute',height:30,margin:0,textOverflow:'ellipsis',whiteSpace:'nowrap'}}><div className='widget-HeaderCell__value'>{'col2'}</div></div>
                <div className='react-grid-HeaderCell' style={{width:80,left:160,display:'inline-block',position:'absolute',height:30,margin:0,textOverflow:'ellipsis',whiteSpace:'nowrap'}}><div className='widget-HeaderCell__value'>{'col3'}</div></div>
              </div>
            </div>
            <div className="react-grid-Viewport" style={{padding:0,bottom:0,left:0,right:0,top:30,overflow:'hidden',position:'absolute'}}>
              <div className="react-grid-Canvas" style={{position: 'absolute', top: 0, left: 0, overflowX: 'auto', overflowY: 'scroll', width: wdt, height: 200}}>
                <div style={{overflow:'hidden'}}>
                  <div height="30" className="react-grid-Row react-grid-Row--even" style={{height:30,overflow:'hidden',contain:'layout'}}>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:0,contain:'layout'}}><div className="react-grid-Cell__value">{'hello'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:80,contain:'layout'}}><div className="react-grid-Cell__value">{'hello2'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:160,contain:'layout'}}><div className="react-grid-Cell__value">{'hello3'}</div></div>
                  </div>
                  <div height="30" className="react-grid-Row react-grid-Row--even" style={{height:30,overflow:'hidden',contain:'layout'}}>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:0,contain:'layout'}}><div className="react-grid-Cell__value">{'hello'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:80,contain:'layout'}}><div className="react-grid-Cell__value">{'hello2'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:160,contain:'layout'}}><div className="react-grid-Cell__value">{'hello3'}</div></div>
                  </div>
                  <div group='true'>
                    <div height="30" className="react-grid-Row react-grid-Row--even" style={{height:30,overflow:'hidden',contain:'layout'}}>
                      <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:0,contain:'layout'}}><div className="react-grid-Cell__value">{'hello'}</div></div>
                      <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:80,contain:'layout'}}><div className="react-grid-Cell__value">{'hello2'}</div></div>
                      <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:160,contain:'layout'}}><div className="react-grid-Cell__value">{'hello3'}</div></div>
                    </div>
                    <div height="30" className="react-grid-Row react-grid-Row--even" style={{height:30,overflow:'hidden',contain:'layout'}}>
                      <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:0,contain:'layout'}}><div className="react-grid-Cell__value">{'hello'}</div></div>
                      <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:80,contain:'layout'}}><div className="react-grid-Cell__value">{'hello2'}</div></div>
                      <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:160,contain:'layout'}}><div className="react-grid-Cell__value">{'hello3'}</div></div>
                    </div>
                  </div>

                  <div height="30" className="react-grid-Row react-grid-Row--even" style={{height:30,overflow:'hidden',contain:'layout'}}>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:0,contain:'layout'}}><div className="react-grid-Cell__value">{'hello'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:80,contain:'layout'}}><div className="react-grid-Cell__value">{'hello2'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:160,contain:'layout'}}><div className="react-grid-Cell__value">{'hello3'}</div></div>
                  </div>
                  <div height="30" className="react-grid-Row react-grid-Row--even" style={{height:30,overflow:'hidden',contain:'layout'}}>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:0,contain:'layout'}}><div className="react-grid-Cell__value">{'hello'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:80,contain:'layout'}}><div className="react-grid-Cell__value">{'hello2'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:160,contain:'layout'}}><div className="react-grid-Cell__value">{'hello3'}</div></div>
                  </div>
                  <div height="30" className="react-grid-Row react-grid-Row--even" style={{height:30,overflow:'hidden',contain:'layout'}}>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:0,contain:'layout'}}><div className="react-grid-Cell__value">{'hello'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:80,contain:'layout'}}><div className="react-grid-Cell__value">{'hello2'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:160,contain:'layout'}}><div className="react-grid-Cell__value">{'hello3'}</div></div>
                  </div>
                  <div height="30" className="react-grid-Row react-grid-Row--even" style={{height:30,overflow:'hidden',contain:'layout'}}>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:0,contain:'layout'}}><div className="react-grid-Cell__value">{'hello'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:80,contain:'layout'}}><div className="react-grid-Cell__value">{'hello2'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:160,contain:'layout'}}><div className="react-grid-Cell__value">{'hello3'}</div></div>
                  </div>
                  <div height="30" className="react-grid-Row react-grid-Row--even" style={{height:30,overflow:'hidden',contain:'layout'}}>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:0,contain:'layout'}}><div className="react-grid-Cell__value">{'hello'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:80,contain:'layout'}}><div className="react-grid-Cell__value">{'hello2'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:160,contain:'layout'}}><div className="react-grid-Cell__value">{'hello3'}</div></div>
                  </div>
                  <div height="30" className="react-grid-Row react-grid-Row--even" style={{height:30,overflow:'hidden',contain:'layout'}}>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:0,contain:'layout'}}><div className="react-grid-Cell__value">{'hello'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:80,contain:'layout'}}><div className="react-grid-Cell__value">{'hello2'}</div></div>
                    <div height="30" tabindex="-1" value="id_0" className="react-grid-Cell" style={{position:'absolute',width:80,height:30,left:160,contain:'layout'}}><div className="react-grid-Cell__value">{'hello3'}</div></div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
    {wdt}</div>);
    }
    else{
      return (<div></div>);
    }
  }
}
