/**
 * Created by me on 1/31/17.
 */

import React from "react";



export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            member: props.member,
        }
    }
    componentWillMount() {

    }
    componentDidMount() {


    }
    componentWillUnmount() {
    }

    updateMemberInfo(property, value) {
        let member = this.state.member;
        member[property] = value;
        this.setState(member);
    }

    render() {

        return (

             <table width="492" cellPadding="0" cellSpacing="0" bgcolor="#d6d5d5">

                <tbody id="EDITMEMBER"  >
                <tr>
                    <td>

                        <table width="492" border="0" cellSpacing="1" cellPadding="1">
                            <tbody>
                            <tr>
                                <td bgcolor="#f5f5f5" height="30"><div align="center"><span className="verdana12b">Customer Information</span><br />
                                    <span className="verdanal10">The Info Below Needs To Match Your Credit Card Billing Statement. </span></div></td>
                            </tr>
                            <tr height="20">
                                <td bgcolor="#FFFFFF" width="386" height="20">
                                    <div align="left">&nbsp;
                                    <i>First Name:&nbsp;</i>
                                    <b>
                                    <input name="FIRST_NAME" type="text" defaultValue={this.props.member.first_name}
                                    onChange={event=>{
                                        console.log("MemberInfo updating state.member was", this.state.member);
                                        this.updateMemberInfo('first_name', event.target.value);
                                    }}
                                    size="20" maxLength="50"/>
                                    </b>
                                </div>
                                </td>
                            </tr>

                            <tr height="20">
                                <td bgcolor="#FFFFFF" width="386" height="20">
                                    <div align="left">&nbsp;

                                        <i>

                                            Last Name:&nbsp;</i>
                                        <b>
                                            <input name="LAST_NAME" type="text" defaultValue={this.props.member.last_name}
                                                   onChange={event=>{
                                                       this.updateMemberInfo('last_name', event.target.value);
                                                   }}
                                                   size="20" maxLength="50"/>
                                        </b></div>
                                </td>
                            </tr>





                            <tr>
                                <td>
                                    <input type="button" value="Save" onClick={e=>{
                                        console.log("Saving...", this.state.member);
                                    }}/>

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

{/*<tr height="20">
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
    </tr>*/}


