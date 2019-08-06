import React from "react";
import { Switch, Route, Redirect, withRouter} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.js"
import Auth from "./components/Auth";
import { withUser } from "./context/UserProvider.js";
import Navbar from "./components/Navbar.js";
import Tools from "./components/Tools.js";
import Tabs from "./components/Tabs.js";
import Credits from "./components/Credits.js";
import Footer from "./components/Footer.js";


const Scroll = withRouter(ScrollToTop);

const App = props => {

  const {token} = props
  return (
  <div>
    <Navbar/>
    <Switch>
      <Scroll>
        <Route path = "/tools" render={routerProps => <Tools {...routerProps} {...props}/>}/>
        <Route path = "/auth" render={routerProps => !token ? <Auth {...routerProps} {...props}/> : <Redirect to="/tabs"/>}/>
        <Route path = "/tabs" render={routerProps => token ? <Tabs {...routerProps} {...props}/> : <Redirect to="/auth"/>}/>
        <Route path = "/credits" render={routerProps => <Credits {...routerProps} {...props}/>}/>
      </Scroll>
    </Switch>
    <Footer/>
  </div>
  );
}

export default withUser(App);
