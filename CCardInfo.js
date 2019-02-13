/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Utils from "../lib/Utils";
import PurchaseButton  from "../components/PurchaseButton";
import {GlobalContext} from "../lib/GlobalContext";


import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../components/CheckoutForm';

export default class CCardInfo extends React.Component {
  static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            //ccard: {},
            ccard: {
                number: '5444305280019650',
                expMonth: '02',
                expYear: '2021',
                cvv: '165'
            },

 //           cartTotal: this.props.cartTotal,
            cardType: '',
        }
    }
    componentWillMount() {

    }
    componentDidMount() {


    }
    componentWillUnmount() {
    }

    updateCcardInfo(property, value) {
        let ccard = this.state.ccard;
        ccard[property] = value;
        this.setState(ccard);
        this.props.pubsub.publish('ccard', ccard);
    }

    determineCardType(cardNumber) {
        //var first = cardNumber.substring(0, 1);
        if (cardNumber.length === 0) {
            return '';
        }
        let type = '';
        switch (cardNumber.substring(0, 1)) {
            case '2':
            case '5':
                type = 'Mastercard';
                break;
            case '3':
                type = 'American Express';
                break;
            case '4':
                type = 'VISA';
                break;
            case '6':
                type = 'Discover';
                break;
            default:
                type = 'Invalid card number';
                break;
        }

        return type;
    }

    cardInfoEntered() {
        const ccard = this.state.ccard;
        return ccard.number && ccard.expMonth && ccard.expYear && ccard.cvv;
    }

    render() {

      const purchaseButtonOpacity =  this.cardInfoEntered() ? 1.0 : 0.1;


      return (
        this.renderNormal(
          purchaseButtonOpacity)
              
      );



    }

    renderNormal(purchaseButtonOpacity) {
      return (
        <div className="m-auto w-75" align="left">
        <span className="trebuchet14 text-center col-12 p-0"><b>Credit Card Information</b></span>
        {/* <div className="form-group">
          <label htmlFor="CC_NUMBER">Card Number</label>
          <input name="CC_NUMBER" onKeyDown={event=>{
                    if (event.ctrlKey || event.shiftKey || event.keyCode === 8 || event.keyCode === 46) {
                      return true;
                    }

                    if (! Utils.isNumeric(event.key)) {
                        event.preventDefault();
                      }
                      return true;
                    }}
                    onChange={event=>{
                      this.updateCcardInfo('number', event.target.value);
                      this.setState({cardType: this.determineCardType(event.target.value)});
                    }}
                  type="text" id="CC_NUMBER"  size="20" maxLength="16"  className="required form-control form-control-lg" title="Enter credit card number" tabIndex="5" />
            <span id="CC_TYPE">{this.state.cardType}</span>
        </div>

        <div className="form-group">
            <label htmlFor="CC_EXPIRE_MONTH">Exp. Date:&nbsp;Month (MM)</label>
            <input name="CC_EXPIRE_MONTH" id="CC_EXPIRE_MONTH"
                  onChange={event=>{
                    this.updateCcardInfo('expMonth', event.target.value);
                  }}
                  type="text" defaultValue="" size="2" maxLength="2"  className="required form-control form-control-lg" title="Enter expiration month" tabIndex="6" />
        </div>
        
        <div className="form-group">
          <label htmlFor="CC_EXPIRE_YEAR">Year (YYYY)</label>
          <input name="CC_EXPIRE_YEAR" id="CC_EXPIRE_YEAR"
                  onChange={event=>{
                    this.updateCcardInfo('expYear', event.target.value);
                  }} type="text" defaultValue="" size="4" maxLength="4"  className="required form-control form-control-lg" title="Enter credit expiration year" tabIndex="7" />
        </div>
        
        <div className="form-group">
          <label htmlFor="CC_PIN">CVV2</label>
          <div className="row m-0">
                  <div className="col p-0">
                    <input name="CC_PIN" id="CC_PIN"
                    onChange={event=>{
                      this.updateCcardInfo('cvv', event.target.value);
                    }}
                    type="text" defaultValue={" "} size="5" maxLength="5"   className="required form-control form-control-lg" title="Enter credit card Verification Number (CVV2)" tabIndex="8" />
                  </div>
                  <div className="col-2">
                    <a title="Credit Card Verification Numbers" href="JavaScript:openWinD('https://www.ipsports.net/ecps/pages/cvv2/cvv2_1.html',420,450)"><img src="images/mini_cvv2.gif" alt="Credit Card Verification Number"  border="0" align="absmiddle"/> </a>
                  </div>
          </div>
        </div> */}

        <StripeProvider apiKey="pk_test_dlrdh6fDfEaU43nXsrPGL2fy">
            <div className="checkoutcc">
              <Elements><CheckoutForm /></Elements>
            </div>
          </StripeProvider>
        
        {/* <div className="row m-0">
          <div className="col text-center p-0">
            {! this.props.isTokens &&
              <PurchaseButton
                pubsub={this.props.pubsub}
                isTokens={false}
              />
            }
          </div>
        </div> */}

        <div className="row m-0">
          <div className="col p-0 my-2">
              <span className="trebuchet14">Your Credit Card will be charged $
              <label htmlFor="CCARD_TOTAL"></label>
              {this.props.chargeTotal} to complete this purchase.</span>
          </div>
        </div>

      </div>
  );
}

}
