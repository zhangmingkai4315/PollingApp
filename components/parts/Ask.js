import React from 'react'
import _ from 'underscore'
import Display from './Display'
var Ask=React.createClass({
  getInitialState(){
    return{
      choices:[],
      answer:undefined
    }
  },
  componentWillMount(){
    this.setUpChoices();
  },
  componentWillReceiveProps(){
    this.setUpChoices();
  },
  setUpChoices(){
    var choices=_.keys((this.props.question!==false)?this.props.question:{});
    choices.shift();
    this.setState({choices:choices,answer:sessionStorage.answer});
  },
  select(choice){
    this.setState({answer:choice});
    sessionStorage.answer=choice;
    this.props.emit('answer',{
       question:this.props.question,
       choice:choice
    });
  },
  addChoiceButton(choice,i){
    return (
      <button
      onClick={this.select.bind(null,choice)}
      key={i} className="col-xs-12 col-sm-6 btn btn-primary">{choice}:{this.props.question[choice]}</button>
    )
  },
  render:function () {
    var question={};
    if(this.props.question===false){
      question={};
      question.q="No question right now!"
    }else{
      question=this.props.question;
    }
    return(
      <div id="currentQuestions">
        <h2>{question.q}</h2>
        <Display if={this.state.answer===''}>
          <div className="row">
            {this.state.choices.map(this.addChoiceButton)};
          </div>
        </Display>
        <Display if={!this.state.answer!==''}>
          <div className="row">
            <h3>You have made the choice: {this.state.answer}</h3>
          </div>
        </Display>
      </div>
    )
  }
})

module.exports=Ask;
