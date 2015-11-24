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
      title:"",
      member:{},
      audience:[],
      speaker:{},
      questions:[],
      currentQuestion:false
    }
  }
  ,
  componentWillMount(){
    this.socket=io('http://localhost:3000');
    this.socket.on('connect',this.connect);
    this.socket.on('disconnect',this.disconnect);
    this.socket.on('welcome',this.updateState);
    this.socket.on('joined',this.joined);
    this.socket.on('audience',this.updateAudience);
    this.socket.on('start',this.start);
    this.socket.on('end',this.updateState);
    this.socket.on('ask',this.ask);
  },
  connect(){
    var member=(sessionStorage.member)?JSON.parse(sessionStorage.member):null;
    if(member && member.type==='member'){
      this.emit('join',member);
    }else if(member&& member.type==='speaker'){
      this.emit('start',{name:member.name,title:sessionStorage.title});
    }
    // console.log("Connected:"+this.socket.id);
    this.setState({status:'Connected'});
  },
  disconnect(){
    this.setState({status:'Disconnected',title:"Disconnected",speaker:''});
  },
  updateState(state){
    this.setState(state);
  },
  joined(data){
    if(data.type==='speaker'){
      this.setState({speaker:data});
    }else{
      this.setState({member:data});
    }
    sessionStorage.member=JSON.stringify(data);
  },
  emit(eventName,obj){
    this.socket.emit(eventName,obj);
  },
  updateAudience(data){
    this.setState({audience:data});
  },
  start(presentation){
    sessionStorage.title = presentation.title;
    this.setState(presentation);
    console.log(this.state);
  },
  ask(question){
    console.log(question);
    this.setState({currentQuestion:question});
    sessionStorage.answer='';
  },
  render() {
    console.log(this.state);

    return (
      <div>
        <Header title={this.state.title} speaker={this.state.speaker} status={this.state.status}/>
        {this.props.children && React.cloneElement(this.props.children, {
           parentState: this.state,
           emit:this.emit
         })}
      </div>
    );
  }
});

module.exports = App;
