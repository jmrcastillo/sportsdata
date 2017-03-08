/**
 * Created by me on 1/31/17.
 */

import React from "react";
import $ from "jquery";
import Base64 from "base-64";
import Money from "money-formatter";
import SportsCodes from "../lib/SportsCodes";
import Update from "immutability-helper";

/*class GreenText extends React.Component {

	render() {
		const color = {color: "green"};
		return (
			<span style={color}>
			{this.props.text}
			</span>
		);
	}
}*/

export default class EcapperPicks extends React.Component {

	constructor() {
		super();

		this.state = {
			picks: [],
			teaserEnabled: [],
		};
	}
	componentWillMount() {
		const values = Base64.decode(this.props.params.ecapperdata).split("|");
		this.setState({ecapper_id: values[0], photo_uri: values[1], handicapper_name: values[2]});
	}
	componentDidMount() {
		this.loadPicks();
	}

	loadPicks() {
		let url =  `https://www.playbook.com/cube-api3/experts/${this.state.ecapper_id}/picks`;
	//	console.log ("Trying to load url", url);

		$.ajax({
			//url: this.props.url,
			url: url,
			dataType: 'json',
			type: 'GET',
			cache: false,
			success: (picks) => {
				const paidPicks = Object.values(picks).filter(pick=> {
					if (pick.price > 0) {
						return pick;
					}
				});
				this.setState({picks: paidPicks});
				this.setState ({teaserEnabled: paidPicks.map((pick) => {return false})});

				console.log ("Got picks ", paidPicks);
			},
			error: (xhr, status, err) => {
				console.error(url, status, err.toString());
			}
		});

	}

/*	handleClick(e) {
		console.log ("CLICKED");
		debugger;
		this.context.router.transitionTo('/');
	}*/

	render() {

/*
 "pick_id":324331,
 "title":"Marc Lawrence 15-1 ATS College Hoops Killer Revenge Play! - Thursday ",
 "sport":"11",
 "teaser":"If you enjoyed yesterday\u00e2\u20ac\u2122s College Hoops Killer Revenge Play when Florida State assaulted Miami Florida, you\u00e2\u20ac\u2122ll love <strong>Marc\u00e2\u20ac\u2122s College Hoops Killer Revenge Play</strong>&nbsp;on Thursday night. Get it now and learn the amazing <strong>15-1 ATS </strong>winning angle inside the game - you\u00e2\u20ac\u2122ll be glad you did!&nbsp;",
 "price":20,
 */
		return (
			<div>
				<div></div>
{/*
			PICKS List for {this.state.handicapper_name}
*/}
			<table width="100%" border="0" cellSpacing="0" cellPadding="0">
			<tbody>
			{this.state.picks.map((pick, i) => {
				if (pick.price > 0) {

			//	const url = "/#/pick-forsale/" + pick.pick_id;
				const buyUrl = `https://www.ipsports.net/ecps/default/gpicks_4sale.php?SITE_ID=11&SEARCH_MODE=ECAPPER_ID&ECAPPER_ID=${this.state.ecapper_id}`;
				return (
					<tr key={i}>
					<td>
						<table>
							<tbody>
							<tr>
								<td colSpan="2"><img src={this.state.photo_uri} width="70"  alt={this.state.handicapper_name} border="0"/>&nbsp;&nbsp;{this.state.handicapper_name}</td>
							</tr>
							<tr>
								<td colSpan="2">{SportsCodes.getText(pick.sport)}</td>
							</tr>
							<tr>
								<td colSpan="2">{pick.title}</td>
							</tr>
							<tr>
								<td colSpan="2" onClick={(event) => {

									//	console.log ("toggling to", i, ! this.state.teaserEnabled[i])

										this.setState({teaserEnabled:
											Update(this.state.teaserEnabled,
											{[i]: {$set: ! this.state.teaserEnabled[i]}})
										})

									}}>
									{this.state.teaserEnabled[i] ? pick.teaser + ' <<Read less' : 'Read more >>'}
								</td>
							</tr>
							<tr>
								<td width="100" align="left">  {Money.format ('USD', pick.price)}
								</td>
								<td align="right"><a href={buyUrl}><img src="images/buy_now.png" width="70" height="20" border="0"/></a></td>
							</tr>
							<tr>
							<td colSpan="2"><hr /></td>
							</tr>
							</tbody>
						</table>
					</td>
					</tr>
			)
		}})}
		</tbody>
		</table>
		</div>
		);
	}
}


/*
	Another way to do the Update function for array element in this.state:
 this.state.teaserEnabled[i] = ! this.state.teaserEnabled[i];
 this.forceUpdate();

 */





