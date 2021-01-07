import React, {Component} from 'react';
import $ from "jquery";
import {CardElement,CardNumberElement, CardCVCElement, injectStripe} from 'react-stripe-elements/';
import 'babel-polyfill';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(purchaseData) {
    // User clicked submit
    console.log(cardnum.val());

    return $.post("https://www.playbooksports.com/picks-api1/purchase-ccard",
      purchaseData,
    ).then(function(res) {
      return res;
    }).fail(()=>console.log('PURCHASECCARD FAIL.'));

 
  }

  render() {
    if (this.state.complete) return <span className="alert alert-success">Purchase Complete</span>;
    return (
      <div className="checkout">
        <label>
          Card Number <Label></Label>
          <CardNumberElement id="cardnum" />
        </label>
        <label for='cvc'>CVC Label</label>
        <CardCVCElement id='cvc' />
        <button onClick={this.submit} className="btn btn-lg pl-cartbtn">Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);