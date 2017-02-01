import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./components/Layout";  // Nav & Footer?

import Cubemain from "./pages/Cubemain";
import Publications from "./pages/Publications";


const app = document.getElementById('app');
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Cubemain}></IndexRoute>
{/*
			<Route path="archives(/:article)" name="archives" component={Archives}></Route>

			<Route path="settings" name="settings" component={Settings}></Route>
 */}

			<Route path="publications" name="publications" component={Publications} />

		</Route>
	</Router>,
	app);



