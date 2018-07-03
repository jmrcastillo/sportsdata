/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Money from "money-formatter";
import Utils from "../lib/Utils";

export default class TokensOnlyPurchase extends React.Component {

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

//    console.log("TokensOnlyPurchase.. render()", this.props.cartTotal);

        return (

            <div style={{textAlign: 'center' }}>


            <table style={{textAlign: 'center' }}>
            <tbody>

            <tr>
                <td height="32" colSpan="2" style={{textAlign: 'center', backgroundColor: '#CCCCCC'}}><span className="trebuchet16B">Playbucks Information</span></td>
            </tr>
            <tr>
            <td style={{textAlign: 'center' }}>
                <img src=" /images/token_green.png" width="100"></img>
            </td>
            <td style={{textAlign: 'center' }}><div title="Page 1">
            <div>
            <div>
            <p><span className="trebuchet16B">
                Current Token Balance {Utils.getTokenBalance(this.props.tokens)} <br />
                Current Purchase Total {Money.format ('USD', this.props.cartTotal)}</span></p>
            </div>
            </div>
            </div>
            </td>
            </tr>
            <tr>
            <td colSpan="2" style={{textAlign: 'center' }}>
                <form name="form1" method="post" action=""><span className="trebuchet16B">Total Amount of Tokens deducted from your available balance for this purchase:</span>
                    <span className="trebuchet16B"><input name="token_quantity" type="text" id="token_quantity"
                   value={Utils.getTokensApplied(this.props.tokens)} size="5" maxLength="5"  readOnly
                    /></span>
            <input type="hidden" name="IS_TOKENS_PURCHASE"  id="IS_TOKENS_PURCHASE" value="YES"/>
            <br />
            <input type="image" name="PURCHASE_SUBMITTED" id="PURCHASE_SUBMITTED" src="/images/purchase-button.png"
                   width="200" alt="update_cart"
                   onClick={event=>{
                       event.preventDefault();
                       this.props.pubsub.publish('purchase-tokens', {tokens: this.props.tokens});
                   }}
            />
            </form>
            </td>
            </tr>
            </tbody>
            </table>




            </div>

        );
    }
}

