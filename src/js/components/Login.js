/**
 * Created by me on 1/31/17.
 */

import React from "react";


export default class Login extends React.Component {

    constructor() {
        super();

    }
    componentWillMount() {

    }
    componentDidMount() {

    }


    render() {

        return (
        <div>


            {/*<!--Start login box-->*/}
            <table width="320" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                <tr style={{verticalAlign: 'top' }}>
                    <td height="40" style={{textAlign: 'center', backgroundColor: '#000000' }}>
                        <div>
                            <div>
                                <h3><span className="trebuchet14BW">Login To View Todays Featured Free Play</span></h3>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center', backgroundColor: '#000000' }}><table width="310" border="0" cellSpacing="0" cellPadding="0">
                        <tbody>
                        <tr>
                            <td style={{textAlign: 'center', backgroundColor: '#000000' }}><form name="form1" method="post" action=""><table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                <tr>
                                    <td height="32" style={{textAlign: 'center' }}>

                                        <span className="trebuchet14BW">Username:</span>&nbsp;
                                        <input name="MEMBER_ID" type="text" id="MEMBER_ID" size="16" maxLength="80" />
                                    </td>
                                </tr>
                                <tr>
                                    <td height="32" align="center">
                                        <span className="trebuchet14BW">Password:</span>&nbsp;&nbsp;
                                        <input name="PASSWORD" type="text" id="PASSWORD" size="16" maxLength="12" /></td>
                                </tr>
                                <tr>
                                    <td height="42" align="center"><input type="submit" name="SUBMIT" id="SUBMIT" value="Submit" /></td>
                                </tr>
                                </tbody>
                            </table></form></td>
                        </tr>
                        </tbody>
                    </table></td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center', backgroundColor: '#000000' }}>&nbsp;</td>
                </tr>
                </tbody>
            </table>
            {/*<!--end login box-->*/}



        </div>



        );
    }
}






