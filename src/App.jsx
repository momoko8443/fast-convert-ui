import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import RedirectTo from './components/RedirectTo';
import IAMCallback from './components/IAMCallback';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useToken from './hooks/useToken';
import iamService from './services/iamService';
import ElementsView from './pages/Elements';
import SitesView from './pages/Sites';
import PagesView from './pages/Pages';
import axios from 'axios';
import '@serai/profile-ui-framework';


function Pages() {
  return <PagesView></PagesView>;
}
function Sites() {
  return <SitesView></SitesView>
}
function Elements() {
  return <ElementsView></ElementsView>
}

function App() {
  const { token , setToken} = useToken();

  axios.interceptors.request.use((request) => {
    if (token) {
      if (request.headers.Authorization === undefined || request.headers.Authorization === '') {
        request.headers['Authorization'] = "Serai " + token.access_token
      }
    }
    if (request.method.toLowerCase() === 'get') {
      if (!request.headers['Cache-Control']) {
        request.headers['Cache-Control'] = "no-cache";
      }
      if (!request.headers['Pragma']) {
        request.headers['Pragma'] = "no-cache";
      }
    }
    return request;
  }, (error) => {
    console.error(error);
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    console.error(error);
    if (error.response && error.response.status && error.response.status + "" === '403') {
      console.info('=========tokenExpired')
      setToken(null);
      //Promise.reject(error);
      const iamLoginURL = iamService.loginURL();
      window.location.href = iamLoginURL;
    }
    return Promise.reject(error);
  });

  const path = window.location.pathname;
  if (path === '/iamCallback') {
    return (
      <IAMCallback></IAMCallback>
    )
  }
  if (!token) {
    const iamLoginURL = iamService.loginURL();
    return (
      <RedirectTo url={iamLoginURL} />
    )
  } else {
    return (
      <Router>
        <div id="container">
          <div id="header">
            <Header title={"Profile Fast Convertor"}></Header>
          </div>
          <div id="main">
            <Switch>
              <Route path="/sites">
                <Sites></Sites>
              </Route>
              <Route path="/pages/:domain">
                <Pages></Pages>
              </Route>
              <Route path="/elements/:id">
                <Elements></Elements>
              </Route>
            </Switch>
          </div>
          <div id="footer">
            <Footer></Footer>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;


