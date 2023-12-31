/**
 * Created by me on 1/31/17.
 */

import React from "react";
import {GlobalContext} from "../lib/GlobalContext";

import Pick from "../components/Pick";
import SportsCodes from "../lib/SportsCodes"
import PicksAPI from "../lib/PicksAPI";
import Utils from "../lib/Utils";
import SelectSport from "../components/SelectSport";
import SelectEcapper from "../components/SelectEcapper";
import { Collapse, Button, CardBody, Card } from 'reactstrap';



export default class PickList extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
          logged_in: false,
          selected_sport:  'ALL',
          selected_ecapper: 'ALL',
          collapse: false
        };

      

    }
    componentWillMount() {

    }
    componentDidMount() {

        // Messaging pubsub
      this.subscribe_logged_in = this.props.pubsub.subscribe('logged-in', (message, data)=> {
          this.setState({logged_in: true});
      });
      this.subscribe_logged_out = this.props.pubsub.subscribe('logged-out', (message, data)=> {
          this.setState({logged_in: false});
      });
      this.subscribe_selected_sport = this.props.pubsub.subscribe('selected-sport', (message, data)=> {
        this.setState({selected_sport: data, selected_ecapper: 'ALL'});
      });
      this.subscribe_selected_ecapper = this.props.pubsub.subscribe('selected-ecapper', (message, data)=> {
        this.setState({selected_ecapper: data, selected_sport: 'ALL'});
      });
    }

    componentWillUnmount() {
      this.props.pubsub.unsubscribe(this.subscribe_logged_in);
      this.props.pubsub.unsubscribe(this.subscribe_logged_in);
      this.props.pubsub.unsubscribe(this.subscribe_selected_sport);
      this.props.pubsub.unsubscribe(this.subscribe_selected_ecapper);
    }

    // Returns inCart: Whether the pick is in selectedPicks isPAW: Whether that pick is added as PAW or PPD
    pickIsInCart(pick) {
        const selectedPicks = this.props.selectedPicks.split(',');
        const selectedPickIDs =  selectedPicks.map(pick=>{return pick.split('|')[0]});
        const selectedIsPAWs  =  selectedPicks.map(pick=>{return (pick.split('|')[1] === 'true')});
        const cartIndex = selectedPickIDs.indexOf(pick.pick_id);
        return {inCart: cartIndex !== -1, isPAW:  selectedIsPAWs[cartIndex]}
    }

    render() {

      // Mobile rendering support via Context API
      return this.context.state.isMobile ? this.renderNormal() : this.renderNormal()


    }


    toggle() {
      this.setState({ collapse: !this.state.collapse });
    }

  renderNormal() {

    return (
      <React.Fragment>
        <h3 className="text-center md-text-left py-2">Guaranteed Experts Picks</h3>
        <div className="row m-0">
          <h5 className="col-12 col-md-6 text-left redhottxt p-0 text-center md-text-left">Red Hot Experts Best Bets</h5>
          <h5 className="col-12 col-md-6 text-md-right p-0 payaftertxt text-center md-text-left">Pay After You Win Picks -or- Prepaid-
              <span
                onClick={(event) => {
                  if (! this.state.logged_in) {
                    return;
                  }
                  alert("Logging out now.. ");
                  PicksAPI.logout(Utils.getCookie("pb-member"));
                  this.props.pubsub.publish('logged-out');
                }}

              >Discount</span>
          </h5>
        </div>

        <div className="row m-0 pl-filter p-2 mb-3">
          <SelectEcapper
            allPicks={this.props.allPicks}

            pubsub={this.props.pubsub}
          />
        <SelectSport
          allPicks={this.props.allPicks}
          pubsub={this.props.pubsub}
        />
        </div>

        {/*  Picks grouped by sport */}
        {SportsCodes.getSportsOrdered().map((sport, i) => {

        const picks = this.props.allPicks[sport];
        const hasPicksForSport = (this.state.selected_sport === 'ALL' || parseInt(sport) === parseInt(this.state.selected_sport));
        const hasPicksFromEcapper = ((this.state.selected_ecapper === 'ALL') || (typeof picks.find(e => {
          return e.ecapper_id === this.state.selected_ecapper;
        })) !== 'undefined');

        //console.log ("Sport ", sport, "hasPicksFromEcapper", hasPicksFromEcapper);

        if (typeof (picks) != 'undefined' && picks.length > 0 && hasPicksFromEcapper && hasPicksForSport) {

          return (
            <div className="pl-sport mt-3" key={sport}>
              <span className="picklistSport my-md-0">
                <img className="align-middle" src={SportsCodes.getImgsrc(sport)} width="42px"/>
                <span className="sportstxt">{SportsCodes.getText(sport)}</span>
              </span>
              <div className="pl-container py-md-0">
                {/*  List of picks for this sport */}
                {picks.filter(e=>{
                  return (this.state.selected_ecapper === 'ALL' || (e.ecapper_id === this.state.selected_ecapper));
                }).map((pick, i) => {

                  const {inCart, isPAW} = this.pickIsInCart(pick);
                  return (
                    <div className="picklisttbl m-md-0" key={i} >
                      <Pick
                          pick={pick}
                          pubsub={this.props.pubsub}
                          loggedIn={this.state.logged_in}
                          memberSuspended={this.props.memberSuspended}
                          memberLevelFlagged={this.props.memberLevelFlagged}
                          inCart={inCart}
                          inCartAsPAW={isPAW}
                          isCartEmpty={this.props.selectedPicks.length === 0}
                          notificationManager={this.props.notificationManager}

                        />
                    </div>
                  )})}
              </div>


            </div>

          )
        }
        })}

                              
      </React.Fragment>
    )
  }






  renderMobile() {

      return (
        <div>
          {/*<!-- box begin -->*/}
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div>
                              <br />
                              {/*<h3 onClick={event => {
                                                            this.props.pubsub.publish('test-mode');
                                                        }
                                                        }>Guaranteed Experts Picks</h3>
                                                        <h4>Pay After You Win Picks -or- Discount Pre-Paid</h4>
                                                        <h5>Red Hot Experts Best Bets</h5>*/}


                              <div align="center">
                                <table width="90%" border="0" cellSpacing="0" cellPadding="0">
                                  <tbody>
                                  <tr><td><h3>Guaranteed Experts Picks</h3>
                                    <h4>Pay After You Win Picks -or- Discount Pre-
                                    <span
                                      onClick={(event) => {
                                        if (! this.state.logged_in) {
                                          return;
                                        }
                                        //  new Cookies().set("pb-member", result.member.record_id, {path: "/"});
                                        alert("Logging out now.. ");
                                        PicksAPI.logout(Utils.getCookie("pb-member"));
                                        this.props.pubsub.publish('logged-out');
                                      }}

                                    >Paid</span></h4>
                                    <h5>Red Hot Experts Best Bets</h5></td></tr>
                                  <tr>
                                    <td height="40"  style={{textAlign: 'center', backgroundColor: '#000000' }}>
                                      <table width="90%" border="0" cellSpacing="0" cellPadding="0">
                                        <tbody>
                                        <tr>
                                          <td align="right">
                                            <h4>
                                              {/* TODO:  Why was select in this H4? */}
                                            </h4>
                                            <SelectEcapper
                                              allPicks={this.props.allPicks}

                                              pubsub={this.props.pubsub}
                                            />&nbsp;&nbsp;
                                            <SelectSport
                                              allPicks={this.props.allPicks}
                                              pubsub={this.props.pubsub}
                                            />
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#990000' }}>


                                      {/*  Picks grouped by sport */}
                                      {SportsCodes.getSportsOrdered().map((sport, i) => {

                                        const picks = this.props.allPicks[sport];
                                        const hasPicksForSport = (this.state.selected_sport === 'ALL' || parseInt(sport) === parseInt(this.state.selected_sport));
                                        const hasPicksFromEcapper = ((this.state.selected_ecapper === 'ALL') || (typeof picks.find(e => {
                                          return e.ecapper_id === this.state.selected_ecapper;
                                        })) !== 'undefined');

                                        if (typeof (picks) != 'undefined' && picks.length > 0 && hasPicksFromEcapper && hasPicksForSport) {

                                          return (
                                            <div key={sport}>

                                              <table width="90%" border="0"
                                                     cellSpacing="0"
                                                     cellPadding="0">
                                                <tbody>
                                                <tr>
                                                  <td height="28" style={{ backgroundColor: '#990000' }}>&nbsp;&nbsp;
                                                    <span
                                                      className="trebuchet14B"><font
                                                      color="white">{SportsCodes.getText(sport)}</font></span>
                                                  </td>
                                                </tr>
                                                </tbody>
                                              </table>

                                              <table>
                                                <tbody>
                                                {/*  List of picks for this sport */}

                                                {picks.filter(e=>{
                                                  return (this.state.selected_ecapper === 'ALL' || (e.ecapper_id === this.state.selected_ecapper));
                                                }).map((pick, i) => {

                                                  const {inCart, isPAW} = this.pickIsInCart(pick);
                                                  return (
                                                    <tr key={i} >
                                                      <td>
                                                        <Pick
                                                          pick={pick}
                                                          pubsub={this.props.pubsub}
                                                          loggedIn={this.state.logged_in}
                                                          memberSuspended={this.props.memberSuspended}
                                                          memberLevelFlagged={this.props.memberLevelFlagged}
                                                          inCart={inCart}
                                                          inCartAsPAW={isPAW}
                                                          isCartEmpty={this.props.selectedPicks.length === 0}
                                                          notificationManager={this.props.notificationManager}
                                                        />
                                                      </td>
                                                    </tr>
                                                  )})}

                                                </tbody>
                                              </table>


                                            </div>

                                          )
                                        }
                                      })}

                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#990000' }}>&nbsp;</td>
                                  </tr>
                                  </tbody>
                                </table>
                                {/*<img src="http://www.playbook.com/images/grey_line3.gif" alt="" width="550" height="12" />*/}
                              </div>

                            </div>
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- box end -->*/}
        </div>
        )
    }












}
