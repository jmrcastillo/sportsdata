/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Pick from "../components/Pick";
import SportsCodes from "../lib/SportsCodes"
import Consumer from "../lib/ContextAPI";
import Cookies from "universal-cookie";
import PicksAPI from "../lib/PicksAPI";
import Utils from "../lib/Utils";
import SelectSport from "../components/SelectSport";


export default class PickList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            logged_in: false,
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

    }

    componentWillUnmount() {
        this.props.pubsub.unsubscribe(this.subscribe_logged_in);
        this.props.pubsub.unsubscribe(this.subscribe_logged_in);

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
      return (
        <Consumer>
          {(context) => (
            context.state.isMobile ? this.renderMobile() : this.renderNormal()
          )}
        </Consumer>
      )
    }



  renderNormal() {

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
                                        alert("Logging out now.. ");
                                        PicksAPI.logout(Utils.getCookie("pb-member"));
                                        this.props.pubsub.publish('logged-out');
                                      }}

                                    >Paid</span>


                                  </h4>
                                  <h5>Red Hot Experts Best Bets</h5></td></tr>
                                <tr>
                                  <td height="40"  style={{textAlign: 'center', backgroundColor: '#000000' }}>
                                    <table width="90%" border="0" cellSpacing="0" cellPadding="0">
                                      <tbody>
                                      <tr>
                                        <td align="right">
                                          <h4>
                                           <SelectSport
                                            allPicks={this.props.allPicks}
                                           />

                                          </h4>
                                        </td>
                                      </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ backgroundColor: '#990000' }}>


                                    {/*      {
                                                                         //const a = [0,1];
                                                                         [0].forEach((element, i)=>{
                                                                         console.log ("Faking a pick with <TestComponent>", i);
                                                                         <div key={i}>
                                                                         <TestComponent
                                                                         />
                                                                         </div>

                                                                         })
                                                                         }*/}




                                    {/*  Picks grouped by sport */}
                                    {SportsCodes.getSportsOrdered().map((sport, i) => {

                                      const picks = this.props.allPicks[sport];
                                      if (typeof (picks) != 'undefined' && picks.length > 0) {

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

                                              {picks.map((pick, i) => {

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
                                              {/*                                                                                <script type="text/javascript" language="javascript"><!--
                                                                                         function leapto(form)  {
                                                                                         var myindex=form.dest.selectedIndex
                                                                                         window.location=(form.dest.options[myindex].value);

                                                                                         }
                                                                                         // -->
                                                                                         </script>
                                                                                         [Script for dropdown]*/}

                                              {/* <form name="myform1" id="myform1">
                                                                                         <select name="dest" size="1" onchange="leapto(document.myform1);">
                                                                                         <option value="">Sort By</option>

                                                                                         <option value="../football/issue12/newsletter.pdf">Issue 12</option>
                                                                                         <option value="../football/issue11/newsletter.pdf">Issue 11</option>
                                                                                         <option value="../football/issue10/newsletter.pdf">Issue 10</option>
                                                                                         <option value="../football/issue9/newsletter.pdf">Issue 9</option>
                                                                                         <option value="../football/issue8/newsletter.pdf">Issue 8</option>
                                                                                         <option value="../football/issue7/newsletter.pdf">Issue 7</option>
                                                                                         <option value="../football/issue6/newsletter.pdf">Issue 6</option>
                                                                                         <option value="../football/issue5/newsletter.pdf">Issue 5</option>
                                                                                         <option value="../football/issue4/newsletter.pdf">Issue 4</option>
                                                                                         <option value="../football/issue3/newsletter.pdf">Issue 3</option>
                                                                                         <option value="../football/issue2/newsletter.pdf">Issue 2</option>
                                                                                         <option value="../football/pre/newsletter.pdf">Preseason</option>
                                                                                         </select>
                                                                                         </form>*/}
                                            </h4>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#990000' }}>


                                      {/*      {
                                                                         //const a = [0,1];
                                                                         [0].forEach((element, i)=>{
                                                                         console.log ("Faking a pick with <TestComponent>", i);
                                                                         <div key={i}>
                                                                         <TestComponent
                                                                         />
                                                                         </div>

                                                                         })
                                                                         }*/}




                                      {/*  Picks grouped by sport */}
                                      {SportsCodes.getSportsOrdered().map((sport, i) => {

                                        const picks = this.props.allPicks[sport];
                                        if (typeof (picks) != 'undefined' && picks.length > 0) {

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

                                                {picks.map((pick, i) => {

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
