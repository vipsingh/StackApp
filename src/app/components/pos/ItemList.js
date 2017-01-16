import React, {Component,PropTypes} from 'react';
import _ from 'lodash';
import {AutoSizer, List} from 'react-virtualized';

import ItemCard from './ItemCard';

export default class ItemList extends Component{
    constructor(props){
        super(props);
        this.state ={
            list:[]
        }
        for(let x=0;x<10;x++){
            this.state.list.push({id: x+1, title: 'name '+x});
        }
    }

    _getDatum (index) {
        const { list } = this.state
        return list[index];
    }

    _rowRenderer = ({ index, isScrolling, key, style })=> {
        const datum = this._getDatum(index)
        return(
            <div style={style}>
                <ItemCard objectName='Product' data={datum} />
            </div>
        )
    }

    render(){
        return(<div style={{flex:'1 1 auto'}}>
            <AutoSizer>
            {({ width }) =>{                 
                return(<div>
              <List
                ref='List'
                
                height={300}
                overscanRowCount={10}                
                rowCount={10}
                rowHeight={200}
                rowRenderer={this._rowRenderer}
                width={width}
              />
            {width}</div>)}}
          </AutoSizer>
          </div>
        )
    }
}