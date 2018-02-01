/**
 * Created by me on 1/31/17.  Re-deployed 12-2017
 */

import React from "react";
import PickList from "../components/PickList";
import Login from "../components/Login";
import PicksAPI from "../lib/PicksAPI";
import SportsCodes from "../lib/SportsCodes"

import Cart from "../components/Cart";
import PubSub from 'pubsub-js';
import Moment from "moment";


export default class Picksmain extends React.Component {

	constructor() {
		super();
		this.pubsub = PubSub;

		this.state = {
			picks: [],
			allPicks: [],
			freePicks: [],
			logged_in: false,
		};
	}

	componentWillMount() {

	}
	componentDidMount() {

		this.loadPicks(this, true);
		setInterval(this.loadPicks, 60000, this);


		// Messaging pubsub
		this.pubsub.subscribe('logged-in', (message, data)=> {
			this.setState({logged_in: true});
		});
		this.pubsub.subscribe('logged-out', (message, data)=> {
			this.setState({logged_in: false});
		});

	}

	componentWillUnmount() {

	}
	loadPicks(self, firstLoad=false) {

		//    var newPicks = [];

		PicksAPI.loadPicks().done((picks) => {
				/*            newPicks = picks.map(pick => {
				 // Todo:  Any processing on load..
				 return pick;
				 });

				 self.setState({picks:newPicks});*/

				const freePicks = picks.filter(pick=>{
					return parseInt(pick.price) === 0;
				});
				self.setState({freePicks: freePicks});


				var paidPicks = picks.filter(pick=>{
					return parseInt(pick.price) > 0;
				});



				var allPicks = {};
				SportsCodes.getSportsOrdered().forEach (sport=>{
					allPicks[sport] = [];
				});

const maxPicks = 23000;
	///			const maxPicks = 20;


				paidPicks.forEach((pick, index)=>{
					if (index < maxPicks)
						allPicks[pick.sport].push(pick);
				});



				self.setState({allPicks: allPicks});

			}
		);
	}

	featuredFreePick(self) {
		if (this.state.freePicks.length == 0) {
			return null;
		}
		return this.state.freePicks.reduce((prev, curr, index)=> {

			/*           if (Moment(curr.created_date) > Moment(prev.created_date)) {
			 return curr;
			 } else {
			 return prev;
			 }*/
			return (Moment(curr.created_date) > Moment(prev.created_date)) ? curr : prev;
		}, this.state.freePicks[0])
	}

	render() {
		return (

			<main className="main">
			<div className="container">
			<span className="item active">

			</span>
			<br />
			<br />

				<table width="1000" border="0" cellSpacing="0" cellPadding="0">
					<tbody>
					<tr>

						<td align="left" style={{verticalAlign: 'top' }}>
							<PickList
								/*  Checkout - Replace by CartZoom  */
								pubsub={this.pubsub}
							allPicks={this.state.allPicks}
							/>
						</td>
						<td style={{verticalAlign: 'top' }}>



							<div className="col-5b maxheight">
                                {/*<!-- box begin -->*/}
								<div className="box maxheight">
									<div className="border-top maxheight">
										<div className="border-right maxheight">
											<div className="border-bot maxheight">
												<div className="border-left maxheight">
													<div className="left-top-corner maxheight">
														<div className="right-top-corner maxheight">
															<div className="right-bot-corner maxheight">
																<div className="left-bot-corner maxheight">
																	<div className="inner2">
																		{true ?

																			/*  Checkout - Display Member Info from store fragment  */
																			<Login
																				freePick={this.featuredFreePick(this.state.freePicks)}
																				pubsub={this.pubsub}
																			/>
																			: ''
																		}
																		<br />
																		<br />
																		<Cart
																			/*  Checkout - Disappears vanishes */

																			pubsub={this.pubsub}
																			loggedIn={this.state.logged_in}

																		/>
																		<br />
																		<p style={{textAlign: 'center'}}>
																			<a href="http://record.webpartners.co/_urEveSwgFbXpoAg-rElY5NKIKMO3cZ1b/4/" target="blank" title="%DESCRIPTION%%" ><img src="http://media.webpartners.co/uploads/MB-GenSports-PromCodePLAYBOOK-280x280.gif" width="280" height="280" alt="Bet on Sports-Join MyBookie.ag today!" /></a></p>
																		<br />
                                                                        {/*<h11>&nbsp;Playbook Publications</h11>
																		 <span className="list5">
																		 <br />
																		 <a href="https://www.ipsports.net/ecps/ecapper_store/product_info.php?PRODUCT_ID=1190&amp;SITE_ID=0"><img src="https://www.ipsports.net/ecps/site_locals/store/0/product_images/2014yb.jpg" alt="NFL Totals Tip Sheet!" width="82" height="104" hspace="4" border="0" align="left" /><span className="topnav_trebuchet14Bred">2017 Playbook Football Handicapper's Yearbook Magazine</span><br />
																		 <span className="topnav_trebuchet12">Marc Lawrence's Playbook Football Preview Guide magazine is the nation's best-selling combination College and NFL Preview publication and is now available for sale and on the newsstands nationwide in mid-June. The 2017 magazine contains 248 pages of wall-to-wall information, jam packed with stats, logs, trends, winning systems, College and NFL previews, ATS Top 10 Teams, exclusive charts (Monday Night results, Coaches records, College Overtime games and many more.
																		 </span>
																		 </a>


																		 <br />
																		 <br />
																		 <a href="https://www.ipsports.net/ecps/ecapper_store/product_info.php?PRODUCT_ID=300106&SITE_ID=0"><img src="https://www.ipsports.net/ecps/site_locals/store/0/product_images/fb.jpg" alt="" width="82" height="104" border="0" />
																		 <h5><span className="topnav_trebuchet14Bred">2017 Weekly Playbook Football Newsletter</span></h5>
																		 <span className="topnav_trebuchet12">Includes: Playbook Football Newsletter online weekly subscription The weekly Playbook Football Newsletter spans College and NFL Games throughout the 2017 season straight through the Super Bowl, featuring comprehensive write-ups on every College and NFL game along with star-rated Best Bets, Upset Specials, Awesome Angles, Top Trends, Incredible Stats, Wise Guy Contest Picks and a complete schedule with opening lines and projected margins for the entire week. Don't make a move without it!</span></a>

																		 </span>*/}
																	</div><br /><br />

																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
                                {/* <!-- box end -->*/}













							</div>

						</td>
					</tr>

					</tbody>
				</table>



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


//console.log ("PicksAPI test: ", PicksAPI.loadServerTime().done());
/*
var str = 'U2FsdGVkX18uvkm7rx2CrE4CYs/je0Z8ey67IijN3+cu2jRjrne1ilEnooFG5XW6';
console.log(str, str.replace('/', '%2F'));*/







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

/*	handleChange(e) {
 const title = e.target.value;
 this.props.changeTitle(title);
 }*/
