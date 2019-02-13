/**
 * Created by me on 1/31/17.
 */
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


/*********
 *
 *
 *   Sets up any Nav & Footer use for ALL pages?
 *
 */
//import Footer from "./Footer";
import Header from "./Header";
//import Main from "./Main";

//import NameForm from "./NameForm";

window.cubedata = {
	IS_AUTHENTICATED: false,
	DESTINATION_ROUTE: '/',
	LOGGED_IN_MEMBER: ''
};

export default class Layout extends React.Component {
	constructor() {
		super();
		this.state = {
			title: "! Welcome Lyra React 1025 @@ !",
		};
	}

	changeTitle(title) {
		this.setState({title});
	}

	// Example
	render() {
		return (
			<div>

				<Header router={this.props.router}/>

{/*				{window.cubedata.IS_AUTHENTICATED ? "" : "Not logged in - "}
				{window.cubedata.IS_AUTHENTICATED ? "Logged in as " + window.cubedata.LOGGED_IN_MEMBER :
					<a href="/#/login"> Login </a> }*/}


				{this.props.children}
			</div>
		);
	}
}
/*
 ThemedText.contextTypes = {
 color: React.PropTypes.string
 }

 */