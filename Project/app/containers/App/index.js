/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import RegisterMerchantPage from 'containers/RegisterMerchantPage/Loadable';
import ServicesPage from 'containers/ServicesPage/Loadable';
import DirectoryPage from 'containers/DirectoryPage/Loadable';
import ProfessionalsPage from 'containers/ProfessionalsPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import ChatPage from 'containers/ChatPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import './app.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/register-merchant" component={RegisterMerchantPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/directory" component={DirectoryPage} />
        <Route path="/professionals" component={ProfessionalsPage} />
        <Route
          path="/dashboard/account"
          render={props => <DashboardPage currentTab="account" {...props} />}
        />
        <Route
          path="/dashboard/listings"
          render={props => <DashboardPage currentTab="listings" {...props} />}
        />
        <Route
          path="/dashboard/reviews"
          render={props => <DashboardPage currentTab="reviews" {...props} />}
        />
        <Route
          path="/dashboard/notifications"
          render={props => (
            <DashboardPage currentTab="notifications" {...props} />
          )}
        />
        <Route
          path="/dashboard/favourites"
          render={props => <DashboardPage currentTab="favourites" {...props} />}
        />
        <Route
          path="/dashboard/comments"
          render={props => <DashboardPage currentTab="comments" {...props} />}
        />
        <Route path="/dashboard/chat" component={ChatPage} />
        <Redirect from="/dashboard" to="/dashboard/account" />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
