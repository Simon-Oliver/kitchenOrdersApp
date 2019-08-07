import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';
import AddOrder from './Pages/AddOrder';
import Header from './Pages/Header';
import Orders from './Pages/Orders';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <div className="ui container">
        <Header />
        <div className="ui segment app">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/orders/new" component={AddOrder} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
