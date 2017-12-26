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
                <tr>
                    <td height="40" align="center" bgcolor="#990000"><div title="Page 1">
                        <div>
                            <div> <span className="trebuchet14B"><font color="white">My Cart</font></span> </div>
                        </div>
                    </div></td>
                </tr>
                <tr>
                    <td align="center" bgcolor="#990000"><table width="310" border="0" cellSpacing="0" cellPadding="0">
                        <tbody>
                        <tr>
                            <td bgcolor="#FFFFFF">
                                <table width="100%" border="0" cellSpacing="2" cellPadding="2">
                                    <tbody>
                                    <tr>
                                        <td colSpan="3" align="left"><strong>Items In My Cart</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" className="topnav_trebuchet12Bred">Click Here To Expand</a></td>
                                    </tr>
                                    <tr>
                                        <td width="25" align="center">&nbsp;</td>
                                        <td height="44" align="center"><span className="trebuchet14B">Your Cart Is Empty</span></td>
                                        <td align="center">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td height="44" align="center">&nbsp;</td>
                                        <td align="center">&nbsp;</td>
                                        <td align="center">&nbsp;</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table></td>
                </tr>
                <tr>
                    <td align="center" bgcolor="#990000">&nbsp;</td>
                </tr>
                <tr>
                    <td align="center" bgcolor="#FFFFFF"><img src="images/checkoutCC.png" width="211" height="50" /><br />

                        <img src="images/checkoutT.png" width="211" height="50" /></td>
                </tr>
                </tbody>
            </table>
            {/*<!--end cartn box-->*/}
        </div>



        );
    }
}






