var React = require('react');
var PropTypes = React.PropTypes;
var Display=require('./parts/Display');
var BarChart=require('react-d3').BarChart;
var Board = React.createClass({

  render() {
    var data=this.props.parentState;
    console.log(data.results);
    return (
      <div id="scoreboard">
        <Display if={data.status==='Connected'&&data.currentQuestion!=={}}>
          <h3>{data.currentQuestion.q}</h3>
          <p>{JSON.stringify(data.results)}</p>
        </Display>

        <Display if={data.status==='Connected'&&data.currentQuestion=={}}>
          <h3>Waiting Question</h3>
        </Display>
      </div>
    );
  }

});

module.exports = Board;
