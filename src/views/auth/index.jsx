import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

const Login = lazy(() => import(/* webpackChunkName: "Login" */ './login'));
const Signup = lazy(() => import(/* webpackChunkName: "Signup" */ './signup'));

const Auth = () => (
  <Suspense fallback={<TopBarProgress />}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Redirect to="/login" />
    </Switch>
  </Suspense>
);

export default Auth;
