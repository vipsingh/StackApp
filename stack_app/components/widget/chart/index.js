import React,{Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

export default class ChartComponent extends Component{
  static defaultProps = {
			legend: {
				display: true,
				position: 'bottom'
			},
			type: 'doughnut',
			height: 200,
			width: 300,
			redraw: false
		}
  constructor(props){
    super(props);
    this.chart_instance = undefined;
  }
  componentWillMount(){
    this.chart_instance = undefined;
  }
  componentDidMount() {
		this.renderChart();
	}
  componentDidUpdate() {
		if (this.props.redraw) {
			this.chart_instance.destroy();
			this.renderChart();
		} else {
			this.updateChart();
		}
	}
  componentWillUnmount() {
		this.chart_instance.destroy();
	}

  // _objectWithoutProperties (obj, keys) {
  //   var target = {};
  //   for (var i in obj) {
  //     if (keys.indexOf(i) >= 0) continue;
  //     if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
  //     target[i] = obj[i];
  //   }
  //   return target;
  // }
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   const ignoredProperties = ['id', 'width', 'height', 'onElementsClick'];
  //   const compareNext = this._objectWithoutProperties(nextProps, ignoredProperties);
  //   const compareNow = this._objectWithoutProperties(this.props, ignoredProperties);
  //
  //   return !deepEqual(compareNext, compareNow, {strict: true});
  // }

  updateChart() {
		const {data, options} = this.props;
		if (!this.chart_instance) return;

		if (options) {
			this.chart_instance.options = Chart.helpers.configMerge(this.chart_instance.options, options);
		}

		this.chart_instance.config.data = {
			...this.chart_instance.config.data,
			...data
		};

		this.chart_instance.update();
	}

  renderChart() {
		const {data, options, legend, type} = this.props;
		const node = ReactDOM.findDOMNode(this);

		this.chart_instance = new Chart(node, {
			type,
			data,
			options
		});
	}

  handleOnClick(event) {
    const instance = this.chart_instance;
  }

  render() {
		const {height, width, onElementsClick} = this.props;
		return (
			<canvas
				height={height}
				width={width}
				onClick={this.handleOnClick}
			/>
		);
	}

}

export class Doughnut extends React.Component {
	render() {
		return (
			<ChartComponent
				{...this.props}
				ref={ref => this.chart_instance = ref && ref.chart_instance}
				type='doughnut'
			/>
		);
	}
}

export class Pie extends React.Component {
	render() {
		return (
			<ChartComponent
				{...this.props}
				ref={ref => this.chart_instance = ref && ref.chart_instance}
				type='pie'
			/>
		);
	}
}

export class Line extends React.Component {
	render() {
		return (
			<ChartComponent
				{...this.props}
				ref={ref => this.chart_instance = ref && ref.chart_instance}
				type='line'
			/>
		);
	}
}

export class Bar extends React.Component {
	render() {
		return (
			<ChartComponent
				{...this.props}
				ref={ref => this.chart_instance = ref && ref.chart_instance}
				type='bar'
			/>
		);
	}
}

export class HorizontalBar extends React.Component {
	render() {
		return (
			<ChartComponent
				{...this.props}
				ref={ref => this.chart_instance = ref && ref.chart_instance}
				type='horizontalBar'
			/>
		);
	}
}

export class Radar extends React.Component {
	render() {
		return (
			<ChartComponent
				{...this.props}
				ref={ref => this.chart_instance = ref && ref.chart_instance}
				type='radar'
			/>
		);
	}
}

export class Polar extends React.Component {
	render() {
		return (
			<ChartComponent
				{...this.props}
				ref={ref => this.chart_instance = ref && ref.chart_instance}
				type='polarArea'
			/>
		);
	}
}

export class Bubble extends React.Component {
	render() {
		return (
			<ChartComponent
				{...this.props}
				ref={ref => this.chart_instance = ref && ref.chart_instance}
				type='bubble'
			/>
		);
	}
}
