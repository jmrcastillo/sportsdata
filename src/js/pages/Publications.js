/**
 * Created by me on 1/31/17.
 */
/**
 * Created by me on 1/15/17.
 */
import React from "react";

//var Iframe = require("react-iframe");
import Iframe from "react-iframe";

export default class Publications extends React.Component {
	render() {
//		console.log("settings");
		return (
			<div>

				<Iframe url="http://mobile.playbook.com/cube/pubs.php"  width="50%"/>

			</div>
		);
	}
}