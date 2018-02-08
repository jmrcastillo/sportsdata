/**
 * Created by me on 1/31/17.
 */

import React from "react";



export default class Login extends React.Component {

    constructor(props) {
        super(props);

    }
    componentWillMount() {

    }
    componentDidMount() {



    }
    componentWillUnmount() {
    }


    render() {

        const itemsTitle = this.state.picks.length === 0 ? "Add picks to cart to purchase" : "Items In My Cart";

  //      console.log("<Cart> # Picks ", this.state.picks.length);
        return (



            <div align="center">
                <!-- Start shopping_cart_main_purchase_tokens.html-->
                <table width="600">

                    <tr>
                        <td height="32" colspan="2" align="center" bgcolor="#CCCCCC"><strong>Playbucks Information</strong></td>
                    </tr>
                    <!-- No ccard needed, omit begin -->
                    {NO_CCARD_BEGIN}
                    <tr>
                        <td align="right"><span className="verdana14"><strong><font color="maroon">Click&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></strong></span>
                            <div className="confirmCheckbox">
                                <input type="checkbox" value="None" id="CONFIRM_PURCHASE"  name="CONFIRM_PURCHASE"  onChange="toggleAgreeCheckbox('CONFIRM_PURCHASE')" />
                                <label for="CONFIRM_PURCHASE"></label>
                            </div>

                        </td>
                        <td align="center" className="verdana14"><strong>I Authorize Playbook To Charge My Credit Card<br />
                            ${CCARD_TOTAL}  in order To Complete This Purchase.<br />
                            My Playbucks Tokens Will Be Combined with<br />
                            this Credit Card Charge. </strong></td>
                    </tr>
                    {NO_CCARD_END}
                    <!-- No ccard needed, omit end -->

                    <tr>
                        <td width="150" align="center"><img src="images/token_green.png" width="100"/></td>
                        <td align="center" className="verdana14">Your Current Token Balance ${REAL_TOKENS_AVAILABLE} <br />
                            <strong><font color="navy">Current Purchase Total ${PURCHASE_TOTAL}</font></strong></td>
                    </tr>
                    <tr>
                        <td colSpan="2" align="center">
                <span className="verdana14">Total Amount of Tokens deducted from your available balance for this sale:&nbsp;
                    <input name="token_quantity" type="text" id="token_quantity" value="{REAL_TOKENS_APPLIED}" size="5" maxLength="5"  readonly/>
                </span>
                            <input type="hidden" name="IS_TOKENS_PURCHASE"  id="IS_TOKENS_PURCHASE" value="YES"/>
                            <br />
                                <input type="image" name="PURCHASE_SUBMITTED_TOKENS" id="PURCHASE_SUBMITTED_TOKENS" src="images/purchase-button.png"  width="200" height="45" alt="update_cart" value="submit"  style="opacity: 0.2;" disabled/>
                        </td>
                    </tr>
                </table>

                {/*<script>


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



                </script>*/}
                <!-- End shopping_cart_main_purchase_tokens.html-->
            </div>

        );
    }
}




