var React = require('react');
var PropTypes = React.PropTypes;

var Header = React.createClass({
  propTypes:{
    title:PropTypes.string.isRequired
  },
  render () {
    return (
      <header>
        <h1>{this.props.title}</h1>
        <p>{this.props.status}</p>
      </header>
    )
  }
});

module.exports = Header;
