
//create Button Async
function makeButtonAsync(Button) {
  class AButton extends Component{
    constructor(props){
      super(props);
      this.state = {enable: true};
    }
    onClick = (evt)=>{
      var that = this;
      this.setState({enable: false});
      if(this.props.onClick){
        this.props.onClick(evt).finally(()=>that.setState({enable: true}));
      }
      else if(this.props.onTouchTap){
        this.props.onTouchTap(evt).finally(()=>that.setState({enable: true}));
      }
      else{
        that.setState({enable: true});
      }
    }
    render(){
      let disabled = this.props.disabled || !this.state.enable;
      return (
        <Button {...this.props} disabled={disabled} onTouchTap={this.onClick} onClick={undefined}/>
      )
    }
  }
  return AButton;
}
export makeButtonAsync;
