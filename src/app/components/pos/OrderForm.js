import React, {Component,PropTypes} from 'react';
import _ from 'lodash';

export default class OrderForm extends Component{
    constructor(props){
        super(props);
        this.state = {items: []};
        this.ix = 1;
    }

    addItem = ()=>{
        let items = this.state.items.slice(0);
        items.push('item'+this.ix);
        this.ix++;
        this.setState({items: items});
    }

    render(){
        return(<div>
            <h3>{this.props.text}</h3><br/>
            {this.state.items.map((i)=>{
                return (<label>{i}</label>)
            },this)}
            <button onClick={this.addItem}>Add Row</button>
        </div>);
    }
}