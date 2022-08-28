

import React, { useState, useCallback } from  'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Home from './user/pages/home';
import Assessment from './Assessment/pages/assessment';
import Awarness from './Awarness/pages/awarness';
import AboutUs from './AboutUs/pages/aboutUs';
import ContactUs from './ContactUs/pages/contactus';
import Auth from './user/pages/auth';
import Dashboard from './user/pages/dashboard';
import Settings from './user/pages/settings';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if(isLoggedIn) {
    routes = (
      <Switch>
          <Route path= "/" exact>
            <Home />
          </Route>
          <Route path= "/assessment">
            <Assessment />
          </Route>
          <Route path= "/awarness">
            <Awarness />
          </Route>
          <Route path= "/aboutUs">
            <AboutUs />
          </Route>
          <Route path= "/contactUs">
            <ContactUs />
          </Route>
          <Route path= "/dashboard">
            <Dashboard />
          </Route><Route path= "/settings">
            <Settings />
          </Route>
          <Redirect to="/" />
        </Switch>
    );
  }else {
    routes = (
      <Switch>
          <Route path= "/" exact>
            <Home />
          </Route>
          <Route path= "/assessment">
            <Assessment />
          </Route>
          <Route path= "/awarness">
            <Awarness />
          </Route>
          <Route path= "/aboutUs">
            <AboutUs />
          </Route>
          <Route path= "/auth">
            <Auth />
          </Route>
          <Redirect to="/auth" />
        </Switch>
    )
  }

  return (
    <AuthContext.Provider 
      value ={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    > 
      <Router>
      <MainNavigation />
      <main>  
        {routes}
      </main>
    </Router>
  </AuthContext.Provider>
  );
  
};

export default App;
