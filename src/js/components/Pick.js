/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Money from "money-formatter";


export default class Pick extends React.Component {

    constructor() {
        super();

    }
    componentWillMount() {

    }
    componentDidMount() {

    }


    render() {

        return (


            <table width="630" border="0" cellSpacing="2" cellPadding="2" bgcolor="#FFFFFF">
                <tbody>
                <tr>
                    <td colSpan="3">
                        <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                            <tbody>
                            <tr>
                                <td bgcolor="white">&nbsp;</td>
                            </tr>
                            <tr>
                                <td bgcolor="white"><div align="left" class="trebuchet13"><b>{this.props.pick.title}</b></div></td>
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
                                <td width="85" valign="middle"><img src="images/buynow.png" width="85"  border="0" align="left"></img></td>

                                <td valign="middle" class="trebuchet13">Pay After Win: {Money.format ('USD', this.props.pick.price)}</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td><img src="images/buynow.png" width="85" border="0" align="left"></img></td>
                                <td valign="middle" class="trebuchet13">Guaranteed Pre-Paid:  {Money.format ('USD', (Math.floor(this.props.pick.price * .6)))}</td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                    <td width="3"><img src="images/dots_v.png" width="7" height="92"></img></td>
                    <td width="345">
                        <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                            <tbody>
                            <tr>
                                <td bgcolor="white" class="trebuchet13">
                                    <div align="left" dangerouslySetInnerHTML={
                                    { __html: this.props.pick.teaser }
                                    } />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>



        );
    }
}






