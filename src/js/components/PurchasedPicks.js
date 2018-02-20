/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Money from "money-formatter";
import Utils from "../lib/Utils";


export default class PurchasedPicks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillUnmount() {
    }


    render() {


  //      console.log("<Cart> # Picks ", this.state.picks.length);
        return (
        <div>


            {/*<!--Start Cart Box-->*/}
            <table width="630" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                <tr style={{textAlign: 'center', backgroundColor: '#990000'}}>
                    <td height="40" style={{textAlign: 'center', backgroundColor: '#990000'}}><div title="Page 1">
                        <div>
                            <div> <span className="trebuchet14BW">Your Picks</span> </div>
                        </div>
                    </div></td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center', backgroundColor: '#990000' }} >
                        <table width="620" border="0" cellSpacing="0" cellPadding="0">
                            <tbody>
                            <tr>
                                <td style={{textAlign: 'center', backgroundColor: '#990000' }}>
                                    <table width="630" border="0" cellSpacing="2" cellPadding="2">
                                        <tbody>
                                        <tr>
                                            <td colSpan="5" style={{textAlign: 'center', backgroundColor: 'White'}}>
                                                <span className="trebuchet14B">PurchasedPickTitle</span><br />
                                                <span className="trebuchet14">PurchasedPickBody</span><br /><br />
                                            </td>
                                        </tr>


{/*  LOOP HERE  */}
                                        <tr>
                                            <td width="28" style={{textAlign: 'center', backgroundColor: 'White'}}>


                                            </td>
                                        </tr>


         <tr>
                                            <td colSpan="5" style={{textAlign: 'center', backgroundColor: 'White'}}>
                                                <span className="trebuchet14B">PickTitle</span><br />
                                                <span className="trebuchet14B">PickBody</span><br /><br />
                                            </td>
                                        </tr>


                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>

                        </table></td>
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



