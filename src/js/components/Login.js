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
        <div>
          <span className="trebuchet14" style={{textAlign: 'center'}}>
              Welcome back, <strong>{this.state.member ? this.state.member.first_name : ''}</strong>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span
              onClick={(event) => {
                if (! this.state.logged_in) {
                  return;
                }
             //   alert("Logging out now.. ");
                const memberID = Utils.getCookie("pb-member");
                PicksAPI.logout(memberID);
                new Cookies().remove('pb-member');
                this.props.pubsub.publish('logged-out');
              }}

            >Logout</span>


            {/*    <span onClick={(event)=>{
                  console.log ("Trying freeplay", this.props.freePick.body);
                  this.setState({freePickIsOpen: true});

              }}>Get Today's Free Pick
              </span>*/}
          </span>
          <br/>

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
        <div>


          {/*<!--Start login box-->*/}
          <table width="320" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
            <tr style={{verticalAlign: 'top'}}>
              <td height="40" style={{textAlign: 'center', backgroundColor: '#000000'}}>
                <div>
                  <div>
                    <h3><span
                      className="trebuchet14BW">Login To View Today's Featured Free Play</span>
                    </h3>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td width="4" style={{textAlign: "center", backgroundColor: '#000000'}}>
                <table width="310" border="0" cellSpacing="0" cellPadding="0">
                  <tbody>
                  <tr>
                    <td style={{textAlign: 'center', backgroundColor: '#000000'}}>

                      <form onSubmit={(event) => {
                        this.login(this.state.member_id, this.state.password);
                        event.preventDefault();
                      }}>

                        <table width="310" border="0" cellSpacing="0" cellPadding="0">
                          <tbody>
                          <tr>
                            <td height="32" style={{textAlign: 'center'}}>

                              <span className="trebuchet14BW">Username:</span>&nbsp;
                              <input value={this.state.member_id} onChange={(event) => {
                                this.setState({member_id: event.target.value});
                              }} name="MEMBER_ID" type="text" id="MEMBER_ID" size="16"
                                     maxLength="80"/>

                            </td>
                          </tr>
                          <tr>
                            <td height="32" align="center">
                              <span className="trebuchet14BW">Password:</span>&nbsp;&nbsp;
                              <input value={this.state.password} onChange={(event) => {
                                this.setState({password: event.target.value});
                              }} name="PASSWORD" type="text" id="PASSWORD" size="16"
                                     maxLength="12"/>

                            </td>
                          </tr>
                          <tr>
                            <td height="42" align="center">
                              <input type="submit" name="SUBMIT" id="SUBMIT"
                                     value="Submit"/>
                            </td>
                          </tr>

                          <tr style={{verticalAlign: 'top'}}>
                            <td height="40" style={{textAlign: 'center', backgroundColor: '#000000'}}>
                              <div>
                                <div>
                                  <span onClick={()=>{

/*
 // TEMP STUFF
                            const member =   {
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
                   //         console.log("MemberInfo: setstate member", member);
                            this.setState({member: member});*/



                                    this.setState({isRegistering: true})
                                  }}
                                    className="trebuchet14BW">Register New Account..
                                  </span>
                                </div>
                              </div>
                            </td>
                          </tr>


                          </tbody>
                        </table>
                      </form>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style={{textAlign: 'center', backgroundColor: '#000000'}}>&nbsp;</td>
            </tr>
            </tbody>
          </table>
          {/*<!--end login box-->*/}


        </div>


      );
    }
  }
}






