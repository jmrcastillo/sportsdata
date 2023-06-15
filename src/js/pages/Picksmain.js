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
// DELETE M.I.
import MemberInfo from "../components/MemberInfo";
import Event from "../components/Events";
import PurchasedPicks from "../components/PurchasedPicks";

import PubSub from 'pubsub-js';
import Moment from "moment";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {GlobalContext} from "../lib/GlobalContext";

import QueryString from "query-string";
import { Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';

const MODES = {
    normal: {value: 0, name: "Normal", code: "N"},
    checkout: {value: 1, name: "Checkout", code: "C"},
    showPicks: {value: 2, name: "Show Picks", code: "S"},
};



export default class Picksmain extends React.Component {
  static contextType = GlobalContext;

	constructor() {
		super();
		this.pubsub = PubSub;
    this.notificationManager = NotificationManager;


		this.state = {
			picks: [],
			allPicks: [],
			freePicks: [],
      selectedPicks: '',
      cartID: '',
      purchasedPicks: [],
			logged_in: false,
      displayMode: MODES.normal,
      isTokens: false,
      modal: false,
      member: {},
      // DELETE M.I.
      isRegistering: false,
      isTestMode: false,
  //          ccard: {}
    };
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
      this.setState({
        modal: !this.state.modal
      });
    }

  toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
  }

	componentWillMount() {

	}
	componentDidMount() {

		this.loadPicks(this, true);
		setInterval(this.loadPicks, 60000, this);

        // Messaging pubsub
		this.subscribe_logged_in = this.pubsub.subscribe('logged-in', (message, data)=> {
			this.setState({logged_in: true,
                        member: data,
                       isRegistering: false});

            if (data.is_suspended && data.is_suspended.toUpperCase() === 'Y') {
                this.notificationManager.error('Your account is suspended', 'Learn more...', 120000, ()=>{
                    alert('There is a problem with your account.  To resolve this, please call us at 954-377-8000.');
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
                        isTokens: data === 'TOKENS',
                        modal: false});

    });
    this.subscribe_mode_showpicks = this.pubsub.subscribe('mode-showpicks', (message, data)=> {
        this.setState({displayMode: MODES.showPicks});
    });
    this.subscribe_member_info = this.pubsub.subscribe('member-info', (message, data)=> {
        this.setState({member: data});
    });
    this.subscribe_selected_picks = this.pubsub.subscribe('selected-picks', (message, data)=> {
      this.setState({selectedPicks: data});
    });

    this.subscribe_cart_id = this.pubsub.subscribe('cart-id', (message, data)=> {
      console.log ("cardID set to ", data);
      this.setState({cartID: data});
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

    // M.I.
    this.subscribe_register = this.pubsub.subscribe('register', (message, data)=> {
  //    this.setState({isRegistering: true});
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
    this.pubsub.unsubscribe(this.subscribe_cart_id);
    this.pubsub.unsubscribe(this.subscribe_purchase_ccard);
    this.pubsub.unsubscribe(this.subscribe_purchase_tokens);
    this.pubsub.unsubscribe(this.subscribe_purchase);
    // M.I.
    this.pubsub.unsubscribe(this.subscribe_register);
    this.pubsub.unsubscribe(this.subscribe_test_mode);
    }

	loadPicks(self, firstLoad=false) {

	  let ecapper_id = '';

	  if (self.props.location) {
      const params = QueryString.parse(self.props.location.search);
      ecapper_id = params.ECAPPER_ID ? params.ECAPPER_ID : '';

    }
   // console.log("Picksmain loadPicks(): ecapper_id",  ecapper_id);

    PicksAPI.loadPicks(ecapper_id).done((picks) => {

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
          allPicks[pick.sport].push(pick);
        }
      });


      self.setState({allPicks: allPicks});

    });
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
        purchaseData.cartID = this.state.cartID;


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

/*
    if (! this.context) {
      console.log ("Picksmain No context ", this);
      return '';
    }
*/


    // Mobile rendering support via Context API
    //console.log ("Picksmain.. ", this);
    // return this.context.state.isMobile ? this.renderNormal(cart) :
    return this.renderNormal(cart)

  }


	renderNormal(cart) {
    return (

      <div className="container py-md-4 px-0 bg-white">
			  <span className="item active"></span>

          {/* {this.state.isTestMode ? " -- Purchases will be done in TEST mode -- ": ''} */}

        <div className="row m-0">
          <div className="col-md-8 col-12 p-0 order-2 order-md-1 right-panel">
          {(this.state.displayMode === MODES.normal) &&
                <PickList
                  pubsub={this.pubsub}
                  allPicks={this.state.allPicks}
                  memberSuspended={this.state.member.is_suspended && this.state.member.is_suspended.toUpperCase() === 'Y'}
                  memberLevelFlagged={Utils.checkFlaggedMemberLevel(this.state.member)}
                  selectedPicks={this.state.selectedPicks}
                  notificationManager={this.notificationManager}
                />
                }
                {(this.state.displayMode === MODES.checkout) && cart }
                {(this.state.displayMode === MODES.showPicks) &&
                <PurchasedPicks
                  purchasedPicks={this.state.purchasedPicks}
                  pubsub={this.pubsub}
                />
                }
          </div>

          <div className="col-md-4 col-12 p-0 order-1 order-md-2 sticky-top right-login">

          <div className={(this.state.displayMode === MODES.checkout) ? 'd-none' : 'd-block'}>
            {this.state.selectedPicks != '' && this.state.logged_in == true ?  <button className="mob_anchor btn btn-lg btn-dark d-block d-md-none float-right border-0 pl-cartbtn" onClick={this.toggleModal}>
            <i className="fa fa-shopping-cart"></i>
            </button> : <button className="mob_anchor btn btn-lg btn-dark d-block d-md-none float-right border-0 disabled">
            <i className="fa fa-shopping-cart"></i>
            </button> }
          </div>

            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className+' p-2'}>
              {this.state.displayMode === MODES.normal &&
                    <Login
                      freePick={this.featuredFreePick(this.state.freePicks)}
                      pubsub={this.pubsub}
                      showFreePlay={this.state.selectedPicks.length === 0}
                      notificationManager={this.notificationManager}
                  //    hideDisplay={this.state.isRegistering}
                    />
                }

                {(this.state.displayMode === MODES.normal) &&
                cart
                }
            </Modal>

             <div className="d-none d-md-block px-2 sticky-top">
             {this.state.displayMode === MODES.normal &&
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

              {(this.state.displayMode === MODES.normal) &&
              cart
              }
              <Event/>
              </div>


          </div>
          </div>


          <NotificationContainer/>
        </div>

    );

  }

}

