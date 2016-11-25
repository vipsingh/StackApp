import React,{Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

export default class D3Board extends Component{
  componentDidMount() {
    var el = ReactDOM.findDOMNode(this);
    debugger;
    var ddd = d3;
    d3Chart.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());
  }

  componentDidUpdate() {
    var el = ReactDOM.findDOMNode(this);
    d3Chart.update(el, this.getChartState());
  }

  getChartState() {
    var treeData =
  {
    "name": "Top Level",
    "value": 10,
    "type": "black",
    "level": "red",
    "children": [
      {
        "name": "Level 2: A",
        "value": 15,
        "type": "grey",
        "level": "red",
        "children": [
          {
            "name": "Son of A",
            "value": 5,
            "type": "steelblue",
            "level": "orange"
          },
          {
            "name": "Daughter of A",
            "value": 8,
            "type": "steelblue",
            "level": "red"
          }
        ]
      },
      {
        "name": "Level 2: B",
        "value": 10,
        "type": "grey",
        "level": "green"
      }
    ]
  };
    return {
      data: treeData, //this.props.data,
      domain: this.props.domain
    };
  }

  componentWillUnmount() {
    var el = ReactDOM.findDOMNode(this);
    d3Chart.destroy(el);
  }

  render() {
    return (
      <div className="Chart"></div>
    );
  }
}


var d3Chart = {_svg: null};
d3Chart.create = function(el, props, state) {
  this.svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

  this.update(el, state);
};

d3Chart.update = function(el, state) {
  // Re-compute the scales, and render the data points
  //var scales = this._scales(el, state.domain);
  //this._drawPoints(el, scales, state.data);

  var margin = {top: 20, right: 90, bottom: 30, left: 90},
      width = 660 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // declares a tree layout and assigns the size
  var treemap = d3.tree()
      .size([height, width]);

  //  assigns the data to a hierarchy using parent-child relationships
  var nodes = d3.hierarchy(state.data, function(d) {
      return d.children;
    });

  // maps the node data to the tree layout
  nodes = treemap(nodes);

  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(el).select('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom),
      g = svg.append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

  // adds the links between the nodes
  var link = g.selectAll(".link")
      .data( nodes.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .style("stroke", function(d) { return d.data.level; })
      .attr("d", function(d) {
         return "M" + d.y + "," + d.x
           + "C" + (d.y + d.parent.y) / 2 + "," + d.x
           + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
           + " " + d.parent.y + "," + d.parent.x;
         });

  // adds each node as a group
  var node = g.selectAll(".node")
      .data(nodes.descendants())
    .enter().append("g")
      .attr("class", function(d) {
        return "node" +
          (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")"; });

  // adds symbols as nodes
  node.append("path")
    .style("stroke", function(d) { return d.data.type; })
    .style("fill", function(d) { return d.data.level; })
    .attr("d", d3.symbol()
       .size(function(d) { return d.data.value * 30; } )
       .type(function(d) { if
         (d.data.value >= 9) { return d3.symbolCross; } else if
         (d.data.value <= 9) { return d3.symbolDiamond;}
       }));

  // adds the text to the node
  node.append("text")
    .attr("dy", ".35em")
    .attr("x", function(d) { return d.children ?
      (d.data.value + 4) * -1 : d.data.value + 4 })
    .style("text-anchor", function(d) {
      return d.children ? "end" : "start"; })
    .text(function(d) { return d.data.name; });

};



d3Chart.destroy = function(el) {
  // Any clean-up would go here
  // in this example there is nothing to do
};
