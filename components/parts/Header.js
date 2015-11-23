var React = require('react');
var PropTypes = React.PropTypes;

var Header = React.createClass({
  propTypes:{
    title:PropTypes.string.isRequired
  },
  getDefaultProps(){
    return({
      title:"",
      speaker:{name:""},
      status:"Disconnected"
    });
  },
  render () {
    return (
      <header>
        <h1>{this.props.title}</h1>
        <h2>{this.props.speaker.name}</h2>
        <p>{this.props.status}</p>
      </header>
    )
  }
});

module.exports = Header;
