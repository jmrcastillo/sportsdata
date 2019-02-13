/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Money from "money-formatter";
import CheckoutButton from "../components/CheckoutButton";
import {GlobalContext} from "../lib/GlobalContext";

// Temporarily disabled for pick expiration soon notices
import Moment from "moment";
import SportsCodes from "../lib/SportsCodes"
import BuyNow from "../components/BuyNow";
import Utils from "../lib/Utils";




export default class Pick extends React.Component {
  static contextType = GlobalContext;

    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {

        const sportBoxStyle = {
            backgroundcColor:'#990000',
        };
        const pickBoxStyle = {
            backgroundColor:'#ffffff',

        };



        // TODO:  Need checkbox on pick input form to implement time notices
        /*        const pickExpirationUTC = Moment(this.props.pick.expiration_date);
                const currentDateUTC = Moment().add(-(Moment().utcOffset()), 'm');

                var minutes = pickExpirationUTC.diff(currentDateUTC, 'minutes');
                const soon = 60;
                const verySoon = 10;

                const expireStyle = minutes <= verySoon ? 'expiresin10' : minutes <= soon ? 'expiresin120' : 'expiresinLongtime';
                const expireIcon = minutes <= verySoon ? 'fa fa-bell faa-ring animated' : minutes <= soon ? 'fa  fa-spinner fa-spin ' : '';
                const expiresIn = `  ${SportsCodes.getGameStart(this.props.pick.sport, minutes)} in ${minutes} minutes. `;
                */
        // TODO:  Replaces with this for now 2018-01-01
        const  expireStyle = 'expiresinLongtime';
        const expireIcon = '';
        const expiresIn = '';

      // Mobile rendering support via Context API
      return (

            this.context.state.isMobile ?
              this.renderMobile(
                sportBoxStyle,
                pickBoxStyle,
                expireStyle,
                expireIcon,
                expiresIn) :
              this.renderNormal(
                sportBoxStyle,
                pickBoxStyle,
                expireStyle,
                expireIcon,
                expiresIn
              )

      );
    }

    renderNormal(sportBoxStyle,
                  pickBoxStyle,
                  expireStyle,
                  expireIcon,
                  expiresIn) {
      return (

        <div className="container pb-3 p-0">
          <div className="row m-0 pl-card-title-row px-1 py-2">
            <div className="col-12">
              <b className="">{this.props.pick.title}<br />
                <i className={expireIcon} ></i>
                <span className={expireStyle}
                      dangerouslySetInnerHTML={
                        { __html: expiresIn}
                      }
                />

              </b>
              </div>
        </div>
        <div className="row m-0">
          <div className="col-6 d-flex-row text-center mb-2 mt-3">
                <BuyNow
                    pubsub={this.props.pubsub}
                    loggedIn={this.props.loggedIn}
                    pick={this.props.pick}
                    addAsPAW={true}
                    inCart={this.props.inCart}
                    inCartAsPAW={this.props.inCartAsPAW}
                    memberSuspended={this.props.memberSuspended}
                    memberLevelFlagged={this.props.memberLevelFlagged}
                    notificationManager={this.props.notificationManager}
                  />
                  <span className="text-center d-block py-1">Pay After Win: <span className="price-bold">{Money.format ('USD', this.props.pick.price)}</span></span> 
          </div>
          <div className="col-6 d-flex-row text-center mb-2 mt-3">
              <BuyNow
                    pubsub={this.props.pubsub}
                    loggedIn={this.props.loggedIn}
                    pick={this.props.pick}
                    addAsPAW={false}
                    inCart={this.props.inCart}
                    inCartAsPAW={this.props.inCartAsPAW}
                    memberSuspended={this.props.memberSuspended}
                    memberLevelFlagged={this.props.memberLevelFlagged}
                    notificationManager={this.props.notificationManager}
                  />

                  <span className="text-center d-block py-1">Discount Pre-Paid:
                  <span className="price-bold">{Money.format ('USD', Utils.applyPrepaidDiscount(this.props.pick.price))}</span></span>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-12">
          {(this.props.inCart && this.context.state.isMobile)  ?
                    <React.Fragment>
                      <CheckoutButton
                        type="CC"
                        pubsub={this.props.pubsub}
                        enabled={true}
                      />

                      <CheckoutButton
                        type="TOKENS"
                        pubsub={this.props.pubsub}
                        enabled={true}
                      />
                    </React.Fragment>
                    :
                    <div className="text-justify mx-1 mt-2 mb-3" dangerouslySetInnerHTML={
                      {__html: this.props.pick.teaser}
                    }/>
                  }
          </div>
        </div>
        </div>
    )
    }



  renderMobile(sportBoxStyle,
               pickBoxStyle,
               expireStyle,
               expireIcon,
               expiresIn) {
    return (
      <table width="100%" border="0"  cellSpacing="2" cellPadding="2" style={pickBoxStyle}>
        <tbody>
        <tr>
          <td colSpan="3">
            <table width="100%" border="0" cellPadding="0" cellSpacing="0">
              <tbody>
              <tr>
                <td style={pickBoxStyle}>&nbsp; <i className="faa-ring animated " /></td>
              </tr>
              <tr>
                <td style={pickBoxStyle}>
                  <div align="left" className="trebuchet18B"><b>{this.props.pick.title}<br />


                    <i className={expireIcon} ></i>
                    <span className={expireStyle}
                          dangerouslySetInnerHTML={
                            { __html: expiresIn}
                          }
                    />

                  </b>
                    {/* Begin experimental checkout buttons on picks */}


                    {/*            {! this.props.isCartEmpty &&
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <CheckoutButton
                                                        type="CC"
                                                        pubsub={this.props.pubsub}
                                                        enabled={true}
                                                        minified={true}
                                                    />
                                                </td>
                                                <td>
                                                    <CheckoutButton
                                                        type="TOKENS"
                                                        pubsub={this.props.pubsub}
                                                        enabled={true}
                                                        minified={true}
                                                    />
                                                </td>

                                            </tr>

                                            </tbody>
                                        </table>
                                    }*/}
                    {/*  End experimental checkout button on picks */}



                  </div>
                </td>
              </tr>
              </tbody>
            </table></td>
        </tr>
        <tr>
          <td colSpan="3" align="center"><img src="images/dot_h.png" ></img></td>
        </tr>
        <tr>
          <td width="100%" align="left">
            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
              <tbody>
              <tr>
                <td width="85" valign="middle">
                  <BuyNow
                    pubsub={this.props.pubsub}
                    loggedIn={this.props.loggedIn}
                    pick={this.props.pick}
                    addAsPAW={true}
                    inCart={this.props.inCart}
                    inCartAsPAW={this.props.inCartAsPAW}
                    memberSuspended={this.props.memberSuspended}
                    memberLevelFlagged={this.props.memberLevelFlagged}
                    notificationManager={this.props.notificationManager}
                  />
                </td>

                <td valign="middle" className="trebuchet13">&nbsp;Pay After Win:
                  <span className="price-bold">
                                    {Money.format ('USD', this.props.pick.price)}
                                </span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <BuyNow
                    pubsub={this.props.pubsub}
                    loggedIn={this.props.loggedIn}
                    pick={this.props.pick}
                    addAsPAW={false}
                    inCart={this.props.inCart}
                    inCartAsPAW={this.props.inCartAsPAW}
                    memberSuspended={this.props.memberSuspended}
                    memberLevelFlagged={this.props.memberLevelFlagged}
                    notificationManager={this.props.notificationManager}
                  />
                </td>
                <td valign="middle" className="trebuchet13">&nbsp;Discount Pre-Paid:
                  <span className="price-bold">
                                    {Money.format ('USD', Utils.applyPrepaidDiscount(this.props.pick.price))}
                                    </span>
                </td>
              </tr>
              </tbody>
            </table>
          </td>
          <td width="3"><img src="images/dots_v.png" width="7" height="92"></img></td>
          <td width="100%">
            <table width="100%" border="0" cellPadding="0" cellSpacing="0">
              <tbody>
              <tr>
                <td style={pickBoxStyle} className="trebuchet16">
                  {(this.props.inCart && this.context.state.isMobile)  ?
                    <React.Fragment>
                      <CheckoutButton
                        type="CC"
                        pubsub={this.props.pubsub}
                        enabled={true}
                      />

                      <CheckoutButton
                        type="TOKENS"
                        pubsub={this.props.pubsub}
                        enabled={true}
                      />
                    </React.Fragment>
                    :
                    <div align="left" dangerouslySetInnerHTML={
                      {__html: this.props.pick.teaser}
                    }/>
                  }
                </td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        {/*Begin experimental checkout button on picks */}
        {/*                <tr>
                    <td>
                        <CheckoutButton
                            type="CC"
                            pubsub={this.props.pubsub}
                            enabled={true}
                            minified={true}
                        />
                    </td>
                    <td>
                        <CheckoutButton
                            type="TOKENS"
                            pubsub={this.props.pubsub}
                            enabled={true}
                            minified={true}
                        />
                    </td>

                </tr>*/}
        {/*End */}


        </tbody>
      </table>
    )
  }





}



