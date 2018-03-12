/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Money from "money-formatter";

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

            <div align="center">


            <table>
            <tbody>

            <tr>
                <td height="32" colSpan="2" style={{textAlign: 'center', backgroundColor: '#CCCCCC' }}><strong>Playbucks Information</strong></td>
            </tr>
            <tr>
            <td style={{textAlign: 'center' }}>
                <img src=" /images/token_green.png" width="100"></img>
            </td>
            <td style={{textAlign: 'center' }}><div title="Page 1">
            <div>
            <div>
            <p>
                Current Token Balance {Money.format ('USD', parseInt(this.props.tokens.awardTokens) + parseInt(this.props.tokens.realTokens))} <br />
                Current Purchase Total {Money.format ('USD', this.props.cartTotal)} </p>
            </div>
            </div>
            </div>
            </td>
            </tr>
            <tr>
            <td colSpan="2" style={{textAlign: 'center' }}>
            <form name="form1" method="post" action="">Total Amount of Tokens deducted from your available balance for this purchase:&nbsp;
            <input name="token_quantity" type="text" id="token_quantity"
                   value={Money.format ('USD', parseInt(this.props.tokens.realTokensApplied) + parseInt(this.props.tokens.awardTokensApplied))} size="5" maxLength="5"  readOnly
            />
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

