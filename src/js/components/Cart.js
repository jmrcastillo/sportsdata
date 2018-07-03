/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Money from "money-formatter";
import Utils from "../lib/Utils";
import Cookies from "universal-cookie";
import PicksAPI from "../lib/PicksAPI";
import CheckoutButton from "../components/CheckoutButton";
import CCardInfo from "../components/CCardInfo";
import TokensInfo from "../components/TokensInfo";


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            picks: [],
            cartTotal: 0,
            logged_in: this.props.loggedIn,
        }
        // Try re-load cart from cookies
        const cookie =  new Cookies().get("pb-cart");
        if (typeof (cookie) != 'undefined') {
            const picks = cookie.split(',').map(pick=>{
                const elements = pick.split('|');
                return {pick_id: elements[0], isPAW: elements[1]}
            });

      //      console.log("Cart: picks", picks);

            const pickList = picks.reduce((prev, curr)=>{
                return prev + curr.pick_id + ',';
            },'').slice(0, -1);

            (pickList.length > 0) && PicksAPI.loadPicksList(pickList).done(loadedPicks => {
                   const picksWithType = loadedPicks.map((pick, index) => {
                           pick.isPAW = (picks[index].isPAW === 'true');
                           return pick;
                       }
                   );

                   this.setState({
                       picks: picksWithType,
                       cartTotal: this.cartTotal(picksWithType)
                   });
                   // To notify parent of selected picks on initial load
                   this.props.pubsub.publish('selected-picks',  Utils.stringifyPicks(picksWithType));
               });

        }
    }

    componentWillMount() {

    }
    componentDidMount() {
        this.subscribe_add_pick = this.props.pubsub.subscribe('add-pick', (message, data)=> {

            const findIndex = this.state.picks.findIndex((pick)=>{
                return pick.pick_id === data.pick.pick_id;
            });

            let picks = [];
            if (findIndex === -1) {
                picks = this.state.picks.concat([data.pick]);
            } else {
                if (this.state.picks[findIndex].isPAW === data.pick.isPAW) {
                    alert ("Already added  " + data.pick.title + ' ' + (data.pick.isPAW ? "Pay after Win" : "Guaranteed Prepaid"));
                } else {
                    picks = this.state.picks;
                    picks.splice (findIndex, 1);
                    picks.splice (findIndex, 0, data.pick);
                }
            }
            if (picks.length > 0) {
                this.setState({
                    picks: picks,
                    cartTotal: this.cartTotal(picks)
                });
                this.savePicksAsCookie(picks);
            }

        });

        this.subscribe_logged_in = this.props.pubsub.subscribe('logged-in', (message, data)=> {
            this.setState({logged_in: true});
        });
        this.subscribe_logged_out = this.props.pubsub.subscribe('logged-out', (message, data)=> {
            this.setState({
                logged_in: false,
                picks: []
            });
            this.savePicksAsCookie([]);
        });
        this.subscribe_empty_cart = this.props.pubsub.subscribe('empty-cart', (message, data)=> {
            this.setState({
                picks: []
            });
            this.savePicksAsCookie([]);
        });

        // For all checkout, scroll to top
        if (this.props.isZoomed) {
            window.scrollTo(0, 0);

        }
    }

/*    componentWillReceiveProps(nextProps) {
        console.log("**Cart WillReceiveProps..");



    }*/


    componentWillUnmount() {
        this.savePicksAsCookie(this.state.picks);
        this.props.pubsub.unsubscribe(this.subscribe_add_pick);
        this.props.pubsub.unsubscribe(this.subscribe_logged_in);
        this.props.pubsub.unsubscribe(this.subscribe_logged_out);
        this.props.pubsub.unsubscribe(this.subscribe_empty_cart);
    }

    savePicksAsCookie(picks) {
        const cookiePicks = Utils.stringifyPicks(picks);
        new Cookies().set("pb-cart", cookiePicks, {path: "/"});
        this.props.pubsub.publish('selected-picks', cookiePicks);
    }

    cartTotal(picks) {

 /*      const cartTotal = picks.reduce((accumulator, pick)=>{
           const temp = accumulator + parseInt ((pick.isPAW  ? pick.price : Utils.applyPrepaidDiscount(pick.price)));
           console.log("Cart - calculating cart total ", accumulator, temp);

           return temp;
       }, 0);
       console.log("Cart - total is now ", cartTotal, picks.length);
*/
        return picks.reduce((accumulator, pick)=>{
            return accumulator + parseInt(pick.isPAW  ? pick.price : Utils.applyPrepaidDiscount(pick.price));
        }, 0);
    }

    render() {

        const itemsTitle = this.state.picks.length === 0 ? "Add picks to cart to purchase" : "Items In My Cart";

        const width10 = this.props.isZoomed ? 610 : 310;
        const width20 = this.props.isZoomed ? 620 : 320;

 //       console.log("Cart cartTotal",  this.state.cartTotal);

      const cartStyle = {
          position: 'fixed',
          top: '20%',
          opacity: '.8',
          visibility: this.state.picks.length > 0  ? 'visible' : 'hidden'
        }
        const cartStyleCheckout = {
            opacity: '.8',

        }


        return (

            this.state.logged_in &&

        <div style={this.props.isZoomed ? cartStyleCheckout : cartStyle }>

            {/*<!--Start Cart Box-->*/}
            <table width={width20} border="0" cellSpacing="0" cellPadding="0" align="center">
                <tbody>
                <tr style={{textAlign: 'center', backgroundColor: '#990000'}}>
                    <td height="40" style={{textAlign: 'center', backgroundColor: '#990000'}}><div title="Page 1">
                        <div>
                            <div> <span className="trebuchet14BW">My Cart</span> </div>
                        </div>
                    </div></td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center', backgroundColor: '#990000' }} >
                        <table width={width10} border="0" cellSpacing="0" cellPadding="0">
                        <tbody>
                        <tr>
                            <td style={{textAlign: 'center', backgroundColor: '#990000' }}>
                                <table width={width20} border="0" cellSpacing="2" cellPadding="2">
                                    <tbody>
                                    <tr>
                                        <td colSpan="4" style={{textAlign: 'center', backgroundColor: 'White'}}>
                                            <span className="trebuchet14B">{itemsTitle}</span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            {/*<a href="#" className="topnav_trebuchet12Bred">Click Here To Expand</a>*/}</td>
                                    </tr>

                                    {this.state.picks.map((pick, i) => {
                                        const price = pick.isPAW ? Money.format ('USD', pick.price) : Money.format ('USD', Utils.applyPrepaidDiscount(pick.price));
           //                             console.log ("Cart ", pick, price);
                                        return (
                                            <tr key={i}>
                                                <td width="28" style={{textAlign: 'center', backgroundColor: 'White'}}>

                                                    <img src="images/trash.png" width="25"
                                                    onClick={(event)=>{
                                                        console.log("Deleting pick", i, "from cart");
                                                        let picks = this.state.picks;
                                                        picks.splice(i, 1);
                                                        this.setState({
                                                            picks: picks,
                                                            cartTotal: this.cartTotal(picks)
                                                        })

                                                        this.savePicksAsCookie(picks);
                                                    }}
                                                    />
                                                </td>
                                                <td height="44" style={{textAlign: 'center', backgroundColor: 'White'}}>
                                                    <span className="trebuchet12B">{pick.title}</span>
                                                </td>
                                                <td width="50" style={{textAlign: 'center', backgroundColor: 'White'}}>
                                                    <span className="trebuchet14B">{price}</span>
                                                </td>
                                                {this.props.isZoomed &&
                                                    <td width="50"
                                                        style={{textAlign: 'center', backgroundColor: 'White'}}>
                                                        <span className="trebuchet14B">Type:<br />{pick.isPAW ? 'G' : 'PP'}</span>
                                                    </td>
                                                }
                                            </tr>
                                        )})}

                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
{/*                            {this.props.isZoomed &&
                                <div float: right><span className="trebuchet14BW">Total:&nbsp;{TOTAL}</span></div>
                            }*/}
                        </table></td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center', backgroundColor: 'Maroon'}}>&nbsp;</td>
                </tr>

                <tr>
                    <td style={{textAlign: 'center', backgroundColor: 'White'}}><br /><br />

                        {this.props.isZoomed &&
                            <div>
                            <a href="#" onClick={event=> {
                                this.props.pubsub.publish('mode-normal');
                                }
                            }><img src="/images/return_catalog_btn.png" border="0" />
                            </a>
                            {! this.props.isTokens &&
                                <CCardInfo
                                chargeTotal={this.state.cartTotal}
                                pubsub={this.props.pubsub}
                                />
                            }
                            {this.props.isTokens &&
                                <TokensInfo
                                    cartTotal={this.state.cartTotal}
                                    pubsub={this.props.pubsub}
                                    member={this.props.member}
                                />
                            }

                            </div>
                       }
                       {! this.props.isZoomed &&
                            <div>
                                <CheckoutButton
                                    type="CC"
                                    pubsub={this.props.pubsub}
                                    enabled={this.state.picks.length > 0}
                                />
                                <br />
                                <CheckoutButton
                                    type="TOKENS"
                                    pubsub={this.props.pubsub}
                                    enabled={this.state.picks.length > 0}
                                />

                                <br />
                                Your tokens <strong> {Utils.getMemberTokenBalance(this.props.member)}</strong>
                            </div>
                        }
                        </td>
                </tr>
                </tbody>
            </table>
            {/*<!--end cartn box-->*/}
        </div>




        );
    }
}


{/*
 <i className={'fa fa-trash'} ></i>
 */}



