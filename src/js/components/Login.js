/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PicksAPI from "../lib/PicksAPI";
import Freeplay from "../components/Freeplay";
import Cookies from "universal-cookie";


export default class Login extends React.Component {

    constructor(props) {
        super(props);

        const memberIDCookie = new Cookies().get("pb-member");

        this.state = {
            record_id: typeof (memberIDCookie) === 'undefined' ? '' : memberIDCookie,
            member_id: '',
            password: '',
            logged_in: ! (typeof (memberIDCookie) === 'undefined'),
            member: null,
        }

        // Auto-login member on record_id
        if (this.state.logged_in) {
            PicksAPI.loginMember(this.state.record_id).done((result) => {
                console.log("CONSTRUCTOR Login results", result);
                if (result.success) {
                    this.setState({member: result.member});
                    console.log("Login PUBLISHING logged-in");
                    this.props.pubsub.publish('logged-in');
                }
            });
        }
        this._isMounted = false;

    }
    componentWillMount() {
    }

    componentDidMount() {


        this.props.pubsub.subscribe('logged-in', (message, data)=> {
            console.log('<Login> received logged-in message. ');
            if (this._isMounted) {
                this.setState({logged_in: true});
            }


        });
        this.props.pubsub.subscribe('logged-out', (message, data)=> {
            console.log('<Login> received logged-out message. ');
            if (this._isMounted) {
                this.setState({logged_in: false});
            }
        });

        this._isMounted = true;


    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    login(member_id, password) {
        PicksAPI.login(member_id, password).done((result) => {
            console.log("Login results", result);
            if (result.success) {
                this.setState({logged_in: true,
                            member: result.member});
                new Cookies().set("pb-member", result.member.record_id, {path: "/"});
                this.props.pubsub.publish('logged-in');
            }
        });
    }

    render() {

   //     console.log('<Login> render() [member], (logged_in):', this.state.member, this.state.logged_in);

        if (this.state.logged_in) {
            return (
                <div>
                    <span className="trebuchet14" style={{textAlign: 'center'}}
                        onClick={(event)=>{
                            //  new Cookies().set("pb-member", result.member.record_id, {path: "/"});
                            alert("Logging out now.. ");
                            new Cookies().remove('pb-member');
                            this.props.pubsub.publish('logged-out');

                        }}>

                    <span className="trebuchet14" style={{textAlign: 'center'}}>
                        Welcome back, <strong>{this.state.member ? this.state.member.first_name : ''}</strong></span><br/>
                    </span>

                <Freeplay freePick={this.props.freePick}/>
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

                                            <form onSubmit={(event)=> {
                                                this.login(this.state.member_id, this.state.password);
                                                event.preventDefault();
                                            }}>

                                                <table width="310" border="0" cellSpacing="0" cellPadding="0">
                                                    <tbody>
                                                    <tr>
                                                        <td height="32" style={{textAlign: 'center'}}>

                                                            <span className="trebuchet14BW">Username:</span>&nbsp;
                                                            <input value={this.state.member_id} onChange={(event)=> {
                                                                this.setState({member_id: event.target.value});
                                                            }} name="MEMBER_ID" type="text" id="MEMBER_ID" size="16"
                                                                   maxLength="80"/>

                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td height="32" align="center">
                                                            <span className="trebuchet14BW">Password:</span>&nbsp;&nbsp;
                                                            <input value={this.state.password} onChange={(event)=> {
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






