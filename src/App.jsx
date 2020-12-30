import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import RedirectTo from './components/RedirectTo';
import IAMCallback from './components/IAMCallback';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import useToken from './hooks/useToken';
import iamService from './services/iamService';
import PagesView from './pages/Pages';

function Tasks() {
  return <h2>Tasks</h2>;
}
function Sites() {
  return <h2>Sites</h2>
}
function Pages() {
  return <PagesView></PagesView>
}

function App() {
  const {token} = useToken();
  const path = window.location.pathname;
  if(path === '/iamCallback') {
    return (
      <IAMCallback></IAMCallback>
    )
  }
  if(!token){
    const iamLoginURL = iamService.loginURL();
    return (
        <RedirectTo url={iamLoginURL} />
      )
  }else{
    return (
      <Router>
        <div id="container">
          <div id="header">
            <Header title={"Profile Faster Convertor"}></Header>
          </div>
          <div id="main">
            <Switch>
              <Route path="/tasks">
                <Tasks></Tasks>
              </Route>
              <Route path="/sites">
                <Sites></Sites>
              </Route>
              <Route path="/pages">
                <Pages></Pages>
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


