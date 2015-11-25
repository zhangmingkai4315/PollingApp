import React from 'react'
import Display from './parts/Display'
import JoinSpeaker from './parts/JoinSpeaker'
import Attendance from './parts/Attendance'
import Questions from './parts/Questions'


var  PropTypes = React.PropTypes;
class Speaker extends React.Component {
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
}

module.exports = Speaker;
