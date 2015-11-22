
var React=require('react');
var ReactDOM=require('react-dom');
var ReactRouter=require('react-router');
var APP=require('./components/App.js'),
    Audience=require('./components/Audience'),
    Board=require('./components/Board'),
    Speaker=require('./components/Speaker'),
    Whoops404=require('./components/Whoops404');
var Router=ReactRouter.Router,
    Route=ReactRouter.Route,
    IndexRoute=ReactRouter.IndexRoute,
    NotFoundRoute=Router.NotFoundRoute;


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
