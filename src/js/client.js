import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./components/Layout";  // Nav & Footer?

import Picksmain from "./pages/Picksmain";
import ExpertPicks from "./pages/ExpertPicks";

import Publications from "./pages/Publications";
import ScoresLines from "./pages/ScoresLines";
import VideosPodcasts from "./pages/VideosPodcasts";
import LineMoves from "./pages/LineMoves";
import TrendsMatchups from "./pages/TrendsMatchups";
import SteamAlerts from "./pages/SteamAlerts";
import Wagertalk from "./pages/Wagertalk";
import BettingTools from "./pages/BettingTools";
import EcapperPicks from "./pages/EcapperPicks";
import PickForSale from "./pages/PickForSale";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Purchases from "./pages/Purchases";

import Login from "./pages/Login";
import Register from "./pages/Register";




const picksapp = document.getElementById('picksapp');
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Picksmain}></IndexRoute>
{/*
			<Route path="archives(/:article)" name="archives" component={Archives}></Route>

			<Route path="settings" name="settings" component={Settings}></Route>

            <Route path='/about(/:name)' component={About} />

	*/}

			<Route path="expert-picks" name="expert-picks" component={ExpertPicks} />
			<Route path="publications" name="publications" component={Publications} />
			<Route path="scores-lines" name="scores-lines" component={ScoresLines} />
			<Route path="videos-podcasts" name="videos-podcasts" component={VideosPodcasts} />
			<Route path="line-moves" name="line-moves" component={LineMoves} />
			<Route path="trends-matchups" name="trends-matchups" component={TrendsMatchups} />
			<Route path="steam-alerts" name="steam-alerts" component={SteamAlerts} />
			<Route path="wagertalk" name="wagertalk" component={Wagertalk} />
			<Route path="betting-tools" name="betting-tools" component={BettingTools} />
			<Route path="privacy-policy" name="privacy-policy" component={PrivacyPolicy} />
			<Route path="purchases" name="purchases" component={Purchases} />

			<Route path='ecapper-picks(/:ecapperdata)' component={EcapperPicks} />
			<Route path='pick-forsale(/:pick_id)' component={PickForSale} />
			<Route path='login' name="login" component={Login} />
			<Route path='register' name="register" component={Register} />

		{/*	<Route path='picks' component={Picks} />*/}

		</Route>
	</Router>,
	picksapp);




/*
 class CubeApp extends React.Component {

 render() {
 const color = {color: "green"};
 return (
 <span style={color}>
 {this.props.text}
 </span>
 );
 }
 }



 var App = React.createClass({
 render: function() {
 return (
 <div>
 <h1>Simple SPA</h1>
 <ul className="header">
 <li>Home</li>
 <li>Stuff</li>
 <li>Contact</li>
 </ul>
 <div className="content">

 </div>
 </div>
 )
 }
 });*/
