import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import News from './Components/News/News';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './Components/User/User';
import NotFound from './Components/NotFound/NotFound';
import Footer from './Components/Footer/Footer';
import UserNews from './Components/User/UserNews';
import Auth from './Components/Auth/Auth';


function App() {
  return (
    <Router>
      <div className="container max-w-full h-screen overflow-auto bg-blue-600">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/news/:region" component={News} />
          <Route exact path="/login" component={Auth} />
          <Route path="/user/:id" component={UserNews} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
