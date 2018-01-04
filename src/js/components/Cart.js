/**
 * Created by me on 1/31/17.
 */

import React from "react";
//import Utils from '../lib/Utils';


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            picks: [{pick_id: 0}, {pick_id: 1}],
        }

/*        const ta = [0,1,2];
        if (this.state.picks.contains(2)) {
            console.log("The test array contains 2");
        }*/

    }
    componentWillMount() {

    }
    componentDidMount() {
        this.props.observer.subscribe('add-pick', (data)=> {
            console.log('<Cart> received add-pick message. ', data);
        });
    }
    componentWillUnmount() {
        this.props.observer.unsubscribe('add-pick');
    }


    render() {

        const itemsTitle = this.state.picks.length === 0 ? "Add picks to cart to purchase" : "Items In My Cart";
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
                                        return (
                                            <tr key={i}>

                                                <td width="25" style={{textAlign: 'center', backgroundColor: 'White'}}>
                                                    <i className={'fa fa-trash'} ></i>
                                                </td>
                                                <td height="44" style={{textAlign: 'center', backgroundColor: 'White'}}>
                                                    {pick.pick_id}



                                                </td>
                                                <td style={{textAlign: 'center', backgroundColor: 'White'}}>&nbsp;</td>
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






