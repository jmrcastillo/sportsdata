/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Money from "money-formatter";
import Utils from "../lib/Utils";
import Cookies from "universal-cookie";
import PicksAPI from "../lib/PicksAPI";


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            picks: [],
            logged_in: this.props.loggedIn,
        }
        // Try re-load cart from cookies
        const cookie =  new Cookies().get("pb-cart");
        if (typeof (cookie) != 'undefined') {
            const picks = cookie.split(',').map(pick=>{
                const elements = pick.split('|');
                return {pick_id: elements[0], isPAW: elements[1]}
            });
            const pickList = picks.reduce((prev, curr)=>{
                return prev + curr.pick_id + ',';
            },'').slice(0, -1);
            PicksAPI.loadPicksList(pickList).done(picks=>{
                console.log(picks.length + " picks re-loaded from server");
                this.state.picks = picks;
            });
        }




    }
    componentWillMount() {

    }
    componentDidMount() {
        this.props.pubsub.subscribe('add-pick', (message, data)=> {

          //              console.log('<Cart> received add-pick message. ', message, data);

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
                    picks: picks
                })
                // Cookie save
                const cookiePicks = picks.map(pick => {
                    return {pick_id: pick.pick_id, isPAW: pick.isPAW};
                }).reduce((prev, curr) => {
                    return prev  + curr.pick_id + '|' + curr.isPAW + ',';
                },'').slice(0, -1);

                console.log("Custom cookie string", cookiePicks);

                new Cookies().set("pb-cart", cookiePicks, {path: "/"});



            }
        });

        this.props.pubsub.subscribe('logged-in', (message, data)=> {
            this.setState({logged_in: true});
        });
        this.props.pubsub.subscribe('logged-out', (message, data)=> {
            this.setState({logged_in: false,
                            picks: []});


        });


    }
    componentWillUnmount() {
    }


    render() {

        const itemsTitle = this.state.picks.length === 0 ? "Add picks to cart to purchase" : "Items In My Cart";

  //      console.log("<Cart> # Picks ", this.state.picks.length);
        return (
        <div>





            {/*<!--Start Cart Box-->*/}
            <table width="320" border="0" cellSpacing="0" cellPadding="0">
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
                        <table width="310" border="0" cellSpacing="0" cellPadding="0">
                        <tbody>
                        <tr>
                            <td style={{textAlign: 'center', backgroundColor: '#990000' }}>
                                <table width="320" border="0" cellSpacing="2" cellPadding="2">
                                    <tbody>
                                    <tr>
                                        <td colSpan="3" style={{textAlign: 'center', backgroundColor: 'White'}}>
                                            <span className="trebuchet14B">{itemsTitle}</span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            {/*<a href="#" className="topnav_trebuchet12Bred">Click Here To Expand</a>*/}</td>
                                    </tr>

                                    {this.state.picks.map((pick, i) => {
                                  //      console.log("<Cart> displaying pick ", pick);
                                        const price = pick.isPAW ? Money.format ('USD', pick.price) : Money.format ('USD', Utils.applyPrepaidDiscount(pick.price));
                                        return (
                                            <tr key={i}>
                                                <td width="25" style={{textAlign: 'center', backgroundColor: 'White'}}>

                                                    <img src="images/trash.png" width="25"
                                                    onClick={(event)=>{
                                                        console.log("Deleting pick", i, "from cart");
                                                        let picks = this.state.picks;
                                                        picks.splice(i, 1);
                                                        this.setState({
                                                            picks: picks
                                                        })
                                                    }}
                                                    />
                                                </td>
                                                <td height="44" style={{textAlign: 'center', backgroundColor: 'White'}}>
                                                    <span className="trebuchet14B">{pick.title}</span>
                                                </td>
                                                <td width="50" style={{textAlign: 'center', backgroundColor: 'White'}}>
                                                    <span className="trebuchet14B">{price}</span>
                                                </td>
                                            </tr>
                                        )})}




                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table></td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center', backgroundColor: 'Maroon'}}>&nbsp;</td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center', backgroundColor: 'White'}}><img src="images/checkoutCC.png" width="211" height="50" /><br />

                        <img src="images/checkoutT.png" width="211" height="50" /></td>
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



