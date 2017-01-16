import React, {Component,PropTypes} from 'react';
import _ from 'lodash';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';

import OrderForm from './OrderForm';
import NumPad from './NumPad';
import ItemList from './ItemList';

const styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };

class PosDesk extends Component{
    constructor(props){
        super(props);
        this.maxkey = 1;
        this.state = {sessions: [], currentSessionKey: 0};
    }

    addSession = ()=>{
        let s = this.state.sessions.slice(0);
        s.push({key: this.maxkey, label: 'Order'+this.maxkey });
        this.setState({sessions: s});
        this.maxkey++;
    }

    removeSession = (key)=>{

    }

    selectSession = (key)=>{
        this.setState({currentSessionKey: key});
    }

    render(){
        return(<div>
            <div className="row">
            <div className="col-xs-9">
            <div style={styles.wrapper}>
                {this.state.sessions.map((s)=>{
                    return (
                        <Chip
                            key={s.key}
                            onRequestDelete={() => this.removeSession(s.key)}
                            style={styles.chip}
                            onTouchTap={()=>this.selectSession(s.key)}
                        >
                            {s.label}
                        </Chip>
                    )
                }, this)}
            </div>            
            </div>
            <div className="col-xs-3">
                <div style={styles.wrapper}>
                    <IconButton iconClassName="fa fa-plus" onTouchTap={()=>this.addSession()} />                    
                </div>
            </div>
            </div>
            <div className='row'>
                <div className='col-sm-7'>
                    {this.state.sessions.map(this.renderForm, this)}
                    <NumPad />
                </div>
                <div className='col-sm-5'>
                    <ItemList />
                </div>
            </div>
        </div>);
    }

    renderForm(s){
        let display = (this.state.currentSessionKey === s.key)? 'block': 'none';
        return (
            <div style={{display: display}}>
                <OrderForm key={s.key} text={s.label}/>
            </div>
        )
    }
}

export default PosDesk;