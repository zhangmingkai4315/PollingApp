
import React from 'react'
import ReactDOM from 'react-dom'
import APP from './components/App.js'
import Audience from './components/Audience'
import Board from './components/Board'
import Speaker from './components/Speaker'
import Whoops404 from './components/Whoops404'
import {Router,Route,IndexRoute,NotFoundRoute} from 'react-router';

ReactDOM.render((
<Router>
  <Route path="/" component={APP}>
      <IndexRoute component={Audience} />
      <Route  path="speaker" component={Speaker}/>
      <Route  path="board" component={Board}/>
      <Route path="*" component={Whoops404}/>
  </Route>
</Router>
),document.getElementById('react-container'));
