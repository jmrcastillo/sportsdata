/**
 * Created by me on 1/31/17.
 */

import React from "react";

import Iframe from "react-iframe";

export default class Wagertalk extends React.Component {
	render() {
		return (
			<div>
				<Iframe url="https://www.wagertalk.com"  width="100%"/>
			</div>
		);
	}
}