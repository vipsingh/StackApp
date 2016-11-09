import React from 'react';
import { connect } from 'react-redux';
import { startLoading, endLoading } from '../../reducers/indicator';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const mapStateToProps = (state) => {
  return {
    indicator: state.indicator
  }
}

const style = {
  container: {
    position: 'fixed',
    zIndex: 1101,
    left: '48%'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};
class LoadingIndicator extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    let sts = '';
    if(this.props.indicator.loading)
      sts = 'loading';
    else {
      sts = 'hide';
    }
    return (
      <div style={style.container}>
        <RefreshIndicator
          size={40}
          left={1}
          top={0}
          status={sts}
          style={style.refresh}
        />
      </div>
    );
  }
}

LoadingIndicator = connect(
  mapStateToProps
)(LoadingIndicator);

export default LoadingIndicator;
