import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {auth} from './actions/authActions'
import Login from './pages/login';
import LandingPage from './pages/landing';
import Graphs from './pages/graphs';
import Header from './components/Header';
import Footer from './components/Footer';
import Aside from "./components/Aside";





const LoginRoute = () => (
  !auth.isAuthenticated() ?
    <>
      <Header/>
      <Route path="/login" component={Login} exact />
      <Footer />
    </> :
    <Redirect to="/" />
);


const AppRoutes = ({ history }) =>

  auth.isAuthenticated() ? (
    <>
      <Aside/>
      <div className="content ht-100v pd-0">
        <Header/>
        <Switch>
          <Route exact component={LandingPage} path="/" />
          <Route exact component={Graphs} path="/graphs" />
        </Switch>
      </div>
    </>
  ) : (
    <Redirect to="/login" />
  );



const Routes = () => (
  <Router>
      <Switch>
        <Route path="/login" component={LoginRoute} exact />
        <Route path="/" component={AppRoutes} />
        <Route path="/graphs" component={AppRoutes} />
      </Switch>
  </Router>
);



export default Routes;
