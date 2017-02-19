/**
 * Created by me on 1/31/17.
 */
import React from "react";
//import Carousel from "nuka-carousel";
import Carousel from "../lib/carousel";

//import Title from "./Header/Title";

export default class Cubemain extends React.Component {
/*	handleChange(e) {
		const title = e.target.value;
		this.props.changeTitle(title);
	}*/

	render() {
		return (

			<main className="main">
			<div className="container"><span className="item active"></span>

				{/*		React Component Carousel
						Documentation at
				        https://github.com/FormidableLabs/nuka-carousel
				 */}
				<Carousel autoplay={true} wrapAround={false} showNextPrev={false} width="100%">
					<img src="/images/carousel04.jpg"/>
					<img src="/images/carousel02.jpg"/>
					<img src="/images/carousel03.jpg"/>
					<img src="/images/carousel01.jpg"/>
				</Carousel>




				<table width="100%" border="0">
					<tr>
						<td><div align="center"><a href="/#/expert-picks"><img src="/images/nav_tiles/tile01.jpg"/></a></div></td>
						<td><div align="center"><a href="/#/publications"><img src="/images/nav_tiles/tile02.jpg"/></a></div></td>
						<td><div align="center"><a href="/#/scores-lines"><img src="/images/nav_tiles/tile03.jpg"/></a></div></td>
					</tr>
					<tr>
						<td><div align="center"><a href="/#/videos-podcasts"><img src="/images/nav_tiles/tile04.jpg"/></a></div></td>
						<td><div align="center"><a href="/#/line-moves"><img src="/images/nav_tiles/tile05.jpg"/></a></div></td>
						<td><div align="center"><a href="/#/trends-matchups"><img src="/images/nav_tiles/tile06.png"/></a></div></td>
					</tr>
					<tr>
						<td><div align="center"><a href="/#/steam-alerts"><img src="/images/nav_tiles/tile07.jpg"/></a></div></td>
						<td><div align="center"><a href="/#/sports-pages"><img src="/images/nav_tiles/tile08.png"/></a></div></td>
						<td><div align="center"><a href="/#/betting-tools"><img src="/images/nav_tiles/tile09.png"/></a></div></td>
					</tr>
				</table>
			</div>
			</main>

		);
	}
}
