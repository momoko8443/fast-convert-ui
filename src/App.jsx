import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import RedirectTo from './components/RedirectTo';
import IAMCallback from './components/IAMCallback';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import useToken from './hooks/useToken';
import iamService from './services/iamService';

function Home() {
  return <h2>Home</h2>;
}
function About() {
  return <h2>About</h2>
}
function Users() {
  return <h2>Users</h2>
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
            <Header title={"Welcome to Serai"}></Header>
          </div>
          <div id="main">
            <Switch>
              <Route path="/about">
                <About></About>
              </Route>
              <Route path="/users">
                <Users></Users>
              </Route>
              <Route path="/">
                <Home></Home>
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


