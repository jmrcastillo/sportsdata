// inside src/index.js
import React, {Component, Fragment} from 'react'
import {render} from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {GlobalContext, GlobalProvider} from "./lib/GlobalContext";
import { Collapse, Button, CardBody, Card } from 'reactstrap';
 const { Provider, Consumer } = GlobalContext;


import Menu from "./components/Header/Menu";
import Picksmain from "./pages/Picksmain";
import Cubemain from "./pages/Cubemain";

import Register from "./pages/Register";
import ScoresLines from "./pages/ScoresLines";
import Publications from "./pages/Publications";
import TrendsMatchups from "./pages/TrendsMatchups";

import SteamAlerts from "./pages/SteamAlerts";
import VideosPodcasts from "./pages/VideosPodcasts";
import BettingTools from "./pages/BettingTools";
import CappersReportCard from "./pages/CappersReportCard";

import 'bootstrap/dist/css/bootstrap.min.css';

import Utils from "./lib/Utils";

// Cube Nav Menu
import InfinityMenu from "react-infinity-menu";

// Initializer stuff for app global context D. Ison 6-2018
// Converted to cookie-based 8-2018
// TODO:  Can we convert it all back to GlobalContext?
// TODO:  Cart - original isLoggedIn check we started out with

class BaseInitializer extends React.Component {

  componentDidMount() {
  //  console.log ("BaseInitializer..", this.props);
    switch (this.props.pathname) {
      case '/picks-mobile':
      case '/cube-main':
    //    console.log ("Site ID 11, ismobile true", this.props);

        Utils.saveCookie('site-id', '11');
        this.props.context.setSiteID('11');
        this.props.context.setIsMobile(true);
      break;
      case '/picks':
        this.props.context.setSiteID('0');
        Utils.saveCookie('site-id', '0');
      break;
    }
/*    // Initialization for selected-sport dropdown in PickList
    if (typeof (Utils.getCookie('selected-sport')) === 'undefined') {
      Utils.saveCookie('selected-sport', 'ALL')
    }*/
  }

  render() {
    return null;
  }
}

const Initializer = (props) => (
  <Consumer>
    {context => {

     // window.pbContext = context;
      return  <BaseInitializer context={context} pathname={props.location.pathname}/>
    }
    }
  </Consumer>
)

const PicksNav = [
  '/picks',
]

const CubeNav = [
  '/cube-main',
  '/picks-mobile',
  '/login-register',
  '/scores-lines',
  '/publications',
  '/trends-matchups',
  '/steam-alerts',
  '/videos-podcasts',
  '/betting-tools',
  '/cappers-report-card',
]

// const toggle = () => {
//   this.setState({ collapse: !this.state.collapse });
// }
// Picks Top, Footer
const collapse_open = false;
console.log(collapse_open);
const PicksTop = (props) => {

  return (
    <React.Fragment>
      <Menu />
    </React.Fragment>


  )

}




// Cube Top / Menu
    class CubeTop extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          schema: [],
          functions: [
            ()=>{this.props.history.push('/cube-main')},
            ()=>{this.props.history.push('/cube-main')},
            ()=>{this.props.history.push('/picks-mobile')},
            ()=>{this.props.history.push('/scores-lines')},
            ()=>{this.props.history.push('/login-register')},
            ()=>{this.props.history.push('/cappers-report-card')},
            ()=>{this.props.history.push('/publications')},
            ()=>{
            window.location.assign("http://cube.statfox.com");
            },
            ()=>{this.props.history.push('/steam-alerts')},
            ()=>{this.props.history.push('/videos-podcasts')},
            ()=>{this.props.history.push('/betting-tools')},
          ]
       };
       this.props = props;


     }

     componentWillMount() {
       this.setState({
         schema:
         [
         {
           name: "Playbook Cube",
           id: 0,
           isOpen: false,
           children: [
             {
               name: "Cube Home",
               id: 1,
               isOpen: false,
               children: [],
             },

             {
               name: "Expert Picks",
               id: 2,
               isOpen: false,
               children: [],
             },

             {
               name: "Scores and Lines",
               id: 3,
               isOpen: false,
               children: [],

             },
             {
               name: "Login / Register",
               id: 4,
               isOpen: false,
               children: [],

             },
             {
               name: "Handicapper's Report Card",
               id: 5,
               isOpen: false,
               children: [],

             },
             {
               name: "Newsletters & Publications",
               id: 6,
               isOpen: false,
               children: [],

             },
             {
               name: "Today's Matchups and Trends",
               id: 7,
               isOpen: false,
               children: [],

             },
             {
               name: "Steam Alerts",
               id: 8,
               isOpen: false,
               children: [],

             },
             {
               name: "Videos & Podcasts",
               id: 9,
               isOpen: false,
               children: [],

             },

             {
               name: "Betting Tools",
               id: 10,
               isOpen: false,
               children: [],

             },

             ],
           },

         ]

       });


     }

    componentDidMount() {

    }



     render() {
       return (
         <InfinityMenu
           tree={this.state.schema}
           disableDefaultHeaderContent={true}

           onNodeMouseClick={(event, schema, node, level, keyPath) => {
             this.state.functions[node.id]();
             if (node.id > 0) {
               schema[0].isOpen = false;
             }
             this.setState({
               schema: schema
             });
           }}
           //	maxLeaves={2}
         />


       );
     }

}

// Displays contents, navigation, etc., according to values in PicksNav and CubeNav arrays
const Top = (props) => {
  if (PicksNav.includes(props.location.pathname)) {
    return <PicksTop/>
  }

  if (CubeNav.includes(props.location.pathname)) {
    return <CubeTop {...props} />
  }
  return '';
}





const Footer = (props) => {
  if (PicksNav.includes(props.location.pathname)) {
    return <PicksFooter/>
  }

  return '';

}








// Dummy test components for context api
class Person extends Component {
  render() {
    return (
      <div className="person">
        <Consumer>
          {(context) => (
            <React.Fragment>
              Test Interface React v. {React.version}
              <p>Score: {context.state.age}</p>
              <p>Name: {context.state.name}</p>
              <button onClick={e =>{
              //  console.log ("dummy value: ", context.dummy);
                context.growAYearOlder();
              }}>Add a Year</button>
            </React.Fragment>
          )}
        </Consumer>
      </div>
    )
  }
}
const Holder = (props) => {
  //this.props.router.location.query.ECAPPER_ID)
  console.log("HOLDER");
  console.log(props.location.pathname);


  return (
    <React.Fragment>
      <Person/>
    </React.Fragment>
  )
}


const Holder2 = (props) => {


  return (
    <React.Fragment>
      Picks App Root
    </React.Fragment>
  )
}



class App extends Component {

  static contextType = GlobalContext;


    render() {

    return (
      <GlobalProvider>
        <Router>
          <React.Fragment>

            <Route component={Initializer}/>



            <Route component={Top}/>

            <Route exact path="/" component={Holder2} />
            <Route path="/picks" component={Picksmain} />
            <Route path="/picks-mobile" component={Picksmain} />
            <Route path="/cube-main" component={Cubemain} />

            <Route path="/login-register" component={Register} />
            <Route path="/scores-lines" component={ScoresLines} />
            <Route path="/publications" component={Publications} />
            <Route path="/trends-matchups" component={TrendsMatchups} />
            <Route path="/steam-alerts" component={SteamAlerts} />
            <Route path="/videos-podcasts" component={VideosPodcasts} />
            <Route path="/betting-tools" component={BettingTools} />
            <Route path="/cappers-report-card" component={CappersReportCard} />

              {/*
            <Route component={Footer}/>
              */}


          </React.Fragment>
        </Router>
      </GlobalProvider>
    );
  }
}

render(
  <App/>,
  document.getElementById('picksapp')

)
























/*const App = () => {
    return <div>
        <h1>React App version {React.version} Running..</h1>
        <h1>Webpack build system 4.8.3.</h1>
    </div>
}*/

/*  LINKS


1.  React Router helper site:
https://reacttraining.com/react-router/web/example/b


2. Fix for getting route directly entered into URL bar to work:
https://tylermcginnis.com/react-router-cannot-get-url-refresh/



 */



// Examples
/*
const About = ()=>(
  <div>
    <h1>ABOUT</h1>

    <h3>React App version {React.version} Running..</h3>
    <h3>Webpack build system 4.8.3.</h3>
  </div>
)


const University = ()=>(
  <div>
    <h1>Playbook University</h1>

  </div>
)

const Picks = ()=>(
  <div>
    <h2>Current Picks App should go here (PicksMain)</h2>

  </div>
)


const MemberCenter = ()=>(
  <div>
    <h2>Placeholder for future Member Center / Member Profile / Preferences UI</h2>

  </div>
)
*/