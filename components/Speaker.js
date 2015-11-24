var React = require('react');
var PropTypes = React.PropTypes;
var Display=require('./parts/Display');
var JoinSpeaker = require('./parts/JoinSpeaker');
var Attendance=require('./parts/Attendance');
var Questions=require('./parts/Questions');
var Speaker = React.createClass({

  render() {
    var data=this.props.parentState;
    return (
      <div>
        <Display if={data.status==='Connected'}>
            <Display if={data.speaker.name&&data.speaker.type==='speaker'}>
              <h2>{data.speaker.title}</h2>
              <Questions questions={data.questions} emit={this.props.emit}/>
              <Attendance audience={data.audience}/>
            </Display>

            <Display if={!data.speaker.name}>
                <h2>Start the Presentation</h2>
                <JoinSpeaker emit={this.props.emit}/>
            </Display>
        </Display>
      </div>
    );
  }
});

module.exports = Speaker;
