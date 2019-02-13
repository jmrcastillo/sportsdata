/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PicksAPI from "../lib/PicksAPI";
import Freeplay from "../components/Freeplay";
import Modal from 'react-modal';
import MemberInfo from "../components/MemberInfo";
import Utils from "../lib/Utils";
import Cookies from "universal-cookie";

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    const memberIDCookie = Utils.getCookie("pb-member");


    this.state = {
      record_id: typeof (memberIDCookie) === 'undefined' ? '' : memberIDCookie,
      member_id: '',
      password: '',
      logged_in: !(typeof (memberIDCookie) === 'undefined'),
      member: {},
      freePickIsOpen: false,
      isRegistering: false,
    }




      // Auto-login member on record_id
/*    if (this.state.logged_in) {
// Do this only if status returns true
      PicksAPI.loginMember(this.state.record_id).done((result) => {

        if (result.success) {
          this.state.member = result.member;
          this.props.pubsub.publish('logged-in', result.member);
        } else {
          this.state.logged_in = false;
          this.props.pubsub.publish('logged-out');
        }
      });
    }*/

    //  Go out and get the status for whatever's in pb-member
    PicksAPI.getLoginStatus().then((result)=>{
      let loggedIn = false;


      if (result.logged_in === 1) {
        PicksAPI.loginMember(this.state.record_id).done((result) => {
console.log ("Logging in member ", result);
          if (result.success) {
            this.state.member = result.member;
            this.props.pubsub.publish('logged-in', result.member);
            loggedIn = true;
          }
        });
      }

      if (! loggedIn) {
          this.state.logged_in = false;
          this.props.pubsub.publish('logged-out');
      }


    })

  }

  componentWillMount() {
  }

  componentDidMount() {

    this.subscribe_logged_in = this.props.pubsub.subscribe('logged-in', (message, data) => {
  //    console.log("LOGIN logged-in listener", message, data);

      this.login(data.member_id, data.password, false);

      this.setState({logged_in: true, isRegistering: false});
      if (typeof (data) !== 'undefined') {
        this.setState({member: data});
      }
    });
    this.subscribe_logged_out = this.props.pubsub.subscribe('logged-out', (message, data) => {
      this.setState({logged_in: false});
    });



  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe(this.subscribe_logged_in);
    this.props.pubsub.unsubscribe(this.subscribe_logged_out);
  }

  shouldComponentUpdate() {
    return true;
  }

  login(member_id, password, publish=true) {

    PicksAPI.login(member_id, password, this.props.notificationManager).done((result) => {
      if (result.success) {
        this.setState({
          logged_in: true,
          member: result.member
        });

        Utils.saveCookie("pb-member", result.member.record_id);

        if (publish) {
          this.props.pubsub.publish('logged-in', result.member);
        }
      }
    });
  }

  render() {

    if (this.state.isRegistering) {
   //   console.log ("LOGIN isRegistering", this.state.member, this.props);
      return(
        <React.Fragment>
      <MemberInfo
        member={this.state.member}
        pubsub={this.props.pubsub}
        notificationManager={this.props.notificationManager}
        newRegistration={true}
      />
          <br />
          <span
            onClick={e=>this.setState({isRegistering: false})
          }>
          Back to Login..
          </span>
        </React.Fragment>
      )

    }


    // Free pick popup support
    const modalStyle = {
      left: '40%',
      width: '350',
      height: '300',
      top: '10px',
      //backgroundcolor       : '#ff8'
    };


    if (this.state.logged_in) {
      return (
        <div className="p-2">
          <div className="row m-0 my-2">
              <span className="col text-left p-0">Welcome back, <strong>{this.state.member ? this.state.member.first_name : ''}</strong></span>
              <span className="col-3 text-right p-0"
              onClick={(event) => {
                if (! this.state.logged_in) {
                  return;
                }
                PicksAPI.logout(Utils.getCookie("pb-member"));
                this.props.pubsub.publish('logged-out');
              }}

            >Logout</span>
          </div>
          <Modal
                isOpen={this.state.freePickIsOpen}
                onAfterOpen={(event)=>{
                 //   this.subtitle.style.color = '#00f';
                }}
                onRequestClose={(event)=>{
                    this.setState({freePickIsOpen: false});
                }}
                style={modalStyle}
                contentLabel="Example Modal"
                ariaHideApp={false}

            >

            <Freeplay freePick={this.props.freePick}/>
            <button onClick={(event)=>{
                this.setState({freePickIsOpen: false});
            }}>close</button>

          </Modal>

          {this.props.showFreePlay &&
          <Freeplay freePick={this.props.freePick}/>
          }
        </div>
      )
    }
    else {
      return (
        <React.Fragment>
           <div className="loginbox px-4 py-2">
            <h3>
              <span className="logintxt">Login To View Today's Featured Free Play</span>
            </h3>
            <form onSubmit={(event) => {
                this.login(this.state.member_id, this.state.password);
                event.preventDefault();
              }}>
                <span className="">Username:</span>&nbsp;
                      <input className="form-control" value={this.state.member_id} onChange={(event) => {
                        this.setState({member_id: event.target.value});
                      }} name="MEMBER_ID" type="text" id="MEMBER_ID" size="16" maxLength="80"/>
                <span className="">Password:</span>&nbsp;&nbsp;
                      <input className="form-control" value={this.state.password} onChange={(event) => {
                        this.setState({password: event.target.value});}} 
                        name="PASSWORD" type="password" id="PASSWORD" size="16" maxLength="12"/>
                <input className="btn btn-lg btn-dark btn-block mt-2 text-uppercase" type="submit" name="SUBMIT" id="SUBMIT" value="Submit"/>
                <span onClick={()=>{this.setState({isRegistering: true})}} className="trebuchet14BW">Register New Account..
                </span>
              </form>
          </div>
        </React.Fragment>
      );
    }
  }
}






