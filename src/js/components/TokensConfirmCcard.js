/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Money  from "money-formatter";
import PurchaseButton  from "../components/PurchaseButton";
import Utils from "../lib/Utils";

export default class TokensConfirmCcard extends React.Component {

    constructor(props) {
        super(props);

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

            <div align="center">


                <table width="600">
                    <tbody>
                    <tr>
                        <td height="32" colSpan="2" style={{textAlign: 'center', backgroundColor: '#CCCCCC'}}><span className="trebuchet14B"><strong>Playbucks Information</strong></span></td>
                    </tr>

                    <tr>
                        <td align="right">

                    <span className="trebuchet14Bred">Click&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

                            <div className="confirmCheckbox">
                                <input type="checkbox" defaultValue={false} id="CONFIRM_PURCHASE"  name="CONFIRM_PURCHASE"
                                       onChange={(event)=>{
                                          // this.setState({isChargeAuthorized: ! this.state.isChargeAuthorized});
                                           this.props.pubsub.publish('toggle-charge-authorized');
                                       }}
                                />
                                <label for="CONFIRM_PURCHASE"></label>
                            </div>

                        </td>
                        <td align="center" className="verdana14">
                            <span className="trebuchet14B">I Authorize Playbook To Charge My Credit Card<br />
                                {Money.format ('USD', this.props.tokens.realTokensNeeded)} in order To Complete This Purchase.<br />
                                My Playbucks Tokens Will Be Combined with<br />
                                this Credit Card Charge.
                            </span>
                        </td>
                    </tr>

                    <tr>
                        <td width="150" align="center"><img src="images/token_green.png" width="100"/></td>
                        <td align="center"><span className="trebuchet14">Your Current Token Balance {Utils.getTokenBalance(this.props.tokens)} <br />
                            <strong>
                                <font color="navy">Current Purchase Total {Money.format ('USD', this.props.cartTotal)}</font></strong></span></td>
                    </tr>


                    <tr>
                        <td colSpan="2" align="center">
                    <span className="trebuchet14">Total Amount of Tokens deducted from your available balance for this sale:&nbsp;
                        <input name="token_quantity" type="text" id="token_quantity"
                               value={Money.format ('USD', Utils.getTokensApplied(this.props.tokens))}
                               size="5" maxLength="5"  readOnly
                        />
                    </span>

                    <br />
                    <PurchaseButton
                        pubsub={this.props.pubsub}
                        isTokens={true}
                        tokens={this.props.tokens}
                    />
                    </td>
                    </tr>

                    </tbody>
                </table>


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

