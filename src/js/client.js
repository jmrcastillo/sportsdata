import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./components/Layout";  // Nav & Footer?

import Picksmain from "./pages/Picksmain";





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
