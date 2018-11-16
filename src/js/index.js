// inside src/index.js
import React, {Component, Fragment} from 'react'
import {render} from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {GlobalContext, GlobalProvider} from "./lib/GlobalContext";
 const { Provider, Consumer } = GlobalContext;



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


// Picks Top, Footer
const PicksTop = (props) => {

  return (
    <React.Fragment>

      <div className="container4">

        <div className="logo"><a href="http://www.playbook.com"><img alt="Playbook.com" src="http://www.playbook.com/playbook_logo6.png" width="239" /></a>

        </div>


      </div>


      <div id="content">  <div className="container4a"><div className="megamenu_wrapper megamenu_light_theme">



        <div className="megamenu_container megamenu_black">



          <ul className="megamenu">






            <li className="menuitem_nodrop"><a href="http://www.playbook.com"><span className="topnav_trebuchet16Bwhite">Home</span></a></li>




            <li><a href="#_" className="menuitem_drop"><span className="topnav_trebuchet16Bwhite">Shop</span></a>


              <div className="dropdown_4columns">

                <div className="col_full firstcolumn">

                  <h2>Current Featured Products</h2>

                  <div className="col_one_quarter firstcolumn" align="center"> <a href="https://www.ipsports.net/ecps/ecapper_store/product_info.php?PRODUCT_ID=6000106&amp;SITE_ID=0"><img src="https://www.ipsports.net/ecps/site_locals/store/0/product_images/fb.jpg" width="82" border="0"  alt="" />

                    <p>Playbook Football Newsletter online weekly subscription thru the Super Bow...</p></a>

                  </div>



                  <div className="col_one_quarter" align="center"> <a href="https://www.ipsports.net/ecps/ecapper_store/product_info.php?PRODUCT_ID=1190&amp;SITE_ID=0"><img src="https://www.ipsports.net/ecps/site_locals/store/0/product_images/2014yb.jpg" width="82"  border="0"  alt="" />
                    <p>Marc Lawrence's Playbook Football Preview Guide magazine is the nation's best-selling football publication...</p></a>

                  </div>



                </div>

                <div className="fullwidth">

                  <h2>Products And Services</h2>
                  <div className="col_full">

                    <h3>Online Publications</h3>
                    <p><a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&amp;CATEGORY_ID=1">Newsletters, Digital Magazines and more.</a><br /><a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&amp;CATEGORY_ID=1">Read more...</a></p>




                    <h3>Print Publications</h3>
                    <p><a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&amp;CATEGORY_ID=2">Magazines, Black Book
                      Stat & Log Book
                      Printed and Shipped.</a><br /><a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&CATEGORY_ID=2">Read more...</a></p>





                    <h3>Services</h3>
                    <p>  <a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&amp;CATEGORY_ID=3">Marc Lawrence's
                      Late Phone Service,
                      All Sports, Internet Picks
                      Packages</a><br /><a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&CATEGORY_ID=3">Read more...</a></p>



                    <h3>Memberships</h3>
                    <p>  <a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&CATEGORY_ID=ALL">VIP All Access Membership, Members Save 20% All The Time Everytime!</a><br /><a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&CATEGORY_ID=ALL">Read more...</a></p>




                  </div>



                </div>


              </div>


            </li>




            <li><a href="#_" className="menuitem_drop"><span className="topnav_trebuchet16Bwhite">Experts</span></a>


              <div className="dropdown_1column dropdown_flyout">


                <ul className="levels">

                  <li><a href="http://198.15.73.20:1039/#/">Today's Guaranteed Picks</a></li>
                  <li><a href="http://www.playbook.com/Playbook-Sports-Picks#freepicks">Today's Free Picks</a></li>
                  <li><a href="http://www.playbook.com/Playbook-Handicappers/">Experts Home Page</a></li>
                  <li><a href="http://www.playbook.com/Handicapper-Report-Card">Experts Report Card</a></li>
                  <li><a href="http://www.playbook.com/Playbook-Picks-Policy">Playbook Picks Policy</a></li>
                </ul>


              </div>


            </li>




            <li className="menuitem_nodrop"><a href="http://www.playbook.com/Playbook-Lines-Scores/"><span className="topnav_trebuchet16Bwhite">Lines/Scores</span></a></li>




            <li className="menuitem_nodrop"><a href="http://www.playbook.com/Playbook-Basketball/"><span className="topnav_trebuchet16Bwhite">Basketball</span></a></li>




            <li className="menuitem_nodrop"><a href="http://www.playbook.com/Playbook-Football/"><span className="topnav_trebuchet16Bwhite">Football</span></a></li>
            <li className="menuitem_nodrop"><a href="http://www.playbook.com/TokenRewards/"><span className="topnav_trebuchet16Bwhite">Get Tokens</span></a></li>




            <li><a href="http://www.playbook.com/Playbook-Betting-Tools/" className="menuitem_drop"><span className="topnav_trebuchet16Bwhite">Betting Tools</span></a>


              <div className="dropdown_1column dropdown_flyout">


                <ul className="levels">


                  <li><a href="http://www.playbook.com/Playbook-Stats-Center">Stats Center</a></li>
                  <li><a href="http://www.playbook.com/Playbook-Betting-Tools#capperslounge">Cappers Lounge</a></li>
                  <li><a href="http://www.playbook.com/Playbook-Betting-Tools/vids_audio.php">Videos / Podcast</a></li>
                  <li><a href="http://www.playbook.com/Playbook-Advantage">Playbook Advantage</a></li>
                  <li><a href="http://www.playbook.com/angles_systems_trends.html">Systems, Angles & Trends</a></li>
                  <li><a href="http://www.playbook.com/blackbook_systems.html">Black Book Systems</a></li>
                  <li><a href="http://www.sportsbookreview.com/betting-sites/" target="_blank">Sportsbook Rankings</a></li>

                  <li><a href="http://www.playbook.com/pages/sports_pages2012.html">Sports Pages</a></li>


                </ul>


              </div>


            </li>

            <li className="menuitem_nodrop"><a href="http://www.playbook.com/ecps/default/member_login.php"><span className="topnav_trebuchet16Bwhite">Member Center</span></a></li>





          </ul>



        </div>



      </div>


      </div>
      </div>

    </React.Fragment>


  )

}


const PicksFooter = (props) => {

  return (
    <div id="footer">
      <div className="container">
        <ul className="nav">
          <li><a href="http://www.playbook.com/Playbook-About-Us" className="topnav_trebuchet12">About
            Us</a>|
          </li>
          <li><a href="http://www.playbook.com/ecps/default/member_login.php"
                 className="topnav_trebuchet12">Contact Us</a>|
          </li>
          <li><a href="http://www.playbook.com/ecps/default/member_login.php"
                 className="topnav_trebuchet12">Log In</a>|
          </li>
          <li><a href="http://www.playbook.com/ecps/default/member_login.php"
                 className="topnav_trebuchet12">Member Center</a>|
          </li>
          <li><a href="http://www.playbook.com/member/register?PLAYBOOK=YES" className='iframe'><span
            className="topnav_trebuchet12w">Register</span></a>|
          </li>
          <li><a href="http://www.playbook.com/Playbook-Privacy-Policy" className="topnav_trebuchet12">Privacy
            Policy</a>|
          </li>
          <li><a href="http://www.playbook.com/index_store.php" className="topnav_trebuchet12">Store</a>
          </li>
        </ul>
      </div>
      <div className="wrapper">
        <div className="fleft"><span className="trebuchet13">Copyright &copy; 2018&nbsp;Playbook&reg;
          Enterprises Inc.<i>&nbsp;&nbsp;<br />
        </i>Toll Free Support:&nbsp;1-800-643-4700&nbsp;&nbsp;All Logos &copy; to their&nbsp;respective organizations. This website does not endorse or encourage illegal gambling. All information contained herein is for amusement purposes only. Any contrary of such information is specifically prohibited.</span>
        </div>

      </div>
    </div>
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
              Test Interface
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

            <Route component={Footer}/>


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