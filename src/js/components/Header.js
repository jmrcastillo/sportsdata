/**
 * Created by me on 1/31/17.
 */
import React from "react";

//import Title from "./Header/Title";

export default class Header extends React.Component {
/*	handleChange(e) {
		const title = e.target.value;
		this.props.changeTitle(title);
	}*/

	render() {
		console.log ("Render Header");
		return (

			<header className="header">
				<h1 className="header__title">Playbook Cube</h1>
				<button id="butRefresh" className="headerButton" aria-label="Refresh"/>
				<button id="butAdd" className="headerButton" aria-label="Add"/>
			</header>

		);
	}
}
