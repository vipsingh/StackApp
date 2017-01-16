import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default class TreeGridView extends React.Component {
  static defaultProps = {
    titleField: 'name',
    idField: 'id',
    columns: [{key: 'id', name: 'Id', hidden: true}, {key: 'name', name: 'Name'}],
    rowHeight: 30,
    height: 400
  }
  //{key: 'id', name: 'Id', formatter:</>, hidden: false}
  constructor(props){
    super(props);
    var _data = [
      {id:1, name:'bhokal 1', city: 'deb 1', children:[{id:11, name:'c 2', city: 'deb 22'},{id:12, name:'c 21', city: 'deb 21'}]},
      {id:2, name:'bhokal 2', city: 'deb 2'},
      {id:3, name:'bhokal 3', city: 'deb 3',
        children:[{id:31, name:'c 2', city: 'deb 22', children: [{id:311, name:'bhokal 2', city: 'deb 2'},{id:312, name:'bhokal 2', city: 'deb 2'}]},
          {id:32, name:'c 21', city: 'deb 21'}]}
    ];
    this.state={data: _data, loaded: false, cols: []};
    this.cols = [];
    this.cols.push(_.find(props.columns, {key: props.titleField}));
    _.each(props.columns,(c)=>{
      if(c.key != props.titleField)
        this.cols.push(c);
    });
  }

  componentWillMount() {
    setTimeout(()=>{
      this.setState({loaded: true});
    })
  }
  componentDidMount(){
    window.addEventListener('resize', this.onWindowResize.bind(this), true);
    this.buildColumnsSize();
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.onWindowResize.bind(this), true);
  }

  onWindowResize(){
    //update matrices
    this.buildColumnsSize();
  }

  getWidth(){
    let nd = ReactDOM.findDOMNode(this);
    return (nd)?nd.offsetWidth:0;
  }

  buildColumnsSize(){
    let cnt_wdt = this.getWidth();
    _.each(this.cols,(d)=>{
      if(!d.hidden)
        d._size = d._size || 100;
      else {
        d._size = 0;
      }
    });
    let t_wd = _.reduce(this.cols,(x, d)=>{
        return x + d._size;
    },0);
    let mg = 0;
    this.cols = _.map(this.cols, (d)=>{
      d._actualSize = cnt_wdt * (d._size/t_wd);
      d._marginLeft = mg;
      mg += d._actualSize;
      return d;
    });
    this.setState({cols: this.cols});
  }

  render(){
    if(this.state.loaded){
      let wdt = this.getWidth(), rowHeight = this.props.rowHeight;

      return(
        <div>
      <div className="react-grid-Container" style={{width: wdt}}>
        <div className="react-grid-Main">
          <div style={{overflow:'hidden',outline:0,position:'relative',minHeight: this.props.height}}>
            <div height={rowHeight} style={{position:'relative',height: rowHeight}} className='react-grid-Header'>
              <div style={{height: rowHeight, position: 'absolute', top: 0, left: 0, width: wdt, overflowX: 'hidden', minHeight: 'auto'}}>
              {
                this.cols.map((c_d)=>{
                  return (<div className='react-grid-HeaderCell' style={{width: c_d._actualSize,left: c_d._marginLeft,display:'inline-block',position:'absolute',height: rowHeight,margin:0,textOverflow:'ellipsis',whiteSpace:'nowrap'}}><div className='widget-HeaderCell__value'>{c_d.name}</div></div>)
                })
              }
              </div>
            </div>
            <div className="react-grid-Viewport" style={{padding:0,bottom:0,left:0,right:0,top: rowHeight,overflow:'hidden',position:'absolute'}}>
              <div className="react-grid-Canvas" style={{position: 'absolute', top: 0, left: 0, overflowX: 'auto', overflowY: 'scroll', width: wdt, height: this.props.height}}>
                <div style={{overflow:'hidden'}}>
                  {
                    this.state.data.map(function(row) {
                        return (<TreeNode {...this.props} row={row} nested ={0} cols={this.cols} />)
                    }.bind(this))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
    </div>
      );
    }
    else{
      return (<div></div>);
    }
  }
}

class TreeNode extends React.Component{
  constructor(props){
    super(props);
    this.state = {collapsed: true};
  }

  toggleNode = ()=>{
    this.setState({collapsed: !this.state.collapsed});
  }

  renderLevel(node){
    if(!row.children || row.children.length == 0){
      return (<div><IconButton iconClassName={btn_css} onTouchTap={this.toggleNode}/> {row.name}</div>)
    }
    else{
      return (<div><IconButton iconClassName={btn_css} onTouchTap={this.toggleNode}/> {row.name}</div>)
    }
  }

  render(){
    let {row, nested, rowHeight, cols} = this.props;
    let btn_css = this.state.collapsed?"fa fa-plus":"fa fa-minus";
    if(!row.children || row.children.length == 0)
      btn_css = "fa";
    return(
      <div>
      <div height={rowHeight} className="react-grid-Row react-grid-Row--even" style={{height:rowHeight,overflow:'hidden',contain:'layout'}}>
        {
          cols.map((c_d)=>{
            let Renderer = c_d.formatter || DefaultCellRenderer;
            if(c_d.key === this.props.titleField){
                return(
                  <div height={rowHeight} className="react-grid-Cell" style={{paddingLeft: nested * 15, position:'absolute',width: c_d._actualSize,height: rowHeight, left: c_d._marginLeft, contain:'layout'}}>
                    <div className="react-grid-Cell__value" style={{display:'flex'}}>
                      <a style={{width: 20, color: 'inherit', marginLeft: 5}} onClick={this.toggleNode} href='javascript:void(0);'><i className={btn_css} /></a>
                      <div>
                        <Renderer value={row[c_d.key]} />
                      </div>
                    </div>
                  </div>
                )
            }
            return (<div height={rowHeight} className="react-grid-Cell" style={{position:'absolute',width: c_d._actualSize,height: rowHeight, left: c_d._marginLeft,contain:'layout'}}><div className="react-grid-Cell__value"><Renderer value={row[c_d.key]} /></div></div>)
          })
        }

      </div>
      {
        function(){if(row.children && !this.state.collapsed){
            return row.children.map(function(r) {
                return (<TreeNode {...this.props} row={r} nested ={nested + 1} />)
            }.bind(this))
          }
          else{
            return(<div></div>);
          }
        }.bind(this)()
      }
    </div>
    )
  }
}

const DefaultCellRenderer = (props) => <div>{props.value}</div>;
