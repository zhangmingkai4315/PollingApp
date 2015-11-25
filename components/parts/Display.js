import React from 'react';
var PropTypes = React.PropTypes;

var Display = React.createClass({

  render() {
    if(this.props.if===true){
      return (<div>{this.props.children}</div>);
    }else{
      return(<div></div>)
    }
  }

});

module.exports = Display;
