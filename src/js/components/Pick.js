/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Money from "money-formatter";
import CheckoutButton from "../components/CheckoutButton";

// Temporarily disabled for pick expiration soon notices
import Moment from "moment";
import SportsCodes from "../lib/SportsCodes"
import BuyNow from "../components/BuyNow";
import Utils from "../lib/Utils";

export default class Pick extends React.Component {

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

        const sportBoxStyle = {
            backgroundColor:'#990000',
        };
        const pickBoxStyle = {
            backgroundColor:'#ffffff',

        };



        // TODO:  Need checkbox on pick input form to implement time notices
/*        const pickExpirationUTC = Moment(this.props.pick.expiration_date);
        const currentDateUTC = Moment().add(-(Moment().utcOffset()), 'm');

        var minutes = pickExpirationUTC.diff(currentDateUTC, 'minutes');
        const soon = 60;
        const verySoon = 10;

        const expireStyle = minutes <= verySoon ? 'expiresin10' : minutes <= soon ? 'expiresin120' : 'expiresinLongtime';
        const expireIcon = minutes <= verySoon ? 'fa fa-bell faa-ring animated' : minutes <= soon ? 'fa  fa-spinner fa-spin ' : '';
        const expiresIn = `  ${SportsCodes.getGameStart(this.props.pick.sport, minutes)} in ${minutes} minutes. `;
        */
        // TODO:  Replaces with this for now 2018-01-01
        const  expireStyle = 'expiresinLongtime';
        const expireIcon = '';
        const expiresIn = '';

        return (

            <table width="640" border="0"  cellSpacing="2" cellPadding="2" style={pickBoxStyle}>
                <tbody>
                <tr>
                    <td colSpan="3">
                        <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                            <tbody>
                            <tr>
                                <td style={pickBoxStyle}>&nbsp; <i className="faa-ring animated " /></td>
                            </tr>
                            <tr>
                                <td style={pickBoxStyle}>
                                <div align="left" class="trebuchet13"><b>{this.props.pick.title}<br />

                                   <font color="maroon">{this.props.inCart && "Selection added as "}
                                    {this.props.inCart && (this.props.isPAW === 'true' ?  "PAY AFTER YOU WIN" : "GUARANTEED PREPAID")}
                                    </font>

                                    <i className={expireIcon} ></i>
                                    <span className={expireStyle}
                                        dangerouslySetInnerHTML={
                                        { __html: expiresIn}
                                        }
                                    />

                                </b>
                                    {/* Begin experimental checkout buttons on picks */}


                        {/*            {! this.props.isCartEmpty &&
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <CheckoutButton
                                                        type="CC"
                                                        pubsub={this.props.pubsub}
                                                        enabled={true}
                                                        minified={true}
                                                    />
                                                </td>
                                                <td>
                                                    <CheckoutButton
                                                        type="TOKENS"
                                                        pubsub={this.props.pubsub}
                                                        enabled={true}
                                                        minified={true}
                                                    />
                                                </td>

                                            </tr>

                                            </tbody>
                                        </table>
                                    }*/}
                                    {/*  End experimental checkout button on picks */}



                                </div>
                                </td>
                            </tr>
                            </tbody>
                        </table></td>
                </tr>
                <tr>
                    <td colSpan="3" align="center"><img src="images/dot_h.png" width="626" height="7"></img></td>
                </tr>
                <tr>
                    <td width="262" align="left">
                        <table width="96%" border="0" cellSpacing="0" cellPadding="0">
                            <tbody>
                            <tr>
                                <td width="85" valign="middle">
                                <BuyNow
                                    pubsub={this.props.pubsub}
                                    loggedIn={this.props.loggedIn}
                                    pick={this.props.pick}
                                    isPAW={true}
                                    memberSuspended={this.props.memberSuspended}
                                    memberLevelFlagged={this.props.memberLevelFlagged}
                                />

                                </td>

                                <td valign="middle" class="trebuchet13">Pay After Win:
                                    <span className="price-bold">
                                    {Money.format ('USD', this.props.pick.price)}
                                </span>
                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <BuyNow
                                        pubsub={this.props.pubsub}
                                        loggedIn={this.props.loggedIn}
                                        pick={this.props.pick}
                                        isPAW={false}
                                        memberSuspended={this.props.memberSuspended}
                                        memberLevelFlagged={this.props.memberLevelFlagged}
                                    />
                                </td>
                                <td valign="middle" class="trebuchet13">Guaranteed Pre-Paid:
                                    <span className="price-bold">
                                    {Money.format ('USD', Utils.applyPrepaidDiscount(this.props.pick.price))}
                                    </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                    <td width="3"><img src="images/dots_v.png" width="7" height="92"></img></td>
                    <td width="345">
                        <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                            <tbody>
                            <tr>
                                <td style={pickBoxStyle} class="trebuchet13">
                                    <div align="left" dangerouslySetInnerHTML={
                                    { __html: this.props.pick.teaser }
                                    } />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                {/*Begin experimental checkout button on picks */}
{/*                <tr>
                    <td>
                        <CheckoutButton
                            type="CC"
                            pubsub={this.props.pubsub}
                            enabled={true}
                            minified={true}
                        />
                    </td>
                    <td>
                        <CheckoutButton
                            type="TOKENS"
                            pubsub={this.props.pubsub}
                            enabled={true}
                            minified={true}
                        />
                    </td>

                </tr>*/}
                {/*End */}


                </tbody>
            </table>



        );
    }
}




