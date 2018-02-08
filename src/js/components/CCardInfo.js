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
                
                <!-- Start shopping_cart_main_purchase_ccard.html-->
                <table width="600" border="0" cellSpacing="0" cellPadding="0">
                    <tr>
                        <td colspan="2" align="center"><span className="verdana14"><b>Credit Card Information</b></span></td>
                    </tr>

                    <tr>
                        <td height="32" align="right"><span className="verdana14">Card Number:</span>&nbsp;</td>
                        <td><label for="CC_NUMBER"></label>
                            <input name="CC_NUMBER" type="text" id="CC_NUMBER"  value="" size="20" maxlength="16"  className="required" title="Enter credit card number" tabindex="5"/>&nbsp;<span id="CC_TYPE"></span></td>
                    </tr>
                    <tr>
                        <td height="40" colSpan="2" align="center">
                            <span className="verdana14">Exp. Date:&nbsp;Month</span>&nbsp;
                            <input name="CC_EXPIRE_MONTH" id="CC_EXPIRE_MONTH" type="text" value="" size="2" maxLength="2"  className="required" title="Enter expiration month" tabindex="6"/>&nbsp;&nbsp;
                                <span className="linkv14">Year</span>&nbsp;
                                <input name="CC_EXPIRE_YEAR" id="CC_EXPIRE_YEAR" type="text" value="" size="4" maxLength="4"  className="required" title="Enter credit expiration year" tabindex="7"/>&nbsp;&nbsp;
                                    <span className="verdana14">CVV2</span>&nbsp;
                                    <input name="CC_PIN" id="CC_PIN" type="text" value=" " size="4" maxLength="4"   className="required" title="Enter credit card Verification Number (CVV2)" tabindex="8"/>&nbsp;&nbsp;<a title="Credit Card Verification Numbers" href="JavaScript:openWinD('https://www.ipsports.net/ecps/pages/cvv2/cvv2_1.html',420,450)"><img src="images/mini_cvv2.gif" alt="Credit Card Verification Number"  border="0" align="absmiddle"/> </a>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" align="center"><table width="580" border="0" cellSpacing="0" cellPadding="0">
                            <tr>
                                <td><div title="Page 1">
                                    <div>
                                        <div>
                                            <p className="verdana14">Your Credit Card will be charged $
                                                <label for="CCARD_TOTAL"></label>
                                                <input name="CCARD_TOTAL" type="text" id="CCARD_TOTAL" value="{CCARD_TOTAL}" size="6" disabled/>
                                                    <br />
                                                        to complete this purchase.</p>
                                        </div>
                                    </div>
                                </div></td>
                                <td width="280" align="center">
                                    <input type="image" name="PURCHASE_SUBMITTED" id="PURCHASE_SUBMITTED" src="images/purchase-button.png"  width="200" height="45" alt="purchase" value="submit"  style="{PURCHASE_BUTTON_STYLE}"/>
                                </td>
                            </tr>
                        </table></td>
                    </tr>
                </table>

                {/*<script>
                    document.getElementById("PURCHASE_SUBMITTED").addEventListener("click", function(event){
                    if (! FIC_checkForm(document.forms['FORM_1'])) {
                    event.preventDefault();
                }
                });

                    // Displays edit customer info - shopping_cart_main_purchase_editmember.html
                    document.getElementById("EDIT_CUSTOMER_INFO").addEventListener("click", function(event){
                    document.getElementById("EDITMEMBER").style.display = "block";
                    event.preventDefault();

                });

                    document.getElementById("CC_NUMBER").addEventListener("keydown", function(event){
                    if (event.ctrlKey || event.shiftKey || event.keyCode === 8 || event.keyCode === 46) {
                    return true;
                }

                    function isNumeric(n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                }

                    if (! isNumeric(event.key)) {
                    //   console.log("NOT NUMERIC Key is ", event);
                    event.preventDefault();
                    return true;
                }
                    return true;
                });

                    document.getElementById("CC_NUMBER").addEventListener("keyup", function(event){

                    if (event.target.value.length === 0) {
                    return true;
                }
                    var first = event.target.value.substring(0, 1);

                    var type = '';
                    switch (first) {
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
                    //   console.log("KeyUP is ", event.key, event.target.value, type);
                    //  debugger;
                    document.getElementById("CC_TYPE").innerHTML = type;
                    return true;
                });

                </script>*/}
                <!-- End shopping_cart_main_purchase_ccard.html-->
            </div>

        );
    }
}




