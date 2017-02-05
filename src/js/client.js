import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./components/Layout";  // Nav & Footer?

import Cubemain from "./pages/Cubemain";
import ExpertPicks from "./pages/ExpertPicks";

import Publications from "./pages/Publications";
import ScoresLines from "./pages/ScoresLines";
import VideosPodcasts from "./pages/VideosPodcasts";
import LineMoves from "./pages/LineMoves";
import TrendsMatchups from "./pages/TrendsMatchups";
import SteamAlerts from "./pages/SteamAlerts";
import SportsPages from "./pages/SportsPages";
import BettingTools from "./pages/BettingTools";
import EcapperPicks from "./pages/EcapperPicks";
import PickForSale from "./pages/PickForSale";

import Login from "./pages/Login";

const app = document.getElementById('cubeapp');
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Cubemain}></IndexRoute>
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
			<Route path="sports-pages" name="sports-pages" component={SportsPages} />
			<Route path="betting-tools" name="betting-tools" component={BettingTools} />
			<Route path='ecapper-picks(/:ecapperdata)' component={EcapperPicks} />
			<Route path='pick-forsale(/:pick_id)' component={PickForSale} />
			<Route path='login' name="login" component={Login} />

		{/*	<Route path='picks' component={Picks} />*/}

		</Route>
	</Router>,
	app);



