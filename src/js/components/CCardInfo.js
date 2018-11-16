/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Utils from "../lib/Utils";
import PurchaseButton  from "../components/PurchaseButton";
import {GlobalContext} from "../lib/GlobalContext";



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


      // Mobile rendering support via Context API
      return (
            this.context.state.isMobile ?
              this.renderMobile(
                purchaseButtonOpacity) :
              this.renderNormal(
                purchaseButtonOpacity)
      );



    }

    renderNormal(purchaseButtonOpacity) {


      return (

        <div align="center">

          <table width="96%" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
            <tr>
              <td colSpan="2" height="32" style={{textAlign: 'center', backgroundcolor: '#CCCCCC'}}><span className="trebuchet14"><b>Credit Card Information</b></span></td>
            </tr>

            <tr>
              <td height="32" style={{textAlign: 'right', backgroundcolor: 'White'}}><span className="trebuchet14">Card Number:</span>&nbsp;</td>
              <td style={{textAlign: 'left', backgroundcolor: 'White'}}><label for="CC_NUMBER"></label>
                <input name="CC_NUMBER"
                       onKeyDown={event=>{
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

                       type="text" id="CC_NUMBER"  size="20" maxLength="16"  className="required" title="Enter credit card number" tabIndex="5"
                />&nbsp;
                <span id="CC_TYPE">{this.state.cardType}</span>
              </td>
            </tr>
            <tr>
              <td height="40" colSpan="2" align="center">
                <span className="trebuchet14">Exp. Date:&nbsp;Month (MM)</span>&nbsp;
                <input name="CC_EXPIRE_MONTH" id="CC_EXPIRE_MONTH"
                       onChange={event=>{
                         this.updateCcardInfo('expMonth', event.target.value);
                       }}
                       type="text" defaultValue="" size="2" maxLength="2"  className="required" title="Enter expiration month" tabIndex="6"
                />&nbsp;&nbsp;
                <span className="trebuchet14">Year (YYYY)</span>&nbsp;
                <input name="CC_EXPIRE_YEAR" id="CC_EXPIRE_YEAR"
                       onChange={event=>{
                         this.updateCcardInfo('expYear', event.target.value);
                       }}
                       type="text" defaultValue="" size="4" maxLength="4"  className="required" title="Enter credit expiration year" tabIndex="7"
                />&nbsp;&nbsp;
                <span className="trebuchet14">CVV2</span>&nbsp;
                <input name="CC_PIN" id="CC_PIN"
                       onChange={event=>{
                         this.updateCcardInfo('cvv', event.target.value);
                       }}
                       type="text" defaultValue={" "} size="5" maxLength="5"   className="required" title="Enter credit card Verification Number (CVV2)" tabIndex="8"
                />&nbsp;&nbsp;
                <a title="Credit Card Verification Numbers" href="JavaScript:openWinD('https://www.ipsports.net/ecps/pages/cvv2/cvv2_1.html',420,450)"><img src="images/mini_cvv2.gif" alt="Credit Card Verification Number"  border="0" align="absmiddle"/> </a>
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                <table width="580" border="0" cellSpacing="0" cellPadding="0">
                  <tbody>
                  <tr>
                    <td><div title="Page 1">
                      <div>
                        <div>
                                            <span className="trebuchet14">Your Credit Card will be charged $
                                                <label for="CCARD_TOTAL"></label>
                                              {/*
                                                <input name="CCARD_TOTAL" type="text" id="CCARD_TOTAL" defaultValue={total} size="6" disabled/>
*/}
                                              {this.props.chargeTotal}
                                              <br />
                                                to complete this purchase.</span>
                        </div>
                      </div>
                    </div></td>
                    <td width="280" align="center">
                      {/*                              {! this.props.isTokens &&
                                    <input type="image" name="PURCHASE_SUBMITTED" id="PURCHASE_SUBMITTED"
                                           src="images/purchase-button.png"  width="200" height="45" alt="purchase" value="submit"
                                           style={{opacity: purchaseButtonOpacity}}
                                           onClick={event=>{
                                               if (! this.cardInfoEntered()) {
                                                   event.preventDefault();
                                                   return true;
                                               }
                                               //    console.log("Purchase taking place..");
                                               this.props.pubsub.publish('purchase-ccard', this.state.ccard);

                                           }}
                                    />
                                }*/}

                      {! this.props.isTokens &&
                      <PurchaseButton
                        pubsub={this.props.pubsub}
                        isTokens={false}
                      />

                      }

                    </td>
                  </tr>
                  </tbody>
                </table></td>
            </tr>
            </tbody>
          </table>

        </div>



      );
    }


  renderMobile(purchaseButtonOpacity) {


    return (

      <div align="center">

        <table width="96%" border="0" cellSpacing="0" cellPadding="0">
          <tbody>
          <tr>
            <td colSpan="2" height="32" style={{textAlign: 'center', backgroundcolor: '#CCCCCC'}}><span className="trebuchet14"><b>Credit Card Information</b></span></td>
          </tr>

          <tr>
            <td height="32" style={{textAlign: 'right', backgroundcolor: 'White'}}><span className="trebuchet14">Card Number:</span>&nbsp;</td>
            <td style={{textAlign: 'left', backgroundcolor: 'White'}}><label for="CC_NUMBER"></label>
              <input name="CC_NUMBER"
                     onKeyDown={event=>{
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

                     type="text" id="CC_NUMBER"  size="20" maxLength="16"  className="required" title="Enter credit card number" tabIndex="5"
              />&nbsp;
              <span id="CC_TYPE">{this.state.cardType}</span>
            </td>
          </tr>
          <tr>
            <td height="40" colSpan="2" align="center">
              <span className="trebuchet14">Exp. Date:&nbsp;Month (MM)</span>&nbsp;
              <input name="CC_EXPIRE_MONTH" id="CC_EXPIRE_MONTH"
                     onChange={event=>{
                       this.updateCcardInfo('expMonth', event.target.value);
                     }}
                     type="text" defaultValue="" size="2" maxLength="2"  className="required" title="Enter expiration month" tabIndex="6"
              />&nbsp;&nbsp;<br />
              <span className="trebuchet14">Year (YYYY)</span>&nbsp;
              <input name="CC_EXPIRE_YEAR" id="CC_EXPIRE_YEAR"
                     onChange={event=>{
                       this.updateCcardInfo('expYear', event.target.value);
                     }}
                     type="text" defaultValue="" size="4" maxLength="4"  className="required" title="Enter credit expiration year" tabIndex="7"
              />&nbsp;&nbsp;<br /><br />
              <span className="trebuchet14">CVV2</span>&nbsp;
              <input name="CC_PIN" id="CC_PIN"
                     onChange={event=>{
                       this.updateCcardInfo('cvv', event.target.value);
                     }}
                     type="text" defaultValue={" "} size="5" maxLength="5"   className="required" title="Enter credit card Verification Number (CVV2)" tabIndex="8"
              />&nbsp;&nbsp;
              <a title="Credit Card Verification Numbers" href="JavaScript:openWinD('https://www.ipsports.net/ecps/pages/cvv2/cvv2_1.html',420,450)"><img src="images/mini_cvv2.gif" alt="Credit Card Verification Number"  border="0" align="absmiddle"/> </a>
            </td>
          </tr>
          <tr>
            <td colSpan="2" align="center">
              <table width="580" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                <tr>
                  <td align="right"><div title="Page 1">
                    <div>
                      <div>
                                            <span className="trebuchet14">Your Credit Card will be charged $
                                                <label for="CCARD_TOTAL"></label>
                                              {/*
                                                <input name="CCARD_TOTAL" type="text" id="CCARD_TOTAL" defaultValue={total} size="6" disabled/>
*/}
                                              {this.props.chargeTotal}
                                              <br />
                                                to complete this purchase.</span><br />
                          {! this.props.isTokens &&
                          <PurchaseButton
                              pubsub={this.props.pubsub}
                              isTokens={false}
                          />

                          }
                      </div>
                    </div>
                  </div></td>
                  <td width="280" align="center">
                    {/*                              {! this.props.isTokens &&
                                    <input type="image" name="PURCHASE_SUBMITTED" id="PURCHASE_SUBMITTED"
                                           src="images/purchase-button.png"  width="200" height="45" alt="purchase" value="submit"
                                           style={{opacity: purchaseButtonOpacity}}
                                           onClick={event=>{
                                               if (! this.cardInfoEntered()) {
                                                   event.preventDefault();
                                                   return true;
                                               }
                                               //    console.log("Purchase taking place..");
                                               this.props.pubsub.publish('purchase-ccard', this.state.ccard);

                                           }}
                                    />
                                }*/}



                  </td>
                </tr>
                </tbody>
              </table></td>
          </tr>
          </tbody>
        </table>

      </div>



    );
  }


}
