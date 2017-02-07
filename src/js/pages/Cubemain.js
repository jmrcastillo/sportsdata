/**
 * Created by me on 1/31/17.
 */
import React from "react";
import Carousel from "nuka-carousel";

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
				<Carousel autoplay={true} wrapAround={true} width="750px">
					<img src="/images/carousel01.jpg"/>
					<img src="/images/carousel02.jpg"/>
					<img src="/images/carousel03.jpg"/>
					<img src="/images/carousel04.jpg"/>
				</Carousel>




			<div align="center">
			<img src="images/nav.jpg" alt="Cube" width="80%" useMap="#Map" />
			<map name="Map">
				<area shape="rect" coords="-1,1,201,197" href="/#/expert-picks"/>
				<area shape="rect" coords="199,-1,405,198" href="/#/publications"/>
				<area shape="rect" coords="402,1,598,199" href="/#/scores-lines"/>
				<area shape="rect" coords="-2,195,200,395" href="/#/videos-podcasts"/>
				<area shape="rect" coords="201,197,400,397" href="/#/line-moves"/>
				<area shape="rect" coords="401,195,599,394" href="/#/trends-matchups"/>
				<area shape="rect" coords="2,395,202,590" href="/#/steam-alerts"/>
				<area shape="rect" coords="200,395,401,590" href="/#/sports-pages"/>
				<area shape="rect" coords="400,394,597,590" href="/#/betting-tools"/>
			</map>
			</div>
			</div>
			</main>

		);
	}
}
