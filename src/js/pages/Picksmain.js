/**
 * Created by me on 1/31/17.
 */
import React from "react";
//import Carousel from "nuka-carousel";
import Carousel from "../lib/carousel";

//import Title from "./Header/Title";

//import Base64 from "base-64";

import PickList from "../components/PickList";

//console.log ("PicksAPI test: ", PicksAPI.loadServerTime().done());

var str = 'U2FsdGVkX18uvkm7rx2CrE4CYs/je0Z8ey67IijN3+cu2jRjrne1ilEnooFG5XW6';
console.log(str, str.replace('/', '%2F'));







// Experimental encryption stuff
/*
var time = 3200001
var data = {time: time};
console.log("data", JSON.stringify(data));

// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'devotedtoartofsportshandicapping');
console.log(ciphertext);

console.log("Tostring", ciphertext.toString());*/

//console.log (Base64.encode());
/*
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));


console.log(decryptedData);
 */

export default class Picksmain extends React.Component {

	constructor() {
		super();

		this.state = {
		//  was experimental  serverTime: 0,
		};
	}



/*	handleChange(e) {
		const title = e.target.value;
		this.props.changeTitle(title);
	}*/

	render() {
		return (

			<main className="main">
			<div className="container">
				<span className="item active"></span>
				-- PICKS FRAGMENTS HERE --
<br /><br />

				<PickList/>


{/*
				<table width="100%" border="0">
					<tbody>
					<tr>
						<td><div align="center"><a href="/#/expert-picks"><img src="/images/nav_tiles/tile01.png" width="100%"/></a></div></td>
						<td><div align="center"><a href="/#/publications"><img src="/images/nav_tiles/tile02.png" width="100%"/></a></div></td>
						<td><div align="center"><a href="/#/scores-lines"><img src="/images/nav_tiles/tile03.png" width="100%"/></a></div></td>
					</tr>
					<tr>
						<td><div align="center"><a href="/#/wagertalk"><img src="/images/nav_tiles/tile04.png" width="100%"/></a></div></td>
						<td><div align="center"><a href="/#/line-moves"><img src="/images/nav_tiles/tile05.png" width="100%"/></a></div></td>
						/!*<td><div align="center"><a href="/#/trends-matchups"><img src="/images/nav_tiles/tile06.png" width="100%"/></a></div></td>*!/
                        <td><div align="center"><a href="http://cube.statfox.com"><img src="/images/nav_tiles/tile06.png" width="100%"/></a></div></td>


					</tr>
					<tr>
						<td><div align="center"><a href="/#/steam-alerts"><img src="/images/nav_tiles/tile07.png" width="100%"/></a></div></td>
						<td><div align="center"><a href="/#/videos-podcastsq"><img src="/images/nav_tiles/tile08.png" width="100%"/></a></div></td>
						<td><div align="center"><a href="/#/betting-tools"><img src="/images/nav_tiles/tile09.png" width="100%"/></a></div></td>
					</tr>
					</tbody>
				</table>*/}
			</div>
			</main>

		);
	}
}