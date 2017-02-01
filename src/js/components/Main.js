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
		return (

			<main className="main">
			<div className="container"><span className="item active"></span>

{/*
			<img src="images/carousel01.jpg" alt="Cube" width="50%"  />
*/}
				<img src="http://placehold.it/500x150" alt="Carousel"   />


					{/*
				CAROUSEL HERE
					  */}

			<div align="center">
			<img src="images/nav.jpg" alt="Cube" width="500" useMap="#Map" />
			<map name="Map">
				<area shape="rect" coords="-1,1,201,197" href="/"/>
				<area shape="rect" coords="199,-1,405,198" href="#"/>
				<area shape="rect" coords="402,1,598,199" href="#"/>
				<area shape="rect" coords="-2,195,200,395" href="#"/>
				<area shape="rect" coords="201,197,400,397" href="#"/>
				<area shape="rect" coords="401,195,599,394" href="#"/>
				<area shape="rect" coords="2,395,202,590" href="#"/>
				<area shape="rect" coords="200,395,401,590" href="#"/>
				<area shape="rect" coords="400,394,597,590" href="#"/>
			</map>
			</div>
			</div>
			</main>

		);
	}
}
