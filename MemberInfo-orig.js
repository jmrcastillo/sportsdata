/**
 * Created by me on 1/31/17.
 */

import React from "react";



export default class Login extends React.Component {

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

        const itemsTitle = this.state.picks.length === 0 ? "Add picks to cart to purchase" : "Items In My Cart";

  //      console.log("<Cart> # Picks ", this.state.picks.length);
        return (

        <div>


            <table width="300" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                <tr>
                    <td bgcolor="#CCCCCC"><table width="300" border="0" cellSpacing="1" cellPadding="1">
                        <tr>
                            <td align="center" bgcolor="#FFFFFF"><div title="Page 1">
                                <div>
                                    <div>
                                        <p><span className="verdana14">Your Member Information on file must match Your Credit Card Information (billing address).</span><br />
                                            <br />
                                            <a href="#" className="linkv14b" id="EDIT_CUSTOMER_INFO"><img src="/images/edit.png" border="0" /></a><br />
                                            <br />
                                        </p>
                                    </div>
                                </div>
                            </div></td>
                        </tr>
                    </table></td>
                </tr>
                </tbody>
            </table>
            {/*<!--Start Member Box-->*/}

            <table width="492" cellPadding="0" cellSpacing="0" bgcolor="#d6d5d5">

                <tbody id="EDITMEMBER" style="display:none" >
                <tr>
                    <td>

                        <table width="492" border="0" cellSpacing="1" cellPadding="1">
                            <tbody>
                            <tr>
                                <td bgcolor="#f5f5f5" height="30"><div align="center"><span className="verdana12b">Customer Information</span><br />
                                    <span className="verdanal10">The Info Below Needs To Match Your Credit Card Billing Statement. </span></div></td>
                            </tr><tr height="20">
                                <td bgcolor="#FFFFFF" width="386" height="20"><div align="left">&nbsp;<i>First Name:&nbsp;</i><b><input name="FIRST_NAME" type="text" value="{FIRST_NAME}" size="20" maxLength="50"/></b><i>&nbsp;&nbsp;Last Name:&nbsp;</i><b><input name="LAST_NAME" type="text" value="{LAST_NAME}" size="20" maxLength="50"/>
                                </b></div></td>
                            </tr>
                            <tr height="20">
                                <td bgcolor="white" width="386" height="20"><div align="left">&nbsp;<i>Address1:&nbsp;</i><b><input name="ADDRESS1" type="text" value="{ADDRESS1}" size="30" maxLength="50"/>
                                </b></div></td>
                            </tr>
                            <tr height="20">
                                <td bgcolor="white" width="386" height="20"><div align="left">&nbsp;<i>Address2:&nbsp;</i><b><input name="ADDRESS2" type="text" value="{ADDRESS2}" size="30" maxLength="50"/>
                                    <b/></b></div></td>
                            </tr>
                            <tr height="20">
                                <td bgcolor="white" width="386" height="20"><div align="left">&nbsp;<i>City:&nbsp;</i><b><input name="CITY" type="text" value="{CITY}" size="20" maxLength="30"/>
                                </b><i>&nbsp;&nbsp;State:&nbsp;</i><b><input name="STATE" type="text" value="{STATE}" size="2" maxLength="2"/>
                                </b></div></td>
                            </tr>
                            <tr height="20">
                                <td bgcolor="white" width="386" height="20"><div align="left">&nbsp;<i>Zip:&nbsp;</i><b><input name="POSTAL" type="text" value="{POSTAL}" size="10" maxLength="10"/>
                                </b><i>&nbsp;&nbsp;Country:&nbsp;</i><b><input name="COUNTRY" type="text" value="{COUNTRY}" size="6" maxLength="12"/>
                                </b></div></td>
                            </tr>
                            <tr height="20">
                                <td height="24" bgcolor="white"><div align="left">&nbsp;<i>Day Phone:&nbsp;</i><b><input name="DAY_PHONE" type="text" value="{DAY_PHONE}" size="12" maxLength="16"/>
                                </b></div></td>
                            </tr>
                            <tr height="20">
                                <td height="20" bgcolor="white"><div align="left">&nbsp;<i>Evening Phone:&nbsp;</i><b><input name="EVE_PHONE" type="text" value="{EVE_PHONE}" size="12" maxLength="16"/>
                                </b></div></td>
                            </tr>
                            <tr height="20">
                                <td height="20" bgcolor="white"><div align="left">&nbsp;<i>Email Address:&nbsp;</i><b><input name="EMAIL" type="text" value="{EMAIL}" size="20" maxLength="50"/>
                                </b></div></td>
                            </tr>
                            </tbody>
                        </table>

                    </td>
                </tr>
                </tbody>
            </table>
            {/*<!--End Member Box-->*/}

        </div>


        );
    }
}




