/**
 * Created by me on 1/31/17.  Re-deployed 07-2018 as Register.js
 */

import React from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import PubSub from "pubsub-js";
import Login from "../components/Login";
import URLSafeBase64 from "urlsafe-base64";

import NodeGzip from "node-gzip";
import Utils from "../lib/Utils";

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
	  console.log("Register site-id is ",  Utils.getSiteID());

    this.subscribe_logged_in = this.pubsub.subscribe('logged-in', (message, data)=> {

      NodeGzip.gzip(`${data.member_id}|${data.password}`).then(compressed => {
        const login = URLSafeBase64.encode(compressed)
        const url = `https://www.ipsports.net/ecps/default/member_login.php?LOGIN=${login}`
        console.log ("** DEBUG** Register - login 64 ", url);
        window.location.assign(url);
      })

    });
  }


	componentWillUnmount() {
    this.pubsub.unsubscribe(this.subscribe_logged_in);

  }


  render() {
	  return (
	    <React.Fragment>
{/*      <MemberInfo
        member={this.member}
        pubsub={this.pubsub}
        notificationManager={this.notificationManager}
        newRegistration={true}
      />*/}

        <Login
          pubsub={this.pubsub}
          showFreePlay={false}
          notificationManager={this.notificationManager}
        />
        <NotificationContainer/>

      </React.Fragment>
    );

  }



}

