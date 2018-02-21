/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PicksAPI from "../lib/PicksAPI";
import Utils from "../lib/Utils";

import {NotificationContainer, NotificationManager} from 'react-notifications';



export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //ccard: {},
            ccard: {
                number: '5444305280019650',
                expMonth: '02',
                expYear: '2021',
                cvv: '165'
            },
//            array ( 'CC_NUMBER' => '5444305280019650', 'LAST_SESSION' => '02/21|165', )
//        return ccard.number && ccard.expMonth && ccard.expYear && ccard.cvv;

        cartTotal: this.props.cartTotal,
            cardType: '',
        }
        this.NotificationManager = NotificationManager;
    }
    componentWillMount() {

    }
    componentDidMount() {


    }
    componentWillUnmount() {
    }

    updateCcardInfo(property, value) {
        let ccard = this.state.ccard;
        ccard[property] = value;
        this.setState(ccard);
    }

    determineCardType(cardNumber) {
        //var first = cardNumber.substring(0, 1);
        if (cardNumber.length === 0) {
            return '';
        }
        let type = '';
        switch (cardNumber.substring(0, 1)) {
            case '2':
            case '5':
                type = 'Mastercard';
                break;
            case '3':
                type = 'American Express';
                break;
            case '4':
                type = 'VISA';
                break;
            case '6':
                type = 'Discover';
                break;
            default:
                type = 'Invalid card number';
                break;
        }

        return type;
    }

    cardInfoEntered() {
        const ccard = this.state.ccard;
        return ccard.number && ccard.expMonth && ccard.expYear && ccard.cvv;
    }

    render() {

        const purchaseButtonOpacity =  this.cardInfoEntered() ? 1.0 : 0.1;

        return (

            <div align="center">

                <table width="600" border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                    <tr>
                        <td colSpan="2" align="center"><span className="trebuchet14"><b>Credit Card Information</b></span></td>
                    </tr>

                    <tr>
                        <td height="32" style={{textAlign: 'right', backgroundColor: 'White'}}><span className="trebuchet14">Card Number:</span>&nbsp;</td>
                        <td style={{textAlign: 'left', backgroundColor: 'White'}}><label for="CC_NUMBER"></label>
                            <input name="CC_NUMBER"
                                onKeyDown={event=>{
                                   if (event.ctrlKey || event.shiftKey || event.keyCode === 8 || event.keyCode === 46) {
                                       return true;
                                   }

                                   if (! Utils.isNumeric(event.key)) {
                                       event.preventDefault();
                                   }
                                   return true;
                                }}
                                onChange={event=>{
                                    this.updateCcardInfo('number', event.target.value);
                                    this.setState({cardType: this.determineCardType(event.target.value)});
                                }}

                               type="text" id="CC_NUMBER"  size="20" maxLength="16"  className="required" title="Enter credit card number" tabIndex="5"
                            />&nbsp;
                            <span id="CC_TYPE">{this.state.cardType}</span>
                        </td>
                    </tr>
                    <tr>
                        <td height="40" colSpan="2" align="center">
                            <span className="trebuchet14">Exp. Date:&nbsp;Month</span>&nbsp;
                            <input name="CC_EXPIRE_MONTH" id="CC_EXPIRE_MONTH"
                                onChange={event=>{
                                    this.updateCcardInfo('expMonth', event.target.value);
                                }}
                                type="text" defaultValue="" size="2" maxLength="2"  className="required" title="Enter expiration month" tabIndex="6"
                            />&nbsp;&nbsp;
                            <span className="trebuchet14">Year</span>&nbsp;
                            <input name="CC_EXPIRE_YEAR" id="CC_EXPIRE_YEAR"
                                onChange={event=>{
                                   this.updateCcardInfo('expYear', event.target.value);
                                }}
                                type="text" defaultValue="" size="4" maxLength="4"  className="required" title="Enter credit expiration year" tabIndex="7"
                            />&nbsp;&nbsp;
                            <span className="trebuchet14">CVV2</span>&nbsp;
                            <input name="CC_PIN" id="CC_PIN"
                               onChange={event=>{
                                   this.updateCcardInfo('cvv', event.target.value);
                               }}
                               type="text" defaultValue={" "} size="4" maxLength="4"   className="required" title="Enter credit card Verification Number (CVV2)" tabIndex="8"
                            />&nbsp;&nbsp;
                            <a title="Credit Card Verification Numbers" href="JavaScript:openWinD('https://www.ipsports.net/ecps/pages/cvv2/cvv2_1.html',420,450)"><img src="images/mini_cvv2.gif" alt="Credit Card Verification Number"  border="0" align="absmiddle"/> </a>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" align="center">
                            <table width="580" border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                            <tr>
                                <td><div title="Page 1">
                                    <div>
                                        <div>
                                            <span className="trebuchet14">Your Credit Card will be charged $
                                                <label for="CCARD_TOTAL"></label>
{/*
                                                <input name="CCARD_TOTAL" type="text" id="CCARD_TOTAL" defaultValue={total} size="6" disabled/>
*/}
                                                {this.props.cartTotal}
                                                <br />
                                                to complete this purchase.</span>
                                        </div>
                                    </div>
                                </div></td>
                                <td width="280" align="center">
                                <input type="image" name="PURCHASE_SUBMITTED" id="PURCHASE_SUBMITTED"
                                       src="images/purchase-button.png"  width="200" height="45" alt="purchase" value="submit"
                                       style={{opacity: purchaseButtonOpacity}}
                                       onClick={event=>{
                                           if (! this.cardInfoEntered()) {
                                               event.preventDefault();
                                               return true;
                                           }
                                           console.log("Purchase taking place..");
                                           this.props.pubsub.publish('purchase-ccard', this.state.ccard);

                                       }}
                                />
                                </td>
                            </tr>
                                </tbody>
                        </table></td>
                    </tr>
                    </tbody>
                </table>

                {/*<script>
                 document.getElementById("PURCHASE_SUBMITTED").addEventListener("click", function(event){
                 if (! FIC_checkForm(document.forms['FORM_1'])) {
                 event.preventDefault();
                 }
                 });

                 // Displays edit customer info - shopping_cart_main_purchase_editmember.html
                 document.getElementById("EDIT_CUSTOMER_INFO").addEventListener("click", function(event){
                 document.getElementById("EDITMEMBER").style.display = "block";
                 event.preventDefault();

                 });

                 document.getElementById("CC_NUMBER").addEventListener("keydown", function(event){
                 if (event.ctrlKey || event.shiftKey || event.keyCode === 8 || event.keyCode === 46) {
                 return true;
                 }

                 function isNumeric(n) {
                 return !isNaN(parseFloat(n)) && isFinite(n);
                 }

                 if (! isNumeric(event.key)) {
                 //   console.log("NOT NUMERIC Key is ", event);
                 event.preventDefault();
                 return true;
                 }
                 return true;
                 });

                 document.getElementById("CC_NUMBER").addEventListener("keyup", function(event){

                 if (event.target.value.length === 0) {
                 return true;
                 }
                 var first = event.target.value.substring(0, 1);

                 var type = '';
                 switch (first) {
                 case '2':
                 case '5':
                 type = 'Mastercard';
                 break;
                 case '3':
                 type = 'American Express';
                 break;
                 case '4':
                 type = 'VISA';
                 break;
                 case '6':
                 type = 'Discover';
                 break;
                 default:
                 type = 'Invalid card number';
                 break;
                 }
                 //   console.log("KeyUP is ", event.key, event.target.value, type);
                 //  debugger;
                 document.getElementById("CC_TYPE").innerHTML = type;
                 return true;
                 });

                 </script>*/}
            </div>



        );
    }
}

/*
 <table width="342" cellPadding="0" cellSpacing="0" bgcolor="#d6d5d5">

 <tbody id="EDITMEMBER"  >
 <tr>
 <td>

 <table width="342" border="0" cellSpacing="1" cellPadding="1">
 <tbody>
 <tr>
 <td bgcolor="#f5f5f5" height="30" style={{textAlign: "center"}}><div><span className="verdana12b">Customer Information</span><br />
 <span className="verdana12">The Info Below Needs To Match Your <br />Credit Card Billing Statement.<br /><br /></span></div></td>
 </tr>
 <tr height="28">
 <td bgcolor="#FFFFFF" width="342" height="28">
 <div align="left">&nbsp;
 <i>First Name:&nbsp;</i>
 <b>
 <input className="input" name="FIRST_NAME" type="text" defaultValue={this.props.member.first_name}
 onChange={event=>{
 //    console.log("MemberInfo updating state.member was", this.state.member);
 this.updateMemberInfo('first_name', event.target.value);
 }}
 size="20" maxLength="50"/>
 </b>
 </div>
 </td>
 </tr>

 <tr height="28">
 <td bgcolor="#FFFFFF" width="342" height="28">
 <div align="left">&nbsp;
 <i>Last Name:&nbsp;</i>
 <b>
 <input className="input" name="LAST_NAME" type="text" defaultValue={this.props.member.last_name}
 onChange={event=>{
 this.updateMemberInfo('last_name', event.target.value);
 }}
 size="20" maxLength="50"/>
 </b>
 </div>
 </td>
 </tr>

 <tr height="28">
 <td bgcolor="#FFFFFF" width="342" height="28">
 <div align="left">&nbsp;

 <i>Address 1:&nbsp;</i>
 <b>
 <input className="input" name="ADDRESS1" type="text" defaultValue={this.props.member.address1}
 onChange={event=>{
 this.updateMemberInfo('address1', event.target.value);
 }}
 size="30" maxLength="50"/>
 </b>
 </div>
 </td>
 </tr>

 <tr height="28">
 <td bgcolor="#FFFFFF" width="342" height="28">
 <div align="left">&nbsp;
 <i>Address 2:&nbsp;</i>
 <b>
 <input className="input" name="ADDRESS2" type="text" defaultValue={this.props.member.address2}
 onChange={event=>{
 this.updateMemberInfo('address2', event.target.value);
 }}
 size="30" maxLength="50"/>
 </b>
 </div>
 </td>
 </tr>

 <tr height="28">
 <td bgcolor="#FFFFFF" width="342" height="28">
 <div align="left">&nbsp;
 <i>City:&nbsp;</i>
 <b>
 <input className="input" name="CITY" type="text" defaultValue={this.props.member.city}
 onChange={event=>{
 this.updateMemberInfo('city', event.target.value);
 }}
 size="20" maxLength="30"/>
 </b>
 </div>
 </td>
 </tr>

 <tr height="28">
 <td bgcolor="#FFFFFF" width="342" height="28">
 <div align="left">&nbsp;
 <i>State:&nbsp;</i>
 <b>
 <input className="input" name="STATE" type="text" defaultValue={this.props.member.state}
 onChange={event=>{
 this.updateMemberInfo('state', event.target.value);
 }}
 size="2" maxLength="2"/>
 </b>
 </div>
 </td>
 </tr>

 <tr height="28">
 <td bgcolor="#FFFFFF" width="342" height="28">
 <div align="left">&nbsp;
 <i>Zip / Postal:&nbsp;</i>
 <b>
 <input className="input" name="POSTAL" type="text" defaultValue={this.props.member.postal}
 onChange={event=>{
 this.updateMemberInfo('postal', event.target.value);
 }}
 size="10" maxLength="10"/>
 </b>
 </div>
 </td>
 </tr>

 <tr height="28">
 <td bgcolor="#FFFFFF" width="342" height="28">
 <div align="left">&nbsp;
 <i>Country:&nbsp;</i>
 <b>
 <input className="input" name="COUNTRY" type="text" defaultValue={this.props.member.country}
 onChange={event=>{
 this.updateMemberInfo('country', event.target.value);
 }}
 size="6" maxLength="10"/>
 </b>
 </div>
 </td>
 </tr>

 <tr height="28">
 <td bgcolor="#FFFFFF" width="342" height="28">
 <div align="left">&nbsp;
 <i>Day Phone:&nbsp;</i>
 <b>
 <input className="input" name="DAY_PHONE" type="text" defaultValue={this.props.member.day_phone}
 onChange={event=>{
 this.updateMemberInfo('day_phone', event.target.value);
 }}
 size="12" maxLength="16"/>
 </b>
 </div>
 </td>
 </tr>

 <tr height="28">
 <td bgcolor="#FFFFFF" width="342" height="28">
 <div align="left">&nbsp;
 <i>Evening Phone:&nbsp;</i>
 <b>
 <input className="input" name="EVE_PHONE" type="text" defaultValue={this.props.member.eve_phone}
 onChange={event=>{
 this.updateMemberInfo('eve_phone', event.target.value);
 }}
 size="12" maxLength="16"/>
 </b>
 </div>
 </td>
 </tr>

 <tr height="28">
 <td bgcolor="#FFFFFF" width="342" height="28">
 <div align="left">&nbsp;
 <i>Email:&nbsp;</i>
 <b>
 <input className="input" name="EMAIL" type="text" defaultValue={this.props.member.email}
 onChange={event=>{
 this.updateMemberInfo('email', event.target.value);
 }}
 size="20" maxLength="50"/>
 </b>
 </div>
 </td>
 </tr>
 <tr>
 <td style={{textAlign: "center"}}>
 <input type="button" value="Update" onClick={e=>{
 PicksAPI.saveMember(this.state.member).done((res)=>{
 this.NotificationManager.success('Your changes saved.');

 });

 }}/>
 </td>
 </tr>




 <tr>
 <td>
 <NotificationContainer/>
 </td>
 </tr>

 </tbody>
 </table>

 </td>
 </tr>
 </tbody>
 </table>

 */