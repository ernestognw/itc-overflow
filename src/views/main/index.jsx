import React, { lazy, Suspense } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

const MyQuestions = lazy(() =>
  import(/* webpackChunkName: "MyQuestions" */ './my-questions')
);

const AllQuestions = lazy(() =>
  import(/* webpackChunkName: "AllQuestions" */ './all-questions')
);

const Development = () => {
  return (
    <Suspense fallback={<TopBarProgress />}>
      <Switch>
        <Route path="/all" component={AllQuestions} />
        <Route exact path="/" component={MyQuestions} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default Development;
