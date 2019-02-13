import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements/';
import 'babel-polyfill';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
    let {token} = await this.props.stripe.createToken({name: "sk_test_GdcpC6Ydn4CPQbLYchGwkPAe"});
    let response = await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });
    if (response.ok) this.setState({complete: true});

  }

  render() {
    if (this.state.complete) return <span className="alert alert-success">Purchase Complete</span>;
    return (
      <div className="checkout">
        <CardElement style={{base: {fontSize: '18px'}}} />
        <button onClick={this.submit} className="btn btn-lg pl-cartbtn">Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);