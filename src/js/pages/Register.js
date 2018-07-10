/**
 * Created by me on 1/31/17.  Re-deployed 07-2018 as Register.js
 */

import React from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import MemberInfo from "../components/MemberInfo";
import PubSub from "pubsub-js";

export default class Picksmain extends React.Component {

	constructor() {
		super();

    this.pubsub = PubSub;
    this.notificationManager = NotificationManager;
    this.member = {
      first_name: 'DT',
      last_name: 'Ison',
      address1: '124 Main',
      address2: '',
      city: 'Covington',
      state: 'KY',
      postal: '41011',
      country: 'USA',
      day_phone: '111-222-3333',
      eve_phone: '',
      email: 'nospam2012@dtison.net'
    };

    this.state = {

    };
    }

	componentWillMount() {

	}
	componentDidMount() {

  }


	componentWillUnmount() {

  }


  render() {
	  return (
	    <React.Fragment>
      <MemberInfo
        member={this.member}
        pubsub={this.pubsub}
        notificationManager={this.notificationManager}
        newRegistration={true}
      />
        <NotificationContainer/>

      </React.Fragment>
    );

  }



}

