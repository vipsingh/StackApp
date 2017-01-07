import React from 'react';

/*https://webpack.js.org/guides/lazy-load-react/*/
class LazilyLoad extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      isLoaded: false,
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillReceiveProps(next) {
    if (next.modules === this.props.modules) return null;
    this.load(next);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  load(props) {
    this.setState({
      isLoaded: false,
    });

    const { modules } = props;
    const keys = Object.keys(modules);

    Promise.all(keys.map((key) => modules[key]()))
      .then((values) => (keys.reduce((agg, key, index) => {
        agg[key] = values[index];
        return agg;
      }, {})))
      .then((result) => {
        if (!this._isMounted) return null;
        this.setState({ modules: result, isLoaded: true });
      });
  }

  render() {
    if (!this.state.isLoaded) return null;
    return React.Children.only(this.props.children(this.state.modules));
  }
}

LazilyLoad.propTypes = {
  children: React.PropTypes.func.isRequired,
};

export const LazilyLoadFactory = (Component, modules) => {
  return (props) => (
    <LazilyLoad modules={modules}>
      {(mods) => <Component {...mods} {...props} />}
    </LazilyLoad>
  );
};

export const importLazy = (promise) => (
  promise.then((result) => result.default)
);

export default LazilyLoad;
/* EXAMPLE: //loading and injecting numeral lib on demand.
class TextX extends React.Component{
  render(){
    const nml = this.props.nml;
    let n = nml(1000);
    return (
      <label>{n}</label>
    )
  }
}

export default LazilyLoadFactory(TextX, {
  nml: () => import('numeral'),
});

//
<LazilyLoad modules={{
  TodoHandler: () => importLazy(import('./components/TodoHandler')),
  TodoMenu: () => importLazy(import('./components/TodoMenu'))
}}>
{({TodoHandler, TodoMenu}) => (
  <TodoHandler>
      <TodoMenu />
  </TodoHandler>
)}
</LazilyLoad>
*/
