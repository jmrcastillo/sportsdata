/**
 * Created by me on 1/31/17.
 */

import React from "react";

export default class PurchaseButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isChargeAuthorized: this.props.isTokens ? false : true,
            ccard: {},
        }
    }

    componentWillMount() {

    }
    componentDidMount() {
        this.subscribe_charge_authorized = this.props.pubsub.subscribe('toggle-charge-authorized', (message, data)=> {
            this.setState({isChargeAuthorized: ! this.state.isChargeAuthorized});
        });
        this.subscribe_ccard = this.props.pubsub.subscribe('ccard', (message, data)=> {
            this.setState({ccard: data});
        });
    }
    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.props.pubsub.unsubscribe(this.subscribe_charge_authorized);
        this.props.pubsub.unsubscribe(this.subscribe_ccard);
    }

    cardInfoEntered() {
        const ccard = this.state.ccard;
        return ccard.number && ccard.expMonth && ccard.expYear && ccard.cvv;
    }

    render() {

//    console.log("TokensOnlyPurchase.. render()", this.props.cartTotal);
        let buttonEnabled = true;
        if (this.props.isTokens) {
            if (! this.state.isChargeAuthorized) {
                buttonEnabled = false;
            }
        } else if (! this.cardInfoEntered()) {
            buttonEnabled = false;
        }

        const purchaseButtonStyle = buttonEnabled ? {opacity: 1.0} : {opacity: 0.2}


        return (

            <input type="image" name="PURCHASE_SUBMITTED_TOKENS" id="PURCHASE_SUBMITTED_TOKENS"
                   src="images/purchase-button.png"
                   width="200" height="45" alt="update_cart"  style={purchaseButtonStyle} value="submit"
                   onClick={event=>{
                    event.preventDefault();
                    if (! buttonEnabled) {
                        return;
                    }

                    const purchase = {tokens: this.props.tokens,
                                    ccard: this.state.ccard};
                    console.log("PurchaseButton: purchase", purchase);
                    this.props.pubsub.publish('purchase', {isTokens: this.props.isTokens,
                                                        tokens: this.props.tokens,
                                                        ccard: this.state.ccard});

                   }}


            />

        );
    }
}

