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


            {/*<!--Start loggedin box-->*/}
            <table width="320" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                <tr style={{verticalAlign: 'top' }}>
                    <td height="6" style={{textAlign: 'center', backgroundColor: '#000000' }}>&nbsp;</td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center', backgroundColor: '#000000' }}><table width="310" border="0" cellSpacing="0" cellPadding="0">
                        <tbody>
                        <tr>
                            <td style={{textAlign: 'center', backgroundColor: '#FFFFFF' }}><span style={{textAlign: 'center'}}>&nbsp;{PICK_TITLE}<br />{PICK_BODY}(truncate at 120 characters)&nbsp;>> Read More(show entire body on click)</span></td>
                        </tr>
                        </tbody>
                    </table></td>
                </tr>
                <tr>
                    <td height="6" style={{textAlign: 'center', backgroundColor: '#000000' }}>&nbsp;</td>
                </tr>
                </tbody>
            </table>
            {/*<!--end loggedin box-->*/}



        </div>



        );
    }
}






