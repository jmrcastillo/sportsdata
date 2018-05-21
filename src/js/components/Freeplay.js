/**
 * Created by me on 1/31/17.
 */

import React from "react";
import ReadMore from '../components/ReadMore';

export default class Freeplay extends React.Component {

    constructor(props) {
        super(props);

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
                    <td height="6" style={{textAlign: 'center', backgroundcolor: '#000000' }}>&nbsp;</td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center', backgroundcolor: '#000000' }}><table width="320" border="0" cellSpacing={2} cellPadding={2}>
                        <tbody>
                        <tr>
                            <td className="trebuchet14" style={{textAlign: 'center', backgroundcolor: '#FFFFFF' }}>
                                <table width="310" border="0" cellSpacing="0" cellPadding="0">
                                    <tbody>
                                    <tr>
                                        <td> <span className="trebuchet14B" style={{textAlign: 'left'}}>{freePickTitle}
                                            <br /></span>
                                            {/*              <span
                                             dangerouslySetInnerHTML={
                                             {__html: freePickBody}
                                             }

                                             />*/}
                                            <span className="trebuchet14"><ReadMore text={freePickBody} /></span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>


                            </td>
                        </tr>
                        </tbody>
                    </table></td>
                </tr>
                <tr>
                    <td height="6" style={{textAlign: 'center', backgroundcolor: '#000000' }}>&nbsp;</td>
                </tr>
                </tbody>
            </table>
            {/*<!--end loggedin box-->*/}



        </div>



        );
    }
}






