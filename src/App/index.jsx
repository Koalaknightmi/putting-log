import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Suspense, lazy }  from 'react';

import ROUTES from '../static/routes';

import Navigation from '../components/Navigation'
const HomePage = lazy(() => import('../pages/Home'));
//import LoggingPage = lazy(() => import('../pages/Logging'));
const LoginPage = lazy(() => import('../pages/Login'))
const WrongPermissionsPagePage = lazy(() => import('../pages/WrongPermissions'))

import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const App = () => {
  return (<Router>
    <div>
      <Navigation/>
      <Toolbar/>
      <Container>
        <Suspense fallback={
          <Dialog aria-labelledby="simple-dialog-title" open={true}>
            <DialogTitle id="simple-dialog-title">LOADING</DialogTitle>
            <CircularProgress color="secondary" />
          </Dialog>
        }>
          <Switch>
            <Route exact path={ROUTES.home.route} component={HomePage}/>
            <Route exact path={ROUTES.login.route} component={LoginPage}/>
            <Route exact path={ROUTES.wrongPermissionsPage.route} component={WrongPermissionsPagePage}/>
          </Switch>
        </Suspense>
      </Container>
    </div>
  </Router>)
};

export default App;