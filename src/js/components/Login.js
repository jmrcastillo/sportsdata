/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PicksAPI from "../lib/PicksAPI";
import Freeplay from "../components/Freeplay";
import Cookies from "universal-cookie";


export default class Login extends React.Component {

    constructor() {
        super();

        const memberIDCookie = new Cookies().get("pb-member");

        console.log ("Login constructor - memberIDCookie:", memberIDCookie);
        this.state = {
            member_id: typeof (memberIDCookie) === 'undefined' ? '' : memberIDCookie,
            password: '',
            logged_in: ! (typeof (memberIDCookie) === 'undefined'),
            member: null,
        }

    }
    componentWillMount() {

    }
    componentDidMount() {
        console.log ("SETTING member cookie");
         new Cookies().set("pb-member", 'scope5', {path: "/"});

    }

    login(member_id, password) {
        PicksAPI.login(member_id, password).done((result) => {
            console.log("Login results", result);
            if (result.success) {
                this.setState({logged_in: true,
                            member: result.member});
          //      new Cookies().set("pb-member", this.state.member_id, {path: "/"});


            }
        });


    }

    render() {

        console.log('LOGIN (member_id), (logged_in):', this.state.member_id, this.state.logged_in);

        if (this.state.logged_in) {
            return (
                <Freeplay freePick={this.props.freePick}/>
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
                                            className="trebuchet14BW">Login To View Todays Featured Free Play</span>
                                        </h3>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'center', backgroundColor: '#000000'}}>
                                <table width="310" border="0" cellSpacing="0" cellPadding="0">
                                    <tbody>
                                    <tr>
                                        <td style={{textAlign: 'center', backgroundColor: '#000000'}}>

                                            <form onSubmit={(event)=> {
                                                //    alert('Something was submitted' + this.state.member_id + this.state.password);

                                                this.login(this.state.member_id, this.state.password);
                                                event.preventDefault();
                                            }}>

                                                <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                                    <tbody>
                                                    <tr>
                                                        <td height="32" style={{textAlign: 'center'}}>

                                                            <span className="trebuchet14BW">Username:</span>&nbsp;
                                                            <input value={this.state.member_id} onChange={(event)=> {
                                                                {/*                                            console.log('Member ID STATE WAS', this.state.member_id);
                                                                 console.log('Member ID changes to', event.target.value);*/
                                                                }
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






