/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Money from "money-formatter";
import Utils from "../lib/Utils";
import PicksAPI from "../lib/PicksAPI";
import CheckoutButton from "../components/CheckoutButton";
import CCardInfo from "../components/CCardInfo";
import TokensInfo from "../components/TokensInfo";
import {GlobalContext} from "../lib/GlobalContext";
// import {CardElement, injectStripe} from 'react-stripe-elements';
// import 'babel-polyfill';


export default class Cart extends React.Component {

  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      picks: [],
      cartTotal: 0,
      logged_in: this.props.loggedIn,
    }

    // this.submit = this.submit.bind(this);

    // Try re-load cart from cookies
    const cookie =  Utils.getCookie("pb-cart");
    //   console.log('cookie: '+cookie);

    if (typeof (cookie) != 'undefined') {
      const picks = cookie.split(',').map(pick=>{
        const elements = pick.split('|');
        return {pick_id: elements[0], isPAW: elements[1]}
      });

      const pickList = picks.reduce((prev, curr)=>{
        return prev + curr.pick_id + ',';
      },'').slice(0, -1);

      (pickList.length > 0) && PicksAPI.loadPicksList(pickList).done(loadedPicks => {
        const picksWithType = loadedPicks.map((pick, index) => {
            pick.isPAW = (picks[index].isPAW === 'true');
            return pick;
          }
        );

        this.setState({
          picks: picksWithType,
          cartTotal: this.cartTotal(picksWithType),
        });

        // To notify parent of selected picks on initial load
        this.props.pubsub.publish('selected-picks',  Utils.stringifyPicks(picksWithType));
      });

    }
  }

  componentWillMount() {

  }
  componentDidMount() {
    this.subscribe_add_pick = this.props.pubsub.subscribe('add-pick', (message, data)=> {

      // cartID support
      if (this.state.picks.length === 0 ) {
        this.props.pubsub.publish('cart-id', Utils.fakeGuid());
      }

      const findIndex = this.state.picks.findIndex((pick)=>{
        return pick.pick_id === data.pick.pick_id;
      });

      let picks = [];
      if (findIndex === -1) {
        picks = this.state.picks.concat([data.pick]);
      } else {
        if (this.state.picks[findIndex].isPAW === data.pick.isPAW) {
          alert ("Already added  " + data.pick.title + ' ' + (data.pick.isPAW ? "Pay after Win" : "Guaranteed Prepaid"));
        } else {
          picks = this.state.picks;
          picks.splice (findIndex, 1);
          picks.splice (findIndex, 0, data.pick);
        }
      }
      if (picks.length > 0) {

        this.setState({
          picks: picks,
          cartTotal: this.cartTotal(picks),
        });
        this.savePicksAsCookie(picks);
      }

    });

    this.subscribe_logged_in = this.props.pubsub.subscribe('logged-in', (message, data)=> {
      this.setState({logged_in: true});
    });

    this.subscribe_empty_cart = this.props.pubsub.subscribe('empty-cart', (message, data)=> {
      this.setState({
        picks: []
      });
      this.savePicksAsCookie([]);
    });

    // For all checkout, scroll to top
    if (this.props.isZoomed) {
      window.scrollTo(0, 0);

    }
  }

  componentWillUnmount() {
    this.savePicksAsCookie(this.state.picks);
    this.props.pubsub.unsubscribe(this.subscribe_add_pick);
    this.props.pubsub.unsubscribe(this.subscribe_logged_in);
    this.props.pubsub.unsubscribe(this.subscribe_logged_out);
    this.props.pubsub.unsubscribe(this.subscribe_empty_cart);
  }

  savePicksAsCookie(picks) {
    const cookiePicks = Utils.stringifyPicks(picks);
    Utils.saveCookie("pb-cart", cookiePicks);
    //    console.log ("Picks saver (#picks, cart id) ", this.state.picks.length, this.state.cartID);
    this.props.pubsub.publish('selected-picks', cookiePicks);
  }

  cartTotal(picks) {
    return picks.reduce((accumulator, pick)=>{
      return accumulator + parseInt(pick.isPAW  ? pick.price : Utils.applyPrepaidDiscount(pick.price));
    }, 0);
  }


  render() {
  //  console.log ("Cart rendering");

    const itemsTitle = this.state.picks.length === 0 ? "Add picks to cart to purchase" : "Items In My Cart";

    const width10 = this.props.isZoomed ? 610 : 310;
    const width20 = this.props.isZoomed ? 620 : 320;

    const cartStyle = {
      // position: 'fixed',
      // top: '20%',
      opacity: '.8',
      visibility: this.state.picks.length > 0  ? 'visible' : 'hidden'
    }
    const cartStyleCheckout = {
      opacity: '.8',

    }

    if (! this.state.logged_in) {
      return null;
    }

    // Mobile rendering support via Context API
    return (
      this.renderNormal(
        itemsTitle,
        width10,
        width20,
        cartStyle,
        cartStyleCheckout
      )
    );
  }



  renderNormal(itemsTitle,
               width10,
               width20,
               cartStyle,
               cartStyleCheckout) {
    return (
      <div className="row m-0 sticky-top">
        <div className="col-12 p-0"><span className="pl-cartlbl">My Cart</span></div>

        {/*<!--Start Cart Box-->*/}
        <div className="table-wrapper-scroll-y mb-4 w-100">
          <table className="table pl-carttbl">
            <tbody>
            {/* <tr>
            <td><span className="trebuchet14B">{itemsTitle}</span></td>
          </tr> */}
            {this.state.picks.map((pick, i) => {
              const price = pick.isPAW ? Money.format ('USD', pick.price) : Money.format ('USD', Utils.applyPrepaidDiscount(pick.price));
              //                             console.log ("Cart ", pick, price);
              return (
                <tr key={i}>
                  <td>
                  <span className="" onClick={(event)=>{
                    console.log("Deleting pick", i, "from cart");
                    let picks = this.state.picks;
                    picks.splice(i, 1);
                    this.setState({
                      picks: picks,
                      cartTotal: this.cartTotal(picks)
                    })

                    this.savePicksAsCookie(picks);
                  }}>
                  <i className="fa fa-trash"></i>
                  </span>
                  </td>
                  <td>
                    <span className="trebuchet12B">{pick.title}</span>
                  </td>
                  <td>
                    <span className="trebuchet14B">{price}</span>
                  </td>
                  {this.props.isZoomed &&
                  <td>
                    <span className="trebuchet14B">Type:<br />{pick.isPAW ? 'G' : 'PP'}</span>
                  </td>
                  }
                </tr>
              )})}
            </tbody>
          </table>
        </div>
        {this.props.isZoomed &&
        <div className="row m-0">
          <button onClick={event=> {
            this.props.pubsub.publish('mode-normal');
          }} className="btn btn-lg pl-cartbtn m-2"><i className="fa fa-angle-left"></i>Continue Shopping</button>

          {! this.props.isTokens &&
          <CCardInfo
            chargeTotal={this.state.cartTotal}
            pubsub={this.props.pubsub}
          />
          }
          {this.props.isTokens &&
          <TokensInfo
            cartTotal={this.state.cartTotal}
            pubsub={this.props.pubsub}
            member={this.props.member}
          />
          }

        </div>
        }
        {! this.props.isZoomed &&
        <div className="row m-0">
          <CheckoutButton
            type="CC"
            pubsub={this.props.pubsub}
            enabled={this.state.picks.length > 0}
          />
          <CheckoutButton
            type="TOKENS"
            pubsub={this.props.pubsub}
            enabled={this.state.picks.length > 0}
          />

          <div className="col-12 text-right p-0 my-2">
            Your tokens <strong> {Utils.getMemberTokenBalance(this.props.member)}</strong>
          </div>
        </div>
        }
        {/*<!--end cartn box-->*/}
      </div>


    )

  }
}


//--- -------------------------------
// export default injectStripe(Cart);

// async submit(ev) {
//     let {token} = await this.props.stripe.createToken({name: "Name"});
//     let response = await fetch("/charge", {
//     method: "POST",
//     headers: {"Content-Type": "text/plain"},
//     body: token.id
// });

//   if (response.ok) console.log("Purchase Complete!")
// }
