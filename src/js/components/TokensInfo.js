/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PicksAPI from "../lib/PicksAPI";


export default class TokensInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isChargeAuthorized: false,
            realTokensApplied: 0,
            awardTokensApplied: 0,
            realTokensNeeded: 0,
        }
    }

    componentWillMount() {

    }
    componentDidMount() {


    }
    componentWillReceiveProps(nextProps) {
        console.log("**TokensInfo4 cartTotal",  nextProps.cartTotal);
        if (nextProps.cartTotal === 0 || nextProps.cartTotal === this.props.cartTotal) {
            return;
        }
        PicksAPI.tokensQuery(nextProps.member, nextProps.cartTotal).done((result) => {
            this.setState({
                realTokensApplied: result.real_tokens_applied,
                awardTokensApplied: result.award_tokens_applied,
                realTokensNeeded: result.real_tokens_needed
            })
        });
    }

    componentWillUnmount() {
    }


    render() {


//        console.log("TokensInfo isChargeAuthorized cartTotal", this.state.isChargeAuthorized, this.props.cartTotal);
        console.log("TokensInfo tokens summary: ", this.state.realTokensApplied, this.state.awardTokensApplied, this.state.realTokensNeeded);
 //       console.log("TokensInfo render() cartTotal ", this.props.cartTotal);
        const purchaseButtonStyle = this.state.isChargeAuthorized ?  {opacity: 1.0} : {opacity: 0.2};
        return (

            <div align="center">


                <table width="600">
                    <tbody>
                    <tr>
                        <td height="32" colSpan="2" align="center" bgcolor="#CCCCCC"><strong>Playbucks Information</strong></td>
                    </tr>

                    {/* [NO_CCARD_BEGIN] */}
                    <tr>
                        <td align="right">
                    <span className="verdana14">
                    <strong><font color="maroon">Click&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></strong>
                    </span>
                            <div className="confirmCheckbox">
                                <input type="checkbox" defaultValue={false} id="CONFIRM_PURCHASE"  name="CONFIRM_PURCHASE"
                                       onChange={(event)=>{
                                           this.setState({isChargeAuthorized: ! this.state.isChargeAuthorized});
                                       }}
                                />
                                <label for="CONFIRM_PURCHASE"></label>
                            </div>

                        </td>
                        <td align="center" className="verdana14">
                            <strong>I Authorize Playbook To Charge My Credit Card<br />
                                $[CCARD_TOTAL] in order To Complete This Purchase.<br />
                                My Playbucks Tokens Will Be Combined with<br />
                                this Credit Card Charge.
                            </strong>
                        </td>
                    </tr>
                    {/*        [NO_CCARD_END]  */}

                    <tr>
                        <td width="150" align="center"><img src="images/token_green.png" width="100"/></td>
                        <td align="center" className="verdana14">Your Current Token Balance $[REAL_TOKENS_AVAILABLE] <br />
                            <strong>
                                <font color="navy">Current Purchase Total $[PURCHASE_TOTAL]</font></strong></td>
                    </tr>


                    <tr>
                        <td colSpan="2" align="center">
            <span className="verdana14">Total Amount of Tokens deducted from your available balance for this sale:&nbsp;
                <input name="token_quantity" type="text" id="token_quantity" defaultValue="[REAL_TOKENS_APPLIED]" size="5" maxLength="5"  readOnly/>
            </span>

                            <br />
                            <input type="image" name="PURCHASE_SUBMITTED_TOKENS" id="PURCHASE_SUBMITTED_TOKENS" src="images/purchase-button.png"
                                   width="200" height="45" alt="update_cart"  style={purchaseButtonStyle} />
                        </td>
                    </tr>
                    {/*value="submit" */}

                    </tbody>
                </table>


            </div>

        );
    }
}


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
