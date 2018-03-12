/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PicksAPI from "../lib/PicksAPI";
import CCardInfo from "../components/CCardInfo";
import TokensConfirmCcard from "../components/TokensConfirmCcard";
import TokensOnlyPurchase from "../components/TokensOnlyPurchase";

export default class TokensInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isChargeAuthorized: false,
            tokens: {realTokensApplied: 0,
                awardTokensApplied: 0,
                realTokensNeeded: 0
            },
        }
    }

    componentWillMount() {

    }
    componentDidMount() {


    }
    componentWillReceiveProps(nextProps) {
  //      console.log("**TokensInfo4 cartTotal",  nextProps.cartTotal);
        if (nextProps.cartTotal === 0 || nextProps.cartTotal === this.props.cartTotal) {
            return;
        }
        PicksAPI.tokensQuery(nextProps.member, nextProps.cartTotal).done((result) => {
            const tokens = {
                realTokensApplied: result.real_tokens_applied,
                awardTokensApplied: result.award_tokens_applied,
                realTokensNeeded: result.real_tokens_needed,
                realTokens: result.real_tokens,
                awardTokens: result.award_tokens,
            };
            this.setState({tokens});
        });
    }

    componentWillUnmount() {
    }


    render() {


//        console.log("TokensInfo isChargeAuthorized cartTotal", this.state.isChargeAuthorized, this.props.cartTotal);
 //       console.log("TokensInfo tokens summary: ", this.state.realTokensApplied, this.state.awardTokensApplied, this.state.realTokensNeeded);
 //       console.log("TokensInfo render() cartTotal ", this.props.cartTotal);
 //  console.log("TokensInfo realTokensNeeded ", this.state.realTokensNeeded);

        return (

            <div align="center">
            {this.state.tokens.realTokensNeeded > 0 &&
                <CCardInfo
                    chargeTotal={this.state.tokens.realTokensNeeded}
                    isTokens={true}
                    pubsub={this.props.pubsub}
                />
            }
            {this.state.tokens.realTokensNeeded > 0 &&
                <TokensConfirmCcard
                    cartTotal={this.props.cartTotal}
                    pubsub={this.props.pubsub}
                    member={this.props.member}
                    tokens={this.state.tokens}
                />
            }
            {/*Have to use == instead of === for TokensOnlyPurchase to display correctly */}
            {this.state.tokens.realTokensNeeded == 0  &&
                <TokensOnlyPurchase
                    cartTotal={this.props.cartTotal}
                    pubsub={this.props.pubsub}
                    member={this.props.member}
                    tokens={this.state.tokens}
                />
            }

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

