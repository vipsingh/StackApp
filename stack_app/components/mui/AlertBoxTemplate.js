import React, {Component, PropTypes} from 'react';

const paper_style ={
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
    borderRadius: 2,
    width: 300,
    padding: 5
};
const noti_styl ={
  container:{
    border: 10, boxSizing: 'border-box', display: 'block', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', cursor: 'pointer', textDecoration: 'none', margin: 0, padding: 0, outline: 'none', fontSize: 16, transform: 'translate3d(0px, 0px, 0px)', lineHeight: 16, position: 'relative', transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', background: 'none'
  },
  iconBox:{
    height: 32, width: 32, display: 'flex', position: 'absolute', top: 4, margin: 0, left: 8, padding: 6, borderRadius: '50%', justifyContent: 'center', alignItems: 'center'
  },
  closeButton:{
    border: 10, boxSizing: 'border-box', display: 'block', cursor: 'pointer', textDecoration: 'none', margin: 0, padding: 6, outline: 'none', fontSize: 0, fontWeight: 'inherit', transform: 'translate3d(0px, 0px, 0px)', position: 'absolute', overflow: 'visible', transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', width: 36, height: 36, top: -3, right: 4, background: 'none'
  },
  message:{
    fontSize: 14, lineHeight: 16, height: 16, margin: '8px 0px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
  }
}
export default class AlertBoxTemplate extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      let p_styl = Object.assign({}, paper_style, this.props.styles);
      let icon_name = 'fa-reorder';//fa-info, fa-check, fa-close, fa-warning
      if(this.props.classNames.indexOf('s-alert-info') > -1)
        icon_name = 'fa-info';
      if(this.props.classNames.indexOf('s-alert-success') > -1)
        icon_name = 'fa-check';
      if(this.props.classNames.indexOf('s-alert-warning') > -1)
        icon_name = 'fa-warning';
      if(this.props.classNames.indexOf('s-alert-error') > -1)
        icon_name = 'fa-close';
      return (
            <div className={this.props.classNames} id={this.props.id} style={p_styl}>
                <div style={noti_styl.container}>
                  <div>
                    <div className='row'>
                      <div className='col-xs-2'>
                      <div style={noti_styl.iconBox}>
                        <span className={'fa '+ icon_name} style={{color:'inherit', position: 'relative',fontSize: 18,display: 'inline-block',userSelect: 'none'}}></span>
                      </div>
                      </div>
                      <div className='col-xs-8'>
                        <div style={{alignItems: 'center', display: 'flex', height: 32}}>
                          {'Message'}
                        </div>
                      </div>
                    </div>
                    <button tabindex="0" type="button" style={noti_styl.closeButton} onClick={this.props.handleClose}>
                        <span className='fa fa-close' style={{color: 'rgba(0, 0, 0, 0.470588)',position: 'relative',fontSize: 16,display: 'inline-block',userSelect: 'none'}}></span>
                    </button>
                  </div>
              </div>
              <div style={{marginTop:10, marginLeft: 32}}>{this.props.message}</div>
            </div>
        )
    }
}
