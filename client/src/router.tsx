import React, { lazy } from 'react';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';

const Login = lazy(() =>
  import('./Login').then(({ LoginForm }) => ({ default: LoginForm })),
);
const Registration = lazy(() =>
  import('./Registration').then(({ RegistrationForm }) => ({
    default: RegistrationForm,
  })),
);

const PrivateRoute = ({ component: Component, userType, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      userType ? (
        <Component {...props} userType={userType} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const PublicRoutes: React.FC<{}> = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/registration" component={Registration} />
    {/*<Route exact path='/404' component={ForOFour} />*/}
    {/*<PrivateRoute userType='admin' path='/dashboard/admin' component={Main} />*/}
    <PrivateRoute userType="user" path="/dashboard/user" component={Login} />
  </Switch>
);

export default withRouter(PublicRoutes);
