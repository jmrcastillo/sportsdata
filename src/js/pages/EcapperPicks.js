/**
 * Created by me on 1/31/17.
 */

import React from "react";
import $ from "jquery";
import Base64 from "base-64";
import Money from "money-formatter";
import SportsCodes from "../lib/SportsCodes";


/*

class Codes  {

	constructor() {
		this.sports = {
			12: 'NFL Football',
			13: 'NCAA Football',
			10: 'NBA Basketball',
			11: 'NCAA Basketball',
			1: 'NBA Baseball',
			6: 'Hockey',
			8: 'Soccer',
			7: 'Horse Racing',
			9: 'Auto Racing',
			5: 'Golf',
			3: 'Boxing',
		};
	}
	getText(sport) {
		return this.sports[sport];
	}
}

var SportsCodes = new Codes();
*/

class ShoppingList extends React.Component {
	render() {
		return (
			<div className="shopping-list">
				<h1>Shopping List for {this.props.name}</h1>
				<ul>
					<li>Instagram</li>
					<li>WhatsApp</li>
					<li>Oculus</li>
				</ul>
			</div>
		);
	}
}

class AnyText extends React.Component {
	render() {
		return (
			<div>
		ANY TEXT
			</div>
		);
	}
}

class GreenText extends React.Component {

	render() {
		const color = {color: "green"};
		return (
			<span style={color}>
			{this.props.text}
			</span>
		);
	}
}

/*
class GreenText extends React.component {

	render() {
		const color = {color: "green"};
		return
		<span style={color}>
		{this.props.text}
		</span>
	}
}*/

export default class EcapperPicks extends React.Component {

	constructor() {
		super();

		this.state = {
			picks: [],
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

				this.setState({picks: Object.values(picks)});
				console.log ("Got picks ", picks);
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

		//const { ecapperdata} = this.props.params;
/*
 "pick_id":324331,
 "title":"Marc Lawrence 15-1 ATS College Hoops Killer Revenge Play! - Thursday ",
 "sport":"11",
 "teaser":"If you enjoyed yesterday\u00e2\u20ac\u2122s College Hoops Killer Revenge Play when Florida State assaulted Miami Florida, you\u00e2\u20ac\u2122ll love <strong>Marc\u00e2\u20ac\u2122s College Hoops Killer Revenge Play</strong>&nbsp;on Thursday night. Get it now and learn the amazing <strong>15-1 ATS </strong>winning angle inside the game - you\u00e2\u20ac\u2122ll be glad you did!&nbsp;",
 "price":20,
 */
		return (
			<div>
			PICKS List for {this.state.handicapper_name}
			<table width="100%" border="0" cellSpacing="0" cellPadding="0">
			<tbody>
			{this.state.picks.map((pick, i) => {
				var url = "/#/pick-forsale/" + pick.pick_id;
				return (
					<tr key={i}>
					<td>
						<table>
							<tbody>
							<tr>
								<td colSpan="2"><img src={this.state.photo_uri} width="70"  border="0"/>&nbsp;&nbsp;{this.state.handicapper_name}</td>
							</tr>
							<tr>
								<td colSpan="2">{SportsCodes.getText(pick.sport)}</td>
							</tr>
							<tr>
								<td colSpan="2">{pick.title}</td>
							</tr>
							<tr>
								<td colSpan="2">
{/*									<ReadMore lines={1} onShowMore={this.props.onChange} text="more">
									{pick.teaser}
									</ReadMore>*/}
{/*									<TextTruncate
										line={1}
										truncateText="…"
										text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
										textTruncateChild={<a href="#">Read on</a>}
									/>*/}
									{pick.teaser}
								</td>
							</tr>
							<tr>
								<td width="100" align="left">{/* pick.price == 0 ? "<em>FREE</em>" : Money.format ('USD', pick.price)*/}
								<GreenText text="FREE"/>
								</td>
								<td align="right">{pick.price > 0 ? <img src="images/buy_now.png" width="70" height="20" border="0" /> : ''}</td>
							</tr>
							<tr>
							<td colSpan="2"><hr /></td>
							</tr>
							</tbody>
						</table>
					</td>
					</tr>
			)
		})}
		</tbody>
		</table>
		</div>
		);
	}
}

/*					<tr key={i}>
 <td key="0" width="300" align="left"><a href={url}>{pick.title}</a></td>
 <td key="1" width="370"  align="left"><a href={url}>{pick.teaser.substring(0, 80)}</a></td>
 <td key="2" align="left"><a href={url}>{pick.price}</a></td>

 </tr>
 */









