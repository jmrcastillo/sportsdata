/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Money  from "money-formatter";
import PurchaseButton  from "../components/PurchaseButton";
import Utils from "../lib/Utils";
import CCardInfo from "../components/CCardInfo";

export default class TokensConfirmCcard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    };
    this.toggleBox = this.toggleBox.bind(this);
  }

  toggleBox() {
    this.setState(oldState => ({ isOpened: !oldState.isOpened }));
  }

  componentWillMount() {

  }
  componentDidMount() {


  }
  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
  }


  render() {


    //console.log("TokensInfo isChargeAuthorized cartTotal", this.state.isChargeAuthorized);

    return (
      <div className="col-12">
        <div className="row m-0">
          <h2 className="col-12 my-4">Playbucks Information</h2>
        </div>

        <div className="row mx-0 my-2">
          <span className="col-8">Your Current Token Balance</span>
          <span className="col-4 font-weight-bold text-right">{Utils.getTokenBalance(this.props.tokens)}</span>
        </div>
        <div className="row mx-0 my-2">
          <span className="col-8">Current Purchase Total</span>
          <span className="col-4 font-weight-bold text-right">{Money.format ('USD', this.props.cartTotal)}</span>
        </div>
        <div className="row mx-0 my-2">
          <span className="col-8">Total Amount of Tokens deducted from your available balance for this sale:</span>
          <span className="col-4 font-weight-bold text-right">{Money.format ('USD', Utils.getTokensApplied(this.props.tokens))}</span>
        </div>

        <input name="token_quantity" type="hidden" id="token_quantity" value={Money.format ('USD', Utils.getTokensApplied(this.props.tokens))} size="5" maxLength="5" />

        <div className="row mx-0 my-4 bg-warning py-2">
          <p className="col-10 text-justify m-0"><b>I Authorize Playbook to charge my Credit Card</b>&nbsp;
            <b>{Money.format ('USD', this.props.tokens.realTokensNeeded)}</b> in order to complete this purchase.
            My Playbucks Tokens Will Be Combined with
            this Credit Card Charge.
          </p>

          <div className="col-2">
            <div className="squaredTwo" data-toggle="tooltip" title="Click to proceed on credit card payment">
              <input type="checkbox" className="confirmCCbtn" defaultValue={false} id="CONFIRM_PURCHASE"  name="CONFIRM_PURCHASE"
                     onChange={this.toggleBox}
                // onChange={(event)=>{
                //     // this.setState({isChargeAuthorized: ! this.state.isChargeAuthorized});
                //     // this.props.pubsub.publish('toggle-charge-authorized');
                // }}
              />
              <label htmlFor="CONFIRM_PURCHASE"></label>
            </div>
          </div>
        </div>

        {this.state.isOpened && <CCardInfo
          chargeTotal={this.props.tokens.realTokensNeeded}
          isTokens={true}
          pubsub={this.props.pubsub}
        />}

        {this.state.isOpened && <PurchaseButton
          pubsub={this.props.pubsub}
          isTokens={true}
          tokens={this.props.tokens}
        />}

      </div>

    );
  }
}
/*
{Money.format ('USD', parseInt(this.props.tokens.awardTokens) + parseInt(this.props.tokens.realTokens))}
*/

/*<script>


                    document.addEventListener("DOMContentLoaded", function(event) {
                    //    alert("DOM loaded")
                    var enabled = {TOKENS_PURCHASE_ENABLED};
                    setTokensPurchaseUIEnabled(enabled);
                });


                    function setTokensPurchaseUIEnabled(enabled) {
                    var ids = ['CC_NUMBER', 'CC_EXPIRE_MONTH', 'CC_EXPIRE_YEAR', 'CC_PIN'];
                    var elements = [];
                    ids.forEach(function(id) {
                    var element = document.getElementById(id);
                    if (element !== null) {
                    elements.push(element);
                }
                })
                    var purchaseButton = document.getElementById("PURCHASE_SUBMITTED_TOKENS");

                    if (enabled) {
                    elements.forEach(function(item, index, arr) {
                    item.style.opacity = 1;
                    item.disabled = false;
                })
                    purchaseButton.style.opacity = 1;
                    purchaseButton.disabled = false;

                }  else {
                    elements.forEach(function (item, index, arr) {
                    item.style.opacity = .2;
                    item.disabled = true;
                })
                    purchaseButton.style.opacity = .2;
                    purchaseButton.disabled = true;
                }
                }

                    function toggleAgreeCheckbox(id) {
                    setTokensPurchaseUIEnabled(document.getElementById(id).checked);
                }

                    // Validation for Tokens fragment Purchase red button
                    document.getElementById("PURCHASE_SUBMITTED_TOKENS").addEventListener("click", function(event){
                    //  alert ('FORM test ' + document.forms['FORM_1'].elements['SHIPPING_FIRST_NAME'].className);
                    if (! FIC_checkForm(document.forms['FORM_1'])) {
                    event.preventDefault();
                }
                });



                </script>*/
