/**
 * Created by me on 1/31/17.  Re-deployed 12-2017
 */

import React from "react";
import PickList from "../components/PickList";
import Login from "../components/Login";
import PicksAPI from "../lib/PicksAPI";
import SportsCodes from "../lib/SportsCodes"
import Utils from "../lib/Utils";
import Cart from "../components/Cart";
import MemberInfo from "../components/MemberInfo";
import PurchasedPicks from "../components/PurchasedPicks";

import PubSub from 'pubsub-js';
import Moment from "moment";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Consumer from "../lib/ContextAPI";

const MODES = {
    normal: {value: 0, name: "Normal", code: "N"},
    checkout: {value: 1, name: "Checkout", code: "C"},
    showPicks: {value: 2, name: "Show Picks", code: "S"},
};

export default class Picksmain extends React.Component {

	constructor() {
		super();
		this.pubsub = PubSub;
    this.notificationManager = NotificationManager;


		this.state = {
			picks: [],
			allPicks: [],
			freePicks: [],
            selectedPicks: '',
            purchasedPicks: [],
			logged_in: false,
            displayMode: MODES.normal,
            isTokens: false,
            member: {},
            isTestMode: false,
  //          ccard: {}
		};
    }

	componentWillMount() {

	}
	componentDidMount() {

		this.loadPicks(this, true);
		setInterval(this.loadPicks, 60000, this);

        // Messaging pubsub
		this.subscribe_logged_in = this.pubsub.subscribe('logged-in', (message, data)=> {
			this.setState({logged_in: true,
                        member: data});
            if (data.is_suspended && data.is_suspended.toUpperCase() === 'Y') {
                this.notificationManager.error('Your account is suspended', 'Learn more...', 120000, ()=>{
                    alert('There is a problem with your account.  To resolve this, please call us at 1-800-643-4700.');
                });
            }
        });
		this.subscribe_logged_out = this.pubsub.subscribe('logged-out', (message, data)=> {
			this.setState({logged_in: false});
		});
		this.subscribe_mode_normal = this.pubsub.subscribe('mode-normal', (message, data)=> {
			this.setState({displayMode: MODES.normal});
		});
        this.subscribe_mode_checkout = this.pubsub.subscribe('mode-checkout', (message, data)=> {
        	this.setState({displayMode: MODES.checkout,
                            isTokens: data === 'TOKENS'});
        });
        this.subscribe_mode_showpicks = this.pubsub.subscribe('mode-showpicks', (message, data)=> {
            this.setState({displayMode: MODES.showPicks});
        });
        this.subscribe_member_info = this.pubsub.subscribe('member-info', (message, data)=> {
            this.setState({member: data});
        });
        this.subscribe_selected_picks = this.pubsub.subscribe('selected-picks', (message, data)=> {
            console.log("selected-picks", data);
            this.setState({selectedPicks: data});
        });

        this.subscribe_purchase_ccard = this.pubsub.subscribe('purchase-ccard', (message, data)=> {
            this.sendPurchase(false, data, null);
        });

        this.subscribe_purchase_tokens = this.pubsub.subscribe('purchase-tokens', (message, data)=> {
            this.sendPurchase(true, data.ccard ? data.ccard : null, data.tokens);
        });
        this.subscribe_purchase = this.pubsub.subscribe('purchase', (message, data)=> {
			this.sendPurchase(data.isTokens, data.ccard, data.tokens);
        });

        this.subscribe_test_mode = this.pubsub.subscribe('test-mode', (message, data)=> {
            this.setState({isTestMode: ! this.state.isTestMode});
        });


	}


	componentWillUnmount() {
		this.pubsub.unsubscribe(this.subscribe_logged_in);
		this.pubsub.unsubscribe(this.subscribe_logged_out);
        this.pubsub.unsubscribe(this.subscribe_mode_normal);
        this.pubsub.unsubscribe(this.subscribe_mode_checkout);
        this.pubsub.unsubscribe(this.subscribe_mode_showpicks);
        this.pubsub.unsubscribe(this.subscribe_member_info);
        this.pubsub.unsubscribe(this.subscribe_selected_picks);
        this.pubsub.unsubscribe(this.subscribe_purchase_ccard);
        this.pubsub.unsubscribe(this.subscribe_purchase_tokens);
        this.pubsub.unsubscribe(this.subscribe_purchase);
        this.pubsub.unsubscribe(this.subscribe_test_mode);
    }

	loadPicks(self, firstLoad=false) {

		//    var newPicks = [];

// TODO:  Figure out ECAPPER_ID
		const ecapper_id = '';
/*
        const ecapper_id = (this.props && this.props.router.location.query.ECAPPER_ID) ?
            this.props.router.location.query.ECAPPER_ID : '';
*/

  //      console.log("Picksmain params:",  ecapper_id);


        PicksAPI.loadPicks(ecapper_id).done((picks) => {
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
	 //			const maxPicks = 5;


				paidPicks.forEach((pick, index)=>{
					if (index < maxPicks) {
			//			console.log("PICK ", pick.pick_id, pick.sport);
                        allPicks[pick.sport].push(pick);
                    }
				});

//console.log ("allPicks: ", allPicks);

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

    sendPurchase(isTokens, ccard, tokens)  {

        let purchaseData = {isTokens: isTokens};

        (ccard && Object.assign(purchaseData, ccard));
        // TODO:  Could rewrite as assigning only realTokensNeeded, awardTokensApplied, realTokensApplied ?
        (tokens && Object.assign(purchaseData, tokens));

        purchaseData.member_id = this.state.member.member_id;
        purchaseData.selectedPicks = this.state.selectedPicks;
        purchaseData.isTestMode = this.state.isTestMode;
        purchaseData.siteID = Utils.getSiteID();

console.log("** sendPurchase: ", purchaseData);


        PicksAPI.purchaseCCard(purchaseData).done((result) => {
            //     console.log ("AFTER purchaseCCard(), got result status, picks", result.status, result.picks);

            if (result.status) {
                this.setState({purchasedPicks: result.picks});
            }
            this.pubsub.publish('empty-cart');
            this.pubsub.publish('mode-showpicks');
        });
    }



  render() {

		const cart=<Cart
			pubsub={this.pubsub}
			loggedIn={this.state.logged_in}
			isZoomed={this.state.displayMode === MODES.checkout}
            isTokens={this.state.isTokens}
            member={this.state.member}
		/>

    // Mobile rendering support via Context API
    return (
      <Consumer>
      {(context) => (
        context.state.isMobile ? this.renderMobile(cart) : this.renderNormal(cart)
      )}
      </Consumer>
    )

	}

	renderNormal(cart) {
    return (

      <main className="main">
      <div className="container">
			<span className="item active">

			</span>

          {this.state.isTestMode ? " -- Purchases will be done in TEST mode -- ": ''}



          <table width="1000" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
            <tr>

              <td align="left" style={{verticalAlign: 'top' }}>
                {(this.state.displayMode === MODES.normal) &&
                <PickList
                  pubsub={this.pubsub}
                  allPicks={this.state.allPicks}
                  memberSuspended={this.state.member.is_suspended && this.state.member.is_suspended.toUpperCase() === 'Y'}
                  memberLevelFlagged={Utils.checkFlaggedMemberLevel(this.state.member)}
                  selectedPicks={this.state.selectedPicks}
                />
                }
                {(this.state.displayMode === MODES.checkout) &&
                cart
                }
                {(this.state.displayMode === MODES.showPicks) &&
                <PurchasedPicks
                  purchasedPicks={this.state.purchasedPicks}
                  pubsub={this.pubsub}
                />
                }
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
                                      {(this.state.displayMode === MODES.normal) &&
                                      <Login
                                        freePick={this.featuredFreePick(this.state.freePicks)}
                                        pubsub={this.pubsub}
                                        showFreePlay={this.state.selectedPicks.length === 0}
                                        notificationManager={this.notificationManager}
                                      />
                                      }
                                      {(this.state.displayMode === MODES.checkout ||
                                        this.state.displayMode === MODES.showPicks) &&
                                      <MemberInfo
                                        member={this.state.member}
                                        pubsub={this.pubsub}
                                        notificationManager={this.notificationManager}
                                        newRegistration={false}
                                      />
                                      }

                                      <br />
                                      <br />

                                      {(this.state.displayMode === MODES.normal) &&
                                      cart
                                      }

                                      <br />
                                      {/*<p style={{textAlign: 'center'}}>
                                                                        <a href="http://record.webpartners.co/_urEveSwgFbXpoAg-rElY5NKIKMO3cZ1b/4/" target="blank" title="%DESCRIPTION%%" ><img src="http://media.webpartners.co/uploads/MB-GenSports-PromCodePLAYBOOK-280x280.gif" width="280" height="280" alt="Bet on Sports-Join MyBookie.ag today!" /></a></p>
                                      <br />
                                      <h11>&nbsp;Playbook Publications</h11>
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
          <NotificationContainer/>
        </div>
      </main>

    );


  }

  renderMobile(cart) {
    return (

      <main className="main">
        <div>
			<span className="item active">

			</span>

          {this.state.isTestMode ? " -- Purchases will be done in TEST mode -- ": ''}



          <table width="96%" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
            <tr>

              <td align="left" style={{verticalAlign: 'top' }}>
                {(this.state.displayMode === MODES.normal) &&
                <PickList
                  pubsub={this.pubsub}
                  allPicks={this.state.allPicks}
                  memberSuspended={this.state.member.is_suspended && this.state.member.is_suspended.toUpperCase() === 'Y'}
                  memberLevelFlagged={Utils.checkFlaggedMemberLevel(this.state.member)}
                  selectedPicks={this.state.selectedPicks}
                />

                }
                {(this.state.displayMode === MODES.checkout) &&
                cart
                }
                {(this.state.displayMode === MODES.showPicks) &&
                <PurchasedPicks
                  purchasedPicks={this.state.purchasedPicks}
                  pubsub={this.pubsub}
                />
                }
                MOBILE SITE
              </td>
              <td style={{verticalAlign: 'top' }}>


                <div className="col-5b maxheight">
                  {/*<!-- box begin -->*/}
                  <div style={{display: 'none'}} className="box maxheight">
                    <div className="border-top maxheight">
                      <div className="border-right maxheight">
                        <div className="border-bot maxheight">
                          <div className="border-left maxheight">
                            <div className="left-top-corner maxheight">
                              <div className="right-top-corner maxheight">
                                <div className="right-bot-corner maxheight">
                                  <div className="left-bot-corner maxheight">
                                    <div className="inner2">
                                      {(this.state.displayMode === MODES.normal) &&
                                      <Login
                                        freePick={this.featuredFreePick(this.state.freePicks)}
                                        pubsub={this.pubsub}
                                        showFreePlay={this.state.selectedPicks.length === 0}
                                        notificationManager={this.notificationManager}
                                      />
                                      }
                                      {(this.state.displayMode === MODES.checkout ||
                                        this.state.displayMode === MODES.showPicks) &&
                                      <MemberInfo
                                        member={this.state.member}
                                        pubsub={this.pubsub}
                                        notificationManager={this.notificationManager}
                                      />
                                      }

                                      <br />
                                      <br />

                                      {(this.state.displayMode === MODES.normal) &&
                                      cart
                                      }

                                      <br />
                                      {/*<p style={{textAlign: 'center'}}>
                                                                        <a href="http://record.webpartners.co/_urEveSwgFbXpoAg-rElY5NKIKMO3cZ1b/4/" target="blank" title="%DESCRIPTION%%" ><img src="http://media.webpartners.co/uploads/MB-GenSports-PromCodePLAYBOOK-280x280.gif" width="280" height="280" alt="Bet on Sports-Join MyBookie.ag today!" /></a></p>
                                      <br />
                                      <h11>&nbsp;Playbook Publications</h11>
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
          <NotificationContainer/>
        </div>
      </main>

    );


  }




}

