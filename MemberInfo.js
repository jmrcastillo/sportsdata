/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PicksAPI from "../lib/PicksAPI";
import Utils from "../lib/Utils";



export default class MemberInfo extends React.Component {

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

  updateMemberInfo(property, event, maxLength=null) {

    let member = this.state.member;
    member[property] = event.target.value;
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
            <React.Fragment>
                <div className="alert alert-secondary" role="alert">
                    <span className="verdana12b">Customer Information</span><br />
                    <span className="verdana12">The Info Below Needs To Match Your <br />Credit Card Billing Statement.<br /></span>
                </div>
                <div className="form-group">
                    <div className="col">
                        <label htmlFor="pl-ci-email">Email</label>
                    </div>
                    <div className="col">
                        <input className="input form-control" name="EMAIL" id="pl-ci-email" type="text" defaultValue={this.props.member.email}
                            onChange={event=>{
                                this.updateMemberInfo('email', event);
                            }}
                            size="20" maxLength="50"/>
                    </div>
                </div>
                
                {this.props.newRegistration &&
                <div className="form-group">
                        <div className="col">
                            <label htmlFor="pl-ci-pw">Password</label>
                        </div>
                        <div className="col">
                            <input className="input form-control" id="pl-ci-pw" name="PASSWORD" type="password" defaultValue={this.props.member.password}
                                    onChange={event=>{this.updateMemberInfo('password', event); }} size="20" maxLength="30"/>
                        </div>
                </div>
                }

                <div className="form-group">
                    <div className="col">
                        <label htmlFor="pl-ci-fname">First Name</label>
                    </div>
                    <div className="col">
                        <input className="input form-control" id="pl-ci-fname" name="FIRST_NAME" type="text" defaultValue={this.props.member.first_name}
                                onChange={event=>{this.updateMemberInfo('first_name', event);}} size="20" maxLength="20"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col">
                        <label htmlFor="pl-ci-lname">Last Name</label>
                    </div>
                    <div className="col">
                        <input className="input form-control" name="LAST_NAME" type="text" defaultValue={this.props.member.last_name}
                                        onChange={event=>{
                                            this.updateMemberInfo('last_name', event);
                                        }}
                                        size="20" maxLength="20"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col">
                        <label htmlFor="pl-ci-address1">Address 1</label>
                    </div>
                    <div className="col">
                        <input className="input form-control" id="pl-ci-address1"  name="ADDRESS1" type="text" defaultValue={this.props.member.address1}
                                           onChange={event=>{
                                               this.updateMemberInfo('address1', event);
                                           }}
                                           size="30" maxLength="50"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col">
                        <label htmlFor="pl-ci-address2">Address 2</label>
                    </div>
                    <div className="col">
                        <input className="input form-control" id="pl-ci-address2" name="ADDRESS2" type="text" defaultValue={this.props.member.address2}
                                   onChange={event=>{
                                       this.updateMemberInfo('address2', event);
                                   }}
                                   size="30" maxLength="50"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col">
                        <label htmlFor="pl-ci-city">City</label>
                    </div>
                    <div className="col">
                        <input className="input form-control" id="pl-ci-city" name="CITY" type="text" defaultValue={this.props.member.city}
                                                   onChange={event=>{
                                                       this.updateMemberInfo('city', event);
                                                   }}
                                                   size="20" maxLength="50"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col">
                        <label htmlFor="pl-ci-state">State</label>
                    </div>
                    <div className="col">
                        <input className="input form-control" id="pl-ci-state" name="STATE" type="text" defaultValue={this.props.member.state}
                        onChange={event=>{
                            this.updateMemberInfo('state', event);
                        }}
                        size="2" maxLength="50"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col">
                        <label htmlFor="pl-ci-zip">Zip / Postal</label>
                    </div>
                    <div className="col">
                        <input className="input form-control" id="pl-ci-zip" name="POSTAL" type="text" defaultValue={this.props.member.postal}
                        onChange={event=>{
                            this.updateMemberInfo('postal', event);
                        }}
                        size="10" maxLength="10"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col">
                        <label htmlFor="pl-ci-country">Country</label>
                    </div>
                    <div className="col">
                        <input className="input form-control" id="pl-ci-country" name="COUNTRY" type="text" defaultValue={this.props.member.country}
                        onChange={event=>{
                            this.updateMemberInfo('country', event);
                        }}
                        size="6" maxLength="30"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col">
                        <label htmlFor="pl-ci-dphone">Day Phone</label>
                    </div>
                    <div className="col">
                        <input className="input form-control" id="pl-ci-dphone" name="DAY_PHONE" type="text" defaultValue={this.props.member.day_phone}
                        onChange={event=>{
                            this.updateMemberInfo('day_phone', event);
                        }}
                        size="12" maxLength="20"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col">
                        <label htmlFor="pl-ci-ephone">Evening Phone</label>
                    </div>
                    <div className="col">
                        <input className="input form-control" id="pl-ci-ephone" name="EVE_PHONE" type="text" defaultValue={this.props.member.eve_phone}
                        onChange={event=>{
                            this.updateMemberInfo('eve_phone', event);
                        }}
                        size="12" maxLength="20"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col text-center">
                        <input type="button" className="btn btn-lg pl-cartbtn col-12 my-3" value={this.props.newRegistration ? "Register" : "Update"} onClick={e=>{

                        if (! this.validateFields()) {
                        e.preventDefault();
                        return;
                        }

                        const member = Object.assign(
                        {new_registration: this.props.newRegistration,
                        siteID: Utils.getSiteID()
                        }, this.state.member);



                        PicksAPI.saveMember(member).done((result)=>{
                        if (result.status === '403') {
                            this.props.notificationManager.error("Registration unsuccessful.  Please call customer support at 1-800-752-9266.");
                            return;
                        }


                        this.props.notificationManager.success(this.props.newRegistration ? 'Registration Successful' : 'Your changes saved.');
                        if (this.props.newRegistration) {
                        //   console.log ("RESULT (sending logged-in message NOW):", result.member);
                            this.props.pubsub.publish('logged-in', result.member);
                        } else {
                            this.props.pubsub.publish('member-info', this.state.member);
                        }

                        });

                        }}/>
                    </div>
                </div>

            </React.Fragment>
             
        );
    }
}


