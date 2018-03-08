/**
 * Created by me on 1/31/17.
 */

import React from "react";
import ReadMore from '../components/ReadMore';

export default class Freeplay extends React.Component {

    constructor(props) {
        super(props);

    }
    componentWillMount() {

    }
    componentDidMount() {

    }


    render() {

        const freePickTitle = this.props.freePick ? this.props.freePick.title : 'Free pick is not available yet.';
        const freePickBody = this.props.freePick ? this.props.freePick.body : '';

        return (
        <div>


            {/*<!--Start token box-->*/}
            <table>
                <tbody>

                <tr>
                    <td height="32" colSpan="2" style={{textAlign: 'center', backgroundColor: '#CCCCCC' }}><strong>Playbucks Information</strong></td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center' }}><img src=" /images/token_green.png" width="100"></td>
                    <td style={{textAlign: 'center' }}><div title="Page 1">
                        <div>
                            <div>
                                <p>Current Token Balance {TOKENS_REAL} <br>
                                    Current Purchase Total {PURCHASE_TOTAL} </p>
                            </div>
                        </div>
                    </div></td>
                </tr>
                <tr><td colSpan="2" style={{textAlign: 'center' }}>
                    <form name="form1" method="post" action="">Total Amount of Tokens deducted from your available balance for this sale:&nbsp;
                        <input name="token_quantity" type="text" id="token_quantity" value="{REAL_TOKENS_APPLIED}" size="5" maxlength="5"  readonly>
                            <input type="hidden" name="IS_TOKENS_PURCHASE"  id="IS_TOKENS_PURCHASE" value="YES"/>
                            <br>

                                <!--
                                        <input name="PURCHASE_SUBMITTED" type="submit" id="PURCHASE_SUBMITTED" value="Purchase">
                                -->
                                <input type="image" name="PURCHASE_SUBMITTED" id="PURCHASE_SUBMITTED" src="/images/purchase-button.png"  width="200" alt="update_cart" value="submit" />



                    </form>
                </td>
                </tr>
                </tbody>
            </table>
            {/*<!--end token box-->*/}



        </div>



        );
    }
}






