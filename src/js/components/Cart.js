/**
 * Created by me on 1/31/17.
 */

import React from "react";


export default class Login extends React.Component {

    constructor() {
        super();

    }
    componentWillMount() {

    }
    componentDidMount() {

    }


    render() {

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
                                        <td colSpan="3" style={{textAlign: 'center', backgroundColor: 'White'}}><span className="trebuchet14B">Items In My Cart</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/*<a href="#" className="topnav_trebuchet12Bred">Click Here To Expand</a>*/}</td>
                                    </tr>
                                    <tr>
                                        <td width="25" style={{textAlign: 'center', backgroundColor: 'White'}}>&nbsp;</td>
                                        <td height="44" style={{textAlign: 'center', backgroundColor: 'White'}}><span className="trebuchet14B">Your Cart Is Empty</span></td>
                                        <td style={{textAlign: 'center', backgroundColor: 'White'}}>&nbsp;</td>
                                    </tr>

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






