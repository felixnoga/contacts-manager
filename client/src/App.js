import React, { Fragment } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';

import { ContactProvider } from './context/contact/contactContext';
import { AuthProvider } from './context/auth/authContext';
import Register from './components/pages/Register';
import Login from './components/pages/Login';

const App = () => {
  return (
    <AuthProvider>
      <ContactProvider>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/about" component={About} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ContactProvider>
    </AuthProvider>
  );
};

export default App;
