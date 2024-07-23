import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Welcome from './Component/Welcome';
import CompleteProfile from './Component/CompleteProfile';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/Complete-profile" component={CompleteProfile} />
        <Route path="/" component={Signup} />
        
      </Switch>
    </Router>
  );
};

export default App;



