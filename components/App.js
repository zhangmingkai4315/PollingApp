import React from 'react'
import io from 'socket.io-client'
import Header from './parts/Header'
import Router from 'react-router'
import {RouteHandler} from 'react-router'


var PropTypes = React.PropTypes;

class App extends React.Component{

constructor(props) {
  super(props);
  this.state = {status:"Disconnected",
    title:"",
    member:{},
    audience:[],
    speaker:{},
    questions:[],
    currentQuestion:false,
    results:{}
  };
  this.emit=this.emit.bind(this);
}
componentWillMount(){
  this.socket=io('http://localhost:3000');
  this.socket.on('connect',()=>{
     var member=(sessionStorage.member)?JSON.parse(sessionStorage.member):null;
     if(member && member.type==='member'){
       this.emit('join',member);
     }else if(member&& member.type==='speaker'){
       this.emit('start',{name:member.name,title:sessionStorage.title});
     }
     // console.log("Connected:"+this.socket.id);
     this.setState({status:'Connected'});
   });

  this.socket.on('disconnect',()=>{
    this.setState({status:'Disconnected',title:"Disconnected",speaker:''});
  });

  this.socket.on('welcome',x=>this.setState(x));

  this.socket.on('joined',data=>{
    if(data.type==='speaker'){
      this.setState({speaker:data});
    }else{
      this.setState({member:data});
    }
    sessionStorage.member=JSON.stringify(data);
  });

  this.socket.on('audience',data=>{
    this.setState({audience:data});
  });

  this.socket.on('start',presentation=>{
    sessionStorage.title = presentation.title;
    this.setState(presentation);
    console.log(this.state);
  });

  this.socket.on('end',x=>this.setState(x));

  this.socket.on('ask',question=>{
    console.log(question);
    sessionStorage.answer='';
    this.setState({currentQuestion:question});
  });

  this.socket.on('results',data=>{
    this.setState({results:data});
  });
}
emit(eventName,obj){
    this.socket.emit(eventName,obj);
}
render() {
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
};

module.exports = App;
