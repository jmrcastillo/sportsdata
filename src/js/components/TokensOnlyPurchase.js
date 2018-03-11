/**
 * Created by me on 1/31/17.
 */

import React from "react";


export default class TokensOnlyPurchase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
//            isChargeAuthorized: false,
        }
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

  //      console.log("TokensOnlyPurchase.. render()")

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
            <p>Current Token Balance [TOKENS_REAL] <br />
                Current Purchase Total [PURCHASE_TOTAL] </p>
            </div>
            </div>
            </div>
            </td>
            </tr>
            <tr>
            <td colSpan="2" style={{textAlign: 'center' }}>
             <form name="form1" method="post" action="">Total Amount of Tokens deducted from your available balance for this sale:&nbsp;
                <input name="token_quantity" type="text" id="token_quantity" defaultValue={0} size="5" maxLength="5"  readOnly />
                <input type="hidden" name="IS_TOKENS_PURCHASE"  id="IS_TOKENS_PURCHASE" value="YES"/>
                <br />
                <input type="image" name="PURCHASE_SUBMITTED" id="PURCHASE_SUBMITTED" src="/images/purchase-button.png"  width="200" alt="update_cart" value="submit" />
            </form>
            </td>
            </tr>
            </tbody>
            </table>




            </div>

        );
    }
}

