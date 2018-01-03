/**
 * Created by me on 1/31/17.
 */

import React from "react";
import ReadMore from '../components/ReadMore';

export default class Freeplay extends React.Component {

    constructor() {
        super();

    }
    componentWillMount() {

    }
    componentDidMount() {

    }


    render() {


        const freePickTitle = this.props.freePick ? this.props.freePick.title : 'Free pick is not available yet.';
        const freePickBody = this.props.freePick ? this.props.freePick.body : '';


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
                            <td style={{textAlign: 'center', backgroundColor: '#FFFFFF' }}>
                                <span style={{textAlign: 'center'}}>{freePickTitle}
                                <br />
                      {/*              <span
                                        dangerouslySetInnerHTML={
                                            {__html: freePickBody}
                                        }

                                    />*/}
                                    <ReadMore text={freePickBody} />

                                </span></td>
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






