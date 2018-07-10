/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PicksAPI from "../lib/PicksAPI";



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

    validateFields() {
      let result = true;

      if (! this.state.member.password || this.state.member.password.length < 5) {
        result = false;
        this.props.notificationManager.error('Password must be at least five characters long.');
      }
      if (! this.state.member.first_name || this.state.member.first_name.length < 1) {
        result = false;
        this.props.notificationManager.error('First name is required.');
      }
      if (! this.state.member.last_name || this.state.member.last_name.length < 1) {
        result = false;
        this.props.notificationManager.error('Last name is required.');
      }

      if (! this.state.member.email || this.state.member.email.length < 1) {
        result = false;
        this.props.notificationManager.error('Email is required.');
      }

      return result;
    }


    render() {

        return (
             <table width="342" cellPadding="0" cellSpacing="0" bgcolor="#d6d5d5">

                <tbody id="EDITMEMBER"  >
                <tr>
                    <td>

                        <table width="342" border="0" cellSpacing="1" cellPadding="1">
                            <tbody>
                            <tr>
                                <td bgcolor="#f5f5f5" height="30" style={{textAlign: "center"}}><div><span className="verdana12b">Customer Information</span><br />
                                    <span className="verdana12">The Info Below Needs To Match Your <br />Credit Card Billing Statement.<br /><br /></span></div></td>
                            </tr>

                            <tr height="28">
                              <td bgcolor="#FFFFFF" width="342" height="28">
                                <div align="left">&nbsp;
                                  <i>Email:&nbsp;</i>
                                  <b>
                                    <input className="input" name="EMAIL" type="text" defaultValue={this.props.member.email}
                                           onChange={event=>{
                                             this.updateMemberInfo('email', event.target.value);
                                           }}
                                           size="20" maxLength="50"/>
                                  </b>
                                </div>
                              </td>
                            </tr>

                            {this.props.newRegistration &&
                            <tr height="28">
                              <td bgcolor="#FFFFFF" width="342" height="28">
                                <div align="left">&nbsp;
                                  <i>Password:&nbsp;</i>
                                  <b>
                                    <input className="input" name="PASSWORD" type="password" defaultValue={this.props.member.password}
                                           onChange={event=>{
                                             this.updateMemberInfo('password', event.target.value);
                                           }}
                                           size="20" maxLength="50"/>
                                  </b>
                                </div>
                              </td>
                            </tr>

                            }

                            <tr height="28">
                            <td bgcolor="#FFFFFF" width="342" height="28">
                                <div align="left">&nbsp;
                                <i>First Name:&nbsp;</i>
                                <b>
                                <input className="input" name="FIRST_NAME" type="text" defaultValue={this.props.member.first_name}
                                onChange={event=>{
                                //    console.log("MemberInfo updating state.member was", this.state.member);
                                    this.updateMemberInfo('first_name', event.target.value);
                                }}
                                size="20" maxLength="50"/>
                                </b>
                            </div>
                            </td>
                            </tr>

                            <tr height="28">
                            <td bgcolor="#FFFFFF" width="342" height="28">
                                <div align="left">&nbsp;
                                <i>Last Name:&nbsp;</i>
                                <b>
                                <input className="input" name="LAST_NAME" type="text" defaultValue={this.props.member.last_name}
                                       onChange={event=>{
                                           this.updateMemberInfo('last_name', event.target.value);
                                       }}
                                       size="20" maxLength="50"/>
                                </b>
                                </div>
                            </td>
                            </tr>

                            <tr height="28">
                            <td bgcolor="#FFFFFF" width="342" height="28">
                                <div align="left">&nbsp;

                                    <i>Address 1:&nbsp;</i>
                                    <b>
                                    <input className="input" name="ADDRESS1" type="text" defaultValue={this.props.member.address1}
                                           onChange={event=>{
                                               this.updateMemberInfo('address1', event.target.value);
                                           }}
                                           size="30" maxLength="50"/>
                                    </b>
                                </div>
                            </td>
                            </tr>

                            <tr height="28">
                            <td bgcolor="#FFFFFF" width="342" height="28">
                            <div align="left">&nbsp;
                            <i>Address 2:&nbsp;</i>
                            <b>
                            <input className="input" name="ADDRESS2" type="text" defaultValue={this.props.member.address2}
                                   onChange={event=>{
                                       this.updateMemberInfo('address2', event.target.value);
                                   }}
                                   size="30" maxLength="50"/>
                            </b>
                            </div>
                            </td>
                            </tr>

                            <tr height="28">
                                <td bgcolor="#FFFFFF" width="342" height="28">
                                    <div align="left">&nbsp;
                                        <i>City:&nbsp;</i>
                                        <b>
                                            <input className="input" name="CITY" type="text" defaultValue={this.props.member.city}
                                                   onChange={event=>{
                                                       this.updateMemberInfo('city', event.target.value);
                                                   }}
                                                   size="20" maxLength="30"/>
                                        </b>
                                    </div>
                                </td>
                            </tr>

                            <tr height="28">
                                <td bgcolor="#FFFFFF" width="342" height="28">
                                    <div align="left">&nbsp;
                                        <i>State:&nbsp;</i>
                                        <b>
                                            <input className="input" name="STATE" type="text" defaultValue={this.props.member.state}
                                                   onChange={event=>{
                                                       this.updateMemberInfo('state', event.target.value);
                                                   }}
                                                   size="2" maxLength="2"/>
                                        </b>
                                    </div>
                                </td>
                            </tr>

                            <tr height="28">
                                <td bgcolor="#FFFFFF" width="342" height="28">
                                    <div align="left">&nbsp;
                                        <i>Zip / Postal:&nbsp;</i>
                                        <b>
                                            <input className="input" name="POSTAL" type="text" defaultValue={this.props.member.postal}
                                                   onChange={event=>{
                                                       this.updateMemberInfo('postal', event.target.value);
                                                   }}
                                                   size="10" maxLength="10"/>
                                        </b>
                                    </div>
                                </td>
                            </tr>

                            <tr height="28">
                                <td bgcolor="#FFFFFF" width="342" height="28">
                                    <div align="left">&nbsp;
                                        <i>Country:&nbsp;</i>
                                        <b>
                                            <input className="input" name="COUNTRY" type="text" defaultValue={this.props.member.country}
                                                   onChange={event=>{
                                                       this.updateMemberInfo('country', event.target.value);
                                                   }}
                                                   size="6" maxLength="10"/>
                                        </b>
                                    </div>
                                </td>
                            </tr>

                            <tr height="28">
                                <td bgcolor="#FFFFFF" width="342" height="28">
                                    <div align="left">&nbsp;
                                        <i>Day Phone:&nbsp;</i>
                                        <b>
                                            <input className="input" name="DAY_PHONE" type="text" defaultValue={this.props.member.day_phone}
                                                   onChange={event=>{
                                                       this.updateMemberInfo('day_phone', event.target.value);
                                                   }}
                                                   size="12" maxLength="16"/>
                                        </b>
                                    </div>
                                </td>
                            </tr>

                            <tr height="28">
                                <td bgcolor="#FFFFFF" width="342" height="28">
                                    <div align="left">&nbsp;
                                        <i>Evening Phone:&nbsp;</i>
                                        <b>
                                            <input className="input" name="EVE_PHONE" type="text" defaultValue={this.props.member.eve_phone}
                                                   onChange={event=>{
                                                       this.updateMemberInfo('eve_phone', event.target.value);
                                                   }}
                                                   size="12" maxLength="16"/>
                                        </b>
                                    </div>
                                </td>
                            </tr>




                            <tr>
                              <td style={{textAlign: "center"}}>
                                <input type="button" value={this.props.newRegistration ? "Register" : "Update"} onClick={e=>{

                                  if (! this.validateFields()) {
                                    e.preventDefault();
                                    return;
                                  }

                                  const member = Object.assign({new_registration: this.props.newRegistration}, this.state.member);
                                  PicksAPI.saveMember(member).done((result)=>{
                                    this.props.notificationManager.success(this.props.newRegistration ? 'Registration Successful' : 'Your changes saved.');
                                    if (this.props.newRegistration) {
//                                      console.log ("RESULT (sending logged-in):", result.member);
                                      this.props.pubsub.publish('logged-in', result.member);
                                    } else {
                                      this.props.pubsub.publish('member-info', this.state.member);
                                    }

                                  });

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


