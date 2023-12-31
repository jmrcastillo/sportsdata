/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Utils from "../lib/Utils";
import PurchaseButton  from "../components/PurchaseButton";
import {GlobalContext} from "../lib/GlobalContext";
import CryptoJS from "crypto-js";

import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../components/CheckoutForm';

export default class CCardInfo extends React.Component {
  static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            ccard: {
/*                number: '5444305280019650',
                expMonth: '02',
                expYear: '2021',
                cvv: '165'*/
              number: '',
              expMonth: '',
              expYear: '',
              cvv: ''
            },

          cardType: '',
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
      // this.CC_NUMBER.focus();
    }
    componentWillUnmount() {
    }

    updateCcardInfo(property, value) {
        let ccard = this.state.ccard;
        ccard[property] = value;
        this.setState(ccard);
        this.props.pubsub.publish('ccard', ccard);

        if(ccard.expMonth.length == 2){
          this.CC_EXPIRE_YEAR.focus();
        }

        if(ccard.expYear.length == 2){
          this.CC_PIN.focus();
        }
        console.log(ccard);
    }

    numberWithSpaces(x, format) {
      let ccnum = x.trim();
      ccnum = x.split('');
      let arr = new Set([4,9,14]);

      if(format == 'amex'){
        arr = new Set([4,11,17]);
      }

      if(arr.has(ccnum.length)){
        arr.forEach(element => {
          if(element == ccnum.length){
            ccnum.splice(element,0,' ');
          }
        });
      }

      ccnum = ccnum.join("");
      return ccnum;
    }

  determineCardType(cardNumber) {
    //var first = cardNumber.substring(0, 1);
    let type = '';
    let ccard = this.state.ccard;

    if (cardNumber.length === 0) {
      ccard['number'] = '';
      return '';
    } else if(cardNumber.length == 19){
      this.CC_EXPIRE_MONTH.focus();
    }

    ccard['number'] = this.numberWithSpaces(cardNumber, 'others');
    switch (cardNumber.substring(0, 1)) {
      case '2':
      case '5':
        type = 'Mastercard';
        break;
      case '3':
        ccard['number'] = this.numberWithSpaces(cardNumber, 'amex');
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

    ccard['invoice_reference'] = Buffer.from(CryptoJS.AES.encrypt(ccard['number'], 'devotedtoartofsportshandicapping').toString(), 'binary').toString('base64');

    this.setState(ccard);
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
      <div className="pb-ccform-wrapper" align="left">
        <div className="form-row">
          <span className="text-left col-12 p-0"><h2>Credit Card Information</h2></span>
        </div>
        <div className="form-row pb-ccform">
          <div className="col-12 col-md-7 cc-num-container">
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
                     this.setState({cardType: this.determineCardType(event.target.value)});
                   }} value={this.state.ccard.number}
                   type="text" id="CC_NUMBER"  size="19" maxLength="19"  className="required form-control" title="Enter credit card number" placeholder="Card Number" ref={(input) => { this.CC_NUMBER = input; }}  />
            <span className="text-warning py-2" id="CC_TYPE">{this.state.cardType}</span>
          </div>
          <div className="col">
            <input name="CC_EXPIRE_MONTH" id="CC_EXPIRE_MONTH"
                   onChange={event=>{
                     this.updateCcardInfo('expMonth', event.target.value);
                   }}
                   type="text" defaultValue="" size="2" maxLength="2" className="required form-control px-0" title="Enter expiration month" placeholder="(MM)" ref={(input) => { this.CC_EXPIRE_MONTH = input; }} />
          </div>
          <div className="col">
            <input name="CC_EXPIRE_YEAR" id="CC_EXPIRE_YEAR"
                   onChange={event=>{
                     this.updateCcardInfo('expYear', event.target.value);
                   }} type="text" defaultValue="" size="2" maxLength="2"  className="required form-control px-0" title="Enter credit expiration year" placeholder="(YY)" ref={(input) => { this.CC_EXPIRE_YEAR = input; }} />
          </div>
          <div className="col">
            <input name="CC_PIN" id="CC_PIN" onKeyDown={event=>{
                    if (event.ctrlKey || event.shiftKey || event.keyCode === 8 || event.keyCode === 46) {
                      return true;
                    }

                    if (! Utils.isNumeric(event.key)) {
                      event.preventDefault();
                    }
                    return true;
                  }}
                   onChange={event=>{
                     this.updateCcardInfo('cvv', event.target.value);
                   }}
                   type="text" defaultValue="" size="5" maxLength="5"   className="required form-control px-0" title="Enter credit card Verification Number (CVV2)" placeholder="CVV2" ref={(input) => { this.CC_PIN = input; }} />
          </div>
          <div className="col my-1">
            <a title="Credit Card Verification Numbers" href="JavaScript:openWinD('https://www.ipsports.net/ecps/pages/cvv2/cvv2_1.html',420,450)"><img src="images/mini_cvv2.gif" alt="Credit Card Verification Number"  border="0" align="absmiddle"/> </a>
          </div>
        </div>

        {/* <StripeProvider apiKey="pk_test_dlrdh6fDfEaU43nXsrPGL2fy">
            <div className="checkoutcc">
              <Elements><CheckoutForm /></Elements>
            </div>
          </StripeProvider> */}

        {! this.props.isTokens &&
        <PurchaseButton
          pubsub={this.props.pubsub}
          isTokens={false}
        />
        }

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