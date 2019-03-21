/**
 * Created by me on 1/31/17.
 */

import React from "react";

export default class PurchaseButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isChargeAuthorized: this.props.isTokens ? false : true,
      ccard: {},
    }
  }

  componentWillMount() {

  }
  componentDidMount() {
    this.subscribe_charge_authorized = this.props.pubsub.subscribe('toggle-charge-authorized', (message, data)=> {
      this.setState({isChargeAuthorized: ! this.state.isChargeAuthorized});
    });
    this.subscribe_ccard = this.props.pubsub.subscribe('ccard', (message, data)=> {
      this.setState({ccard: data});
    });

    console.log(this.subscribe_charge_authorized);
  }
  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe(this.subscribe_charge_authorized);
    this.props.pubsub.unsubscribe(this.subscribe_ccard);
  }

  cardInfoEntered() {
    const ccard = this.state.ccard;
    return ccard.number && ccard.expMonth && ccard.expYear && ccard.cvv;
  }

  render() {

//    console.log("TokensOnlyPurchase.. render()", this.props.cartTotal);
    let buttonEnabled = true;
    // if (this.props.isTokens) {
    //     if (! this.state.isChargeAuthorized) {
    //         buttonEnabled = false;
    //     }
    // } else
    if (! this.cardInfoEntered()) {
      buttonEnabled = false;
    }

    const purchaseButtonStyle = buttonEnabled ? {opacity: 1.0} : {opacity: 0.2}


    return (
      <button className="btn btn-lg pl-cartbtn my-2" id="PURCHASE_SUBMITTED_TOKENS" name="PURCHASE_SUBMITTED_TOKENS" alt="update_cart"  style={purchaseButtonStyle}
              onClick={event=>{
                event.preventDefault();
                if (! buttonEnabled) {
                  return;
                }

                const purchase = {tokens: this.props.tokens,
                  ccard: this.state.ccard};
                console.log("PurchaseButton: purchase", purchase);
                this.props.pubsub.publish('purchase', {isTokens: this.props.isTokens,
                  tokens: this.props.tokens,
                  ccard: this.state.ccard}); }}>Purchase</button>
    );
  }
}
