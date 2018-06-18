// inside src/index.js
import React, {Component, Fragment} from 'react'
import {render} from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const AppContext = React.createContext();
import Picksmain from "./pages/Picksmain";



// Dummy test components for context api
class Person extends Component {
  render() {
    return (
      <div className="person">
        <AppContext.Consumer>
          {(context) => (
            <React.Fragment>
              Dummy Content
              <p>Age: {context.state.age}</p>
              <p>Name: {context.state.name}</p>
              <button onClick={e =>{
                console.log ("dummy value: ", context.dummy);
                context.growAYearOlder();
              }}>Add a Year</button>
            </React.Fragment>
          )}
        </AppContext.Consumer>
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




const Top = (props) => {

    if (props.location.pathname == '/' || props.location.pathname == '/picks-mobile') {
        return ('')
    }

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

                                    <li><a href="http://www.playbook.com/Playbook-Sports-Picks">Today's Picks</a></li>
                                    <li><a href="https://www.ipsports.net/ecps/default/gpicks_4sale_x.php?SITE_ID=0&GROUP_BY_SPORT=YES" onClick="NewWindow(this.href,'name','750','550','yes');return false;">Today's Picks By Sport</a></li>
                                    <li><a href="http://www.playbook.com/Playbook-Handicappers/">Today's One-Day-Pass</a></li>
                                    <li><a href="http://www.playbook.com/Playbook-Sports-Picks#freepicks">Today's Free Picks</a></li>
                                    <li><a href="http://www.playbook.com/capper_ypicks2.php" className='iframe'>Yesterday's Picks</a></li>
                                    <li><a href="http://www.playbook.com/Playbook-Handicappers/">Experts Home Page</a></li>
                                    <li><a href="http://www.playbook.com/Handicapper-Report-Card">Experts Report Card</a></li>
                                    <li><a href="http://www.playbook.com/Playbook-Handicappers/">Meet The Experts</a></li>
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



const Footer = (props) => {
    //console.log ("FOOTER (path)", props.location.pathname);

    if (props.location.pathname == '/' || props.location.pathname == '/picks-mobile') {
        return ('')
    }

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







/*



const PageLayout = (props) => {

//    console.log(props.location.pathname);


    return (
        <React.Fragment>
            <Footer/>
        </React.Fragment>
    )
}
*/




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


// Global Provider
class AppProvider extends Component {

  state = {
    name: 'Playbook test',
    age: 10,
    cool: true,
    picks: [],
  }

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        growAYearOlder: () => this.setState({
          age: this.state.age + 1
        }),
        dummy: 100,
        /*      loadPicks: ()=> {
                  console.log("Picks loaded");
                  PicksAPI.loadPicks().done((picks) => {
                      this.setState({picks: picks});
                  });
              }*/

      }}>
      {this.props.children}
      </AppContext.Provider>
    )
  }
}



class App extends Component {
  render() {

      return (
      <AppProvider>
        <Router>
          <React.Fragment>
{/*          <p>Supported App URLS:<br />
            <Link to="/">Home</Link>
            <br />
            <Link to="/about">About</Link>
            <br />
            <Link to="/picks">Picks</Link>
            <br />
            <Link to="/member-center">Member Center</Link>
            <br />

            <Link to="/test">Test</Link>

            <br />
            <Link to="/university">University</Link>
          </p>*/}


           {/* <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </ul>*/}
          <Route component={Top}/>

          <Route exact path="/" component={Holder} />
          <Route path="/about" component={About} />
          <Route path="/picks" component={Picksmain} />
          <Route path="/member-center" component={MemberCenter} />
          <Route path="/university" component={University} />
          <Route component={Footer}/>


          </React.Fragment>
        </Router>
      </AppProvider>
    );
  }
}
//console.log("HELLO");

render(
  <App/>,
  document.getElementById('picksapp')

)


//       <Holder/>

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