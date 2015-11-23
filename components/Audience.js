var React = require('react');
var PropTypes = React.PropTypes;
var Display=require('./parts/Display');
var Join=require('./parts/Join');
var Audience = React.createClass({
  render() {

    var data=this.props.parentState;
    console.log(data);
    return (
      <div>
        <Display if={data.status==='Connected'}>
          <Display if={data.member.name!==undefined}>
             <h2>welcome {data.member.name}</h2>
             <p>{data.audience.length} audiences in this room now</p>
             <p>Questions will appear here</p>
          </Display>
          <Display if={!data.member.name}>
            <h1>Join the session</h1>
            <Join emit={this.props.emit}/>
          </Display>
        </Display>
      </div>
  );
  }
});

module.exports = Audience;
