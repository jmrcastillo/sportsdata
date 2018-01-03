/**
 * Created by me on 1/31/17.
 */

import React from "react";
//import Striptags from "striptags";
//import ReadMoreReact from 'read-more-react';

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
        /*//        const freePickBody = this.props.freePick ? Striptags(this.props.freePick.body) : '';
 //       const freePickBody = "What I highly recommended is creating hobbies together and exploring new things together. When life becomes dull and has become a stalemate routine then this affects communication. Take a trip to the theaters for example. After the movie people usually proceed to have a discussion about it afterwards. Couples need to have new experiences and constantly push themselves out of that same day to day routine, or else that routine will slowly kill the relationship one step at a time.";

        const freePickBody = `910
        <br>Play on: 20* CINCINNATI over Milwaukee
        <br>MLB TOP PLAY ALERT`;

        console.log("FREE PICK BODY ", freePickBody);*/

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






