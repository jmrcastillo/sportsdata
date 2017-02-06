/**
 * Created by me on 1/31/17.
 */
import React from "react";

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
	DESTINATION_ROUTE: '/fakeroute'
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
				<Header/>
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