/**
 * Created by me on 1/31/17.
 */
/**
 * Created by me on 1/15/17.
 */
import React from "react";

import Iframe from "react-iframe";

export default class ScoresLines extends React.Component {
	render() {
		return (
			<div>
				<Iframe url="https://www.ipsports.net/ecps/cube-content/lines/lines.php"  width="100%"/>
			</div>
		);
	}
}