/**
 * Created by me on 1/31/17.
 */
/**
 * Created by me on 1/15/17.
 */
import React from "react";
import $ from "jquery";


export default class EcapperPicks extends React.Component {

	constructor() {
		super();
		this.state = {
			picks: [],
		};
	}

	componentDidMount() {
		this.loadPicks();

	}

	loadPicks() {
		let url =  `https://www.playbook.com/cube-api3/experts/${this.props.params.ecapper}/picks`;
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

		const { ecapper} = this.props.params;
/*
 "pick_id":324331,
 "title":"Marc Lawrence 15-1 ATS College Hoops Killer Revenge Play! - Thursday ",
 "sport":"11",
 "teaser":"If you enjoyed yesterday\u00e2\u20ac\u2122s College Hoops Killer Revenge Play when Florida State assaulted Miami Florida, you\u00e2\u20ac\u2122ll love <strong>Marc\u00e2\u20ac\u2122s College Hoops Killer Revenge Play</strong>&nbsp;on Thursday night. Get it now and learn the amazing <strong>15-1 ATS </strong>winning angle inside the game - you\u00e2\u20ac\u2122ll be glad you did!&nbsp;",
 "price":20,



 */
		return (

			<div>
				PICKS List for {ecapper}
				<table width="100%" border="0" cellSpacing="0" cellPadding="0">
					<tbody>
					{this.state.picks.map((pick, i) => {
						var url = "/#/pick-forsale/" + pick.pick_id;
						return <tr key={i}>
							<td key="0" width="300" align="left"><a href={url}>{pick.title}</a></td>
							<td key="1" width="370"  align="left"><a href={url}>{pick.teaser.substring(0, 80)}</a></td>
							<td key="2" align="left"><a href={url}>{pick.price}</a></td>

						</tr>
					})}
					</tbody>
				</table>
			</div>
		);
	}
}

