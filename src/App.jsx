import React from 'react';
import { useUser } from '@providers/user';
import { Redirect, Switch, Route } from 'react-router-dom';
import MainLayout from '@layouts/main';
import AuthLayout from '@layouts/auth';
import Auth from '@views/auth';
import Main from '@views/main';

const App = () => {
  const { token } = useUser();

  if (!token) {
    return (
      <AuthLayout>
        <Auth />
      </AuthLayout>
    );
  }

  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    </MainLayout>
  );
};

export default App;
