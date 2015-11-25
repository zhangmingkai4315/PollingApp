var React=require('react');
var ReactDOM=require('react-dom');
var Link=require('react-router').Link;
var Join=React.createClass({
  join(){
      var name=this.refs.username.value;
      var type="member";
      // alert("TODO: join number "+memeberName);
      this.props.emit('join',{name:name,type:type});
  },
  render:function () {
    return (
        <form action="javascript:void(0)" onSubmit={this.join}>
          <label>Full Name</label>
          <input className="form-control"
                 placeholder="enter your full name" ref="username" required />
          <button className="btn btn-primary">Join</button>
          <Link to="/speaker">Join as a Speaker</Link>
          <Link to="/board">Go to the board</Link>
        </form>
    )
  }
});

module.exports=Join;
