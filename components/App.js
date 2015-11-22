var React = require('react');
var io=require('socket.io-client');
var Header=require('./parts/Header');
var Router=require('react-router');
var RouteHandler=Router.RouteHandler;


var PropTypes = React.PropTypes;

var App = React.createClass({
  getInitialState(){
    return{
      status:"Disconnected",
      title:""
    }
  }
  ,
  componentWillMount(){
    this.socket=io('http://localhost:3000');
    this.socket.on('connect',this.connect);
    this.socket.on('disconnect',this.disconnect);
    this.socket.on('welcome',this.welcome);
  },
  connect(){
    console.log("Connected:"+this.socket.id);
    this.setState({status:'Connected'})
  },
  disconnect(){
    this.setState({status:'Disconnected'});
  },
  welcome(data){
    this.setState({title:data.title});
  },
  render() {
    return (
      <div>
        <Header title={this.state.title} status={this.state.status}/>
        {this.props.children && React.cloneElement(this.props.children, {
           parentState: this.state
         })}
      </div>
    );
  }
});

module.exports = App;
