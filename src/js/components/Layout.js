/**
 * Created by me on 1/31/17.
 */
import React from "react";

//import Footer from "./Footer";
//import Header from "./Header";
//import Main from "./Main";

//import NameForm from "./NameForm";


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
				{this.props.children}
			</div>
		);
	}
}
