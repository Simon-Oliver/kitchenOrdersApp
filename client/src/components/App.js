import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';
import AddOrder from './Pages/AddOrder';
import Header from './Pages/Header';

const App = () => {
  return (
    <div className="App">
      <div className="ui container">
        <Header />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/orders/new" component={AddOrder} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
