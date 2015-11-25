import React from 'react'
var PropTypes = React.PropTypes;

class Header extends React.Component{

  render () {
    return (
      <header>
        <h1>{this.props.title}</h1>
        <h2>{this.props.speaker.name}</h2>
        <p>{this.props.status}</p>
      </header>
    )
  }
}

Header.propTypes={
  title:PropTypes.string.isRequired
};
Header.defaultProps={
    title:"",
    speaker:{name:""},
    status:"Disconnected"
};







module.exports = Header;
