/**
 * Created by me on 1/31/17.
 */
/**
 * Created by me on 1/15/17.
 */
import React from "react";

import Iframe from "react-iframe";

export default class SportsPages extends React.Component {
	render() {
		return (
			<div>
				<Iframe url="http://mobile.playbook.com/cube/sportspages.php"  width="100%"/>
			</div>
		);
	}
}