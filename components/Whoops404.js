var React = require('react');
var PropTypes = React.PropTypes;
var Router=require('react-router');
var Link=Router.Link;
var Whoops404 = React.createClass({
  render: function() {
    return (
      <div id="not-found">
        <h1>Whoops404</h1>
        <p>We cannot find the page !</p>
        <Link to="/">Join as Audience</Link>
        <Link to="/speaker">Start the presetention</Link>
        <Link to="/board">View the board</Link>
      </div>
    );
  }

});

module.exports = Whoops404;
