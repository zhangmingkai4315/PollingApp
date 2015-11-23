var React=require('react');
var ReactDOM=require('react-dom');

var JoinSpeaker=React.createClass({
  start(){
    var speakerName=this.refs.username.value;
    var title=this.refs.title.value;
    var type="speaker";
    this.props.emit('start',{name:speakerName,title:title,type:type});
  },
  render:function () {
    return (
        <form action="javascript:void(0)" onSubmit={this.start}>
          <label>Full Name</label>
          <input className="form-control"
                 placeholder="enter your full name" ref="username" required />
         <input className="form-control"
                placeholder="enter your title" ref="title" required />
          <button className="btn btn-primary">Start</button>
        </form>
    )
  }
});

module.exports=JoinSpeaker;
