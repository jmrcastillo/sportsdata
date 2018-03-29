/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Pick from "../components/Pick";
import SportsCodes from "../lib/SportsCodes"


export default class PickList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
/*            picks: [],
            allPicks: [],  // PROPS
            freePicks: [],*/
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
        const selectedIsPAWs  =  selectedPicks.map(pick=>{return pick.split('|')[1]});
        const cartIndex = selectedPickIDs.indexOf(pick.pick_id);
        return {inCart: cartIndex !== -1, isPAW:  selectedIsPAWs[cartIndex]}
    }

    render() {




        return (
            <div className="col-9a maxheight">
                {/*<!-- box begin -->*/}
                <div className="box maxheight">
                    <div className="border-top maxheight">
                        <div className="border-right maxheight">
                            <div className="border-bot maxheight">
                                <div className="border-left maxheight">
                                    <div className="left-top-corner maxheight">
                                        <div className="right-top-corner maxheight">
                                            <div className="right-bot-corner maxheight">
                                                <div className="left-bot-corner maxheight">
                                                    <div className="inner2">
                                                        <br />
                                                        <h3 onClick={event => {
                                                            this.props.pubsub.publish('test-mode');
                                                        }
                                                        }>Guaranteed Experts Picks</h3>
                                                        <h4>Pay After You Win Picks -or- Prepaid Discount Picks</h4>
                                                        <h5>Red Hot Experts Best Bets</h5>


                                                        <div align="center">
                                                            <table width="640" border="0" cellSpacing="0" cellPadding="0">
                                                                <tbody>
                                                                <tr>
                                                                    <td height="40"  style={{textAlign: 'center', backgroundColor: '#000000' }}>
                                                                        <table width="630" border="0" cellSpacing="0" cellPadding="0">
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

                                                                                        <table width="630" border="0"
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
                                                                                                                isPAW={isPAW}
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
                                                                    <td backgroundColor="black">&nbsp;</td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                            <img src="http://www.playbook.com/images/grey_line3.gif" alt="" width="550" height="12" />
                                                        </div>
                                                        <br />
                                                        <br />
                                                        <br />
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

        );
    }
}
//        PicksAPI.loadServerTime().done((time)=>console.log("PROMISED time return: ", time));
//        console.log("PROMISED picks return: ", picks)


/*  loadPicks() {
 let url =  "https://www.playbook.com/picks-api1/get-server-time";
 console.log ("Loading url", url);

 var time = 0;
 $.ajax({
 url: url,
 dataType: 'json',
 type: 'GET',
 cache: false,
 success: (result) => {
 time = result;
 //	this.setState({handicappers: Object.values(handicappers)});
 console.log ("Got server time", time);
 },
 error: (xhr, status, err) => {
 console.error(url, status, err.toString());
 }
 }).then(() => console.log('AFTER DONE', time));
 return time;
 }
 */

/*    loadPicks() {
 let url =  `https://www.playbook.com/cube-api3/experts/${this.state.ecapper_id}/picks`;
 //	console.log ("Trying to load url", url);

 $.ajax({
 //url: this.props.url,
 url: url,
 dataType: 'json',
 type: 'GET',
 cache: false,
 success: (picks) => {
 const paidPicks = Object.values(picks).filter(pick=> {
 if (pick.price > 0) {
 return pick;
 }
 });
 this.setState({picks: paidPicks});
 this.setState ({teaserEnabled: paidPicks.map((pick) => {return false})});

 console.log ("Got picks ", paidPicks);
 },
 error: (xhr, status, err) => {
 console.error(url, status, err.toString());
 }
 });
 }*/

/*	handleClick(e) {
 console.log ("CLICKED");
 debugger;
 this.context.router.transitionTo('/');
 }*/



/*

 // Pro football
 picks = picks.filter(pick=>{
 if (pick.sport === '12') {
 return true;
 }
 });
 self.setState({proFBPicks:picks});

 console.log ("TESTING 1234");

 const separatedPicks = Object.keys(SportsCodes.getSports()).map(sport=>{
 console.log ("Sport is ", sport, typeof(sport));
 return {
 sport: sport,
 picks: picks.filter(pick=>{
 console.log ("pick sport is ", pick.sport, typeof (pick.sport));
 if (pick.sport === sport) {
 return true;
 }
 })
 };

 });
 */



//           console.log ("separated picks: ", separatedPicks);

